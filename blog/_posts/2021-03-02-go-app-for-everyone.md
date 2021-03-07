---
date: 2021-03-02
tags:
  - golang 
  - toys
---

# 비개발자 동료를 위한 Bitbar 자동 세팅 스크립트 go로 짜보기 

업무용 맥 장비를 받으면 꼭 설치하는 앱이 있다. 바로 BitBar.

![](https://user-images.githubusercontent.com/2231510/109470694-209fa480-7ab3-11eb-8ec3-e73c9ba6cf4b.png)

[BitBar](https://github.com/matryer/bitbar)는 맥의 메뉴 바를 이용하여 여러 생산성 유틸 혹은 스크립트를 사용할 수 있게 도와주는 앱이다. 모니터링용이나 자주 사용하는 기능들을 쇼트컷으로 만들 수도 있다. 이미 맥을 잘 사용하는 개발자들이라면 한번 쯤은 들어봤을 법한 아주 유명한 앱이고 Plugin 만드는게 어렵지 않기 때문에 입맛대로 새롭게 기능들을 추가하기도 편하다. 

![BitBar Example showing menu open](https://raw.github.com/matryer/bitbar/master/Docs/BitBar-Example-Menu.png)

설치 방법은 크게 두 가지로 
- `brew` 를 이용하거나 
- [BitBar repo의 releases](https://github.com/matryer/bitbar/releases)에 올라와 있는 최신 빌드된 앱을 다운받아 설치 할 수 있다. 

 그 뒤 [bitbar-plugins](https://github.com/matryer/bitbar-plugins)에 올라와 있는 필요한 스크립트들을 골라 Plugin folder에 복사 붙혀  넣은다음 `Refresh all`을 이용해 갱신하면 된다. (원래는 [getbitbar.com](http://getbitbar.com)이 있어서 브라우저에서 클릭만으로 plugin 설치를 도와주는 방법이 있었는데 [bitbar2](https://github.com/matryer/bitbar/issues/607) 준비 때문인지 페이지가 사라지고 지금은 GitHub으로 연결되고 있다.)

물론 설명대로 따라가면 그닥 어렵지 않은 방법이다. (특히, MSA하는 개발자들에게 이 정도는 로컬 세팅? 정말 아무것도 아니겠지 허허.) 하지만 비개발자들에게 `brew`를 이용한다던가, `chmod +x *.sh` 이러한 명령어들을 꼭 이해할 필요는 없어 보였고, 각자 필요한 plugin들을 깔 수는 있지만 결국 업무용도로 자주 쓰이는 것들은 한 장소에서 미리 설정하여 팀에서 배포해서 동일하게 사용하는 것도 좋을 것 같다는 생각이 들었다.

이 글에서는 이 BitBar 자동 세팅 스크립트 만드는 과정을 이야기 하고자 한다. 

## 1. 자동화 툴 

가장 먼저 떠오른 방법은 역시나 shell 스크립트 혹은 python 스크립트였다. `.sh`나 `.py` 확장자가 그렇게 친절하다 생각 되지 않고 권한 부여를 해야 하는 경우 터미널을 켜서 `chmod` 와 같은 명령어를 치는 것도 꽤나 귀찮을 거라 생각된다. 

다음으로는 `automator`

![](https://user-images.githubusercontent.com/2231510/109475389-ff41b700-7ab8-11eb-9c4c-7f6c054d346d.jpg)

Mac에서 기본으로 제공하는 툴로 workflow를 시각화 해서 보여주기도 하고, 기본적으로 OS의 기능을 다양하게 제공해주고 있기 때문에 여러 복합적인 작업들을 구성하기에 용이해보였다. 또, 저장 후 "응용 프로그램"으로 내보내기가 가능하기 때문에 후에 배포시에도 좋을 것 같다라는 생각이 들었다.

하지만, 작업하면서 `curl`로 코드를 다운을 받고 `unzip` 등의 복잡한 시나리오를 구현하게 되면서 나의 의도와 매칭되는 기능들이 어떤 것들인지 몰라서 결국 내가 스크립트 직접 짜는 것으로 돌아오게 되었다. (아마 내가 원하는 기능이 다 있을 것 같긴 하지만, 하나 하나 찾는것 보다는 짜는게 더 쉬울 것 같았다.)

결국, `Go`로 짜게 되었다. 
- 첫번째 이유는 빌드(`go build`)를 하면 사용하려는 유저는 다른 명령어를 알 필요 없이 그저 클릭만으로 바이너리를 실행할 수 있기 때문이였고, 
- 두번째로는 지난달 베타리딩으로 배운 go를 한번 써먹어 보고 싶어서 였다. (간단한 토이 프로젝트는 역시 잘 모르는 언어로 해야 제맛!)


## 2. 시나리오 

내가 필요로 하는 시나리오 구성은 다음과 같았다. 

1. 공용으로 쓸 plugin들은 미리 `/plugins`에 세팅해두고 이 스크립트들은 자동으로 받아져서 Plugin folder으로 옮겨진다.

2. BitBar 설치는 `brew` 대신 zip 파일로 배포된 설치 파일을 이용해 설치한다. 

## 3. 구현하기 

### 1. `/plugins` 에 기본으로 사용할 plugin들 구성하기 

[bitbar-plugins](https://github.com/matryer/bitbar-plugins)에 올라온 스크립트들을 보면 대부분 유저가 설정해야하는 설정값들이 코드 내에서 수정하게 되어있다. 예를 들어, [지라 이슈와 연동하는 plugin](https://github.com/matryer/bitbar-plugins/blob/master/Dev/Jira/jira-issues.10m.py) 경우에도 지라 URL, 유저 ID, PW를 코드 내에 직접 입력을 해야 제대로 동작하고 있다. 

```
    JIRAURL = "<enter-jira-url>"
    USERNAME = "<put here usernema>"
    PASSWORD = "<put here password>"
    JQL = "resolution = Unresolved"
```

코드를 이해해야 하고 또 고쳐야 한다는 부분을 개선하고 싶었다. 

이 부분은 변수를 json 파일로 따로 나눠 파일을 읽어 오는 방식으로 고쳤다. 예를 들어, 내가 만든 [예제 프로젝트의 북마크 기능](https://github.com/jiyeonseo/bitbar-for-everyone/blob/main/plugins/links.10m.py)은 2중으로 구현된 json 포맷을 읽어 링크를 연결해주는 간단한 유틸이다.

```
{
    "Office" : {
        "☘️ main" : "https://google.com",
        "✉️ email" : "https://mail.google.com/mail/",
        "📅 calendar" : "https://calendar.google.com/calendar"
    }
}
```

그리고 메뉴바 가장 하단에 `configuration` 메뉴를 넣어 선택하면 바로 파일 에디터가 뜨고 json 파일만으로 설정을 바꿀 수 있게 하였다.

![](https://user-images.githubusercontent.com/2231510/109478482-a6741d80-7abc-11eb-8826-3c9af1c99f9b.png)
![](https://user-images.githubusercontent.com/2231510/109478343-76c51580-7abc-11eb-96ec-1dfbd30c64be.png)

이 경우 코드를 따로 파악할 필요가 없고 편집이 좀 더 편하다. 다만, json 형식이 크게 친절하진 않으니 이 부분은 좀 더 고민해 봐야겠다.

### 2. Github에서 plugins 코드 다운받기

Github의 코드를 받는 가장 좋은 방법은 `git clone`이지만, 이 경우 `git`이 로컬에 설치 되어있어야 하므로 다른 방법을 생각해 보았다. 

GitHub에서는 특정 브랜치의 코드를 archive zip으로 다운받을 수 있는 기능을 제공하고 있다. 

![](https://user-images.githubusercontent.com/2231510/109497422-5eadc000-7ad5-11eb-8295-8c2c9fbfc25a.png)

주소는 `https://github.com/{user}/{repo}/archive/{branch}.zip` (ex. https://github.com/jiyeonseo/bitbar-for-everyone/archive/main.zip) 로 zip파일을 받고 `/plugins` 폴더 내의 파일들을 plugin folder로 옮기도록 했다. 

```go
    plugins := downloadPlugins() // zip 파일 다운로드 및 unzip
	
	home, _  := os.UserHomeDir()
    pluginLocation := plugins[0] + "/plugins/" 
    configLocation := home+"/Documents/bitbar/" // 문서 아래에 /bitbar 위치로 plugin 위치를 잡았다.
	os.RemoveAll(configLocation) // 기존 파일 삭제 
	rerr := os.Rename(pluginLocation, configLocation) // 다운 받은 plugins 스크립트 옮기기 
	if rerr != nil {
		fmt.Printf("Rename: %s\n", rerr)
	}
```

(Note) 만약 GitHub Enterprise 를 사용하거나 private 사용 시 `/archive/{branch}.zip` 으로 받을 경우 제대로 받아지지 않는다. 이 경우, Github token을 발행받아 `https://github.com/{user}/{repo}/zipball/{branch}`를 통해 동일하게 zip 파일로 받을 수 있다. (예제 코드에서도 [auth가 필요한 경우에는 헤더에 token을 넘기도록](https://github.com/jiyeonseo/bitbar-for-everyone/blob/main/install.go#L72-L76) 한 부분이 있으니 이 부분을 참고하면 된다.)

### 3. BitBar 다운로드 및 설치하기 

나는 항상 `brew`를 통해 BitBar를 설치하고 있지만, 명령어를 치고 권한 체크 하는 등의 작업이 자동화 작업 내에서는 빼고 싶어서, 위와 동일하게 배포된 zip 파일을 받아 설치하는 방식으로 작업해 보았다. 

```go
	cerr := os.Chdir(home+"/Downloads") // 다운로드 폴더로 현재 위치로 옮겨서 
	if cerr != nil {
		fmt.Printf("Chdir err: %s\n", cerr)
	}

	bitbar := downloadBitbar() // zip 파일 다운로드 및 unzip 하고 

	cmd := exec.Command("open", bitbar[0]) // 바이너리 실행
	stdout, oerr := cmd.Output()

	if oerr != nil {
		fmt.Printf("Open err: %s\n", oerr)
	}
```

## 3. 배포하기 

이제 다음과 같이 빌드를 해주게 되면 우선 스크립트 작업은 마무리가 된다. 

```sh
$ go build -o install-bitbar
```

그럼 이 빌드된 바이너리를 배포하는 가장 좋은 방법이 무엇일까?

제일 먼저 떠오르는 방법은 Storage(AWS S3와 같은)를 이용하여 서빙하기. 토이 프로젝트이기 때문에 관리 포인트를 최대한 적게 하고 싶었다. 그래서 우선 pass. 

GitHub 에서 코드를 관리할 예정임으로 빌드된 바이너리도 GitHub에 올리는 것이 관리 측면에서 유리해보였다. 

![](https://user-images.githubusercontent.com/2231510/109571219-b3c9f000-7b2e-11eb-823e-655b62a473ec.png)

혹시나 해서 이렇게 올려도 되나 싶어 올려봤는데 안된다... 다운로드 받아서 실행해보면 다운받은 바이너리가 문제가 있는 듯 하다. 

(update) 권한의 문제였다! repository에 올린 바이너리를 `git clone` 을 통해 다운로드 받으면 권한이 있다. 

```
-rwxr-xr-x  1 user  staff   6.5M  3  6 14:06 install-bitbar
```

하지만 브라우저에서 직접 다운로드를 하게 되면...  
![](https://user-images.githubusercontent.com/2231510/110196124-beb1b700-7e85-11eb-859a-5cf9bf52b39c.png)

```
-rw-r--r--@ 1 user  staff   6.5M  3  6 14:11 install-bitbar
```
권한이 변경된다. 그리고 클릭을 통해 실행하려고 하면...

![](https://user-images.githubusercontent.com/2231510/110196183-3384f100-7e86-11eb-95b4-0512a861d51a.png)

와 같은 경고창이 뜬다. (permission denied 일거라 생각할 수 없는 경고 메세지... ) 터미널에서 `chmod +x install-bitbar`로 실행 권한을 주면 잘 된다. 하지만 비개발자를 위한 스크립트이기에 터미널로 넘어가는 과정을 넣고 싶지 않았다.

BitBar에서 사용하고 있는 방법을 따라해보기로 했다. `/{버전명 폴더}` (ex. `/0.0.1`) 에 빌드된 바이너리를 넣고 압축하여 release에 함께 추가해 주었다. 

![](https://user-images.githubusercontent.com/2231510/109571812-90537500-7b2f-11eb-80fa-3eadd0c2fdb0.png)


## 더 해볼 만한 것 

지금 글을 작성하면서 생각난 아이디어는 Github Actions로 `main` branch로 새로운 push가 들어올 때 마다 `install.go`를 빌드해서 release에 업데이트 해주는 자동화 프로세스도 추가해 볼 수 있을 것 같다. 

그리고 사실, 위 작업한 바이너리를 실행하려고 하면 '확인되지 않은 개발자'라고 경고가 뜬다. 나중에 여유가 된다면 certificate를 넣는 작업도 추가해보고 싶다.

---

평소에도 자동화나 단순 업무를 위한 스크립트를 짜는 것은 해 보았으나 (아예 밖으로 오픈되는 서비스가 아닌 이상에) 비개발자 유저가 사용하기 편하게 빌드하고 배포 하는 것까지 고민하는 일은 별로 없었던 것 같다. 나중에 시간이 되면 [getbitbar.com](http://getbitbar.com) 에서 예전에 제공했던 것 처럼 브라우저에서 바로 설치로 넘어가는 방법도 고민해 볼 수 있을 것 같다. 

위에 설명된 내용은 아래 저장소에서 확인할 수 있다 : [https://github.com/jiyeonseo/bitbar-for-everyone](https://github.com/jiyeonseo/bitbar-for-everyone)