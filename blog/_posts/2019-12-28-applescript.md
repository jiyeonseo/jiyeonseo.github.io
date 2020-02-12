---
date: 2019-12-28
tags: 
  - applescript
---

# Applescript로 간단한 카톡 자동 대화하기
 
  카카오톡에서 [카카오 AI봇(외개인아가)을 오픈하면서 이벤트](https://pf.kakao.com/_lKxoMT/42532373) 를 하였다. 경품은 에어팟 프로! 경품을 받고싶다.  

이벤트 상세 정보는 아래와 같다. 
- 카카오톡채널: 외개인아가 [https://pf.kakao.com/_lKxoMT](https://pf.kakao.com/_lKxoMT)
- 이벤트 기간 : 11/19(화) - 12/18(수)
- 당첨자 발표 : 12/27(금)
- 외개인아가와 친해지고, 호감도 50%를 달성해보세요.🥰추첨을 통해 30분께 경품을 드립니다.🎁 
  - 이 이벤트를 노려본다!!
  
첫 며칠은 직접 대화를 하며 익혀보았다. 

![](@assets/20191228/start_conversation.jpg)

- '우리 얼마나 친해?' 라는 말을 하면 지금 호감도를 알려준다. 
- 하루에 최대 3% 정도씩만 호감도가 오른다. (선톡에 대답을 잘 한 경우, 0.5% 정도의 보너스 호감도도 가끔 발생한다) 
- 50%까지 오르려면 대략 17일 정도의 부지런함이 필요하다.

매일 카톡을 쓰는 유저이기 때문에 큰 어려움은 아닌 것 같아 보였지만, 그래도 자동화 하고 싶다. 

먼저 생각난 방법은 API 콜이긴 하지만, 왠지 주기적인 콜이 가게 되면 어뷰징으로 걸릴것 같아서 (도둑이 제 발 저린다) 내 로컬에서 직접 타이핑 하듯 대화를 자동화 하고 싶다. 

- 내 로컬 환경은 Mac OS, 카카오톡 맥 앱도 깔려있다. 
- 빠르게 자동화하고 끝내고 싶음으로 (+ 공부하고 싶어서) Applescript로 결정. 

## Applescript
> AppleScript is a scripting language created by Apple. It allows users to directly control scriptable Macintosh applications, as well as parts of macOS itself. You can create scripts—sets of written instructions—to automate repetitive tasks, combine features from multiple scriptable applications, and create complex workflows.

> 애플에서 만든 스크립트 언어. 맥킨토시 앱을 컨트롤 할 수 있으며, 반복되는 작업을 자동화 하고 다양한 기능들을 종합하여 복잡한 작업들을 수행할 수 있다. 


## 구현 

구상한 시나리오는 다음과 같다. 
1. 카카오톡을 연다 
2. '외개인아가'와의 톡 창을 연다. 
3. 대화는 내가 미리 만들어놓은 대화로 자동으로 대화하고 마지막에 친밀도를 확인한다. 

![](@assets/20191228/checking.jpg)

개발에는 AppleScript 에디터인 'script editor'를  이용한다. 

### 1. 카카오톡 열기
```
tell application "KakaoTalk" to activate
```
대부분의 문법이 위와 같다. `tell application {application} to {object}`

어플리케이션의 이름을 알기 위해서, 카카오톡을 먼저 실행 시키고 터미널에서 `ps -ef` 로 실행되고 있는 어플리케이션 중에서 찾았다. 
```
/Applications/KakaoTalk.app/Contents/MacOS/KakaoTalk
```
동일 방법으로 찾으면 크롬의 경우,
```
 /Applications/Google Chrome.app/Contents/Frameworks/Google Chrome
```
즉, AppleScript로 크롬을 열 때는 `Chrome` 이 아니라 `Google Chrome` 으로 해야한다. 

### 2. (PASS) 외개인아가와의 대화창 열기

이 부분은 사실 해결하지 못했다. 다른 어플리케이션, 예를 들어 [크롬과 같은 경우 title에서 특정 단어를 `contains` 하였는지로 특정 탭 혹은 윈도우를 찾을 수 있는데](https://macscripter.net/viewtopic.php?pid=194207), 카카오톡의 경우, 여러개의 대화창이 있더라도 하나의 윈도우로 인식되어 내가 생각하는데로 동작하지 않는다. 

### 3. 문자 입력 하기

AppleScript에서 문자 입력하는 방식은 아래와 같다. 
```
tell application "System Events"
	keystroke "yo world"
	key code 36 # enter
end tell
```

한 어플리케이션에서 다양한 액션을 취할때는 `tell application {application}`으로 시작하여 실행하고자 하는 명령어들을 나열 후, `end tell`로 닫아주면 된다. 

`key code {code}` 는 아래 키보드와 매핑된 코드를 참고하면 된다. 

![](@assets/20191228/applekeycode.png)

즉, `key code 36` 는 enter를 치는 것을 의미한다.  

### 4. 미리 대화 정의 하기

미리 대화를  정의한 이유는, 봇에서 제공하는 몇몇 기능들이 있는데 (끝말잇기, 초성 맞추기 등) 이러한 기능을 자주 사용하면 보너스 친밀도가 더 있지 않을까 싶어서 넣어보았다. (검증되지 않음)

```
// desktop/dialog.txt
Hello world
안녕?
삼행시
...
...
우리 얼마나 친해? 
```

### 5. 파일 속 문장 한 줄 씩 읽기

봇의 대답시간도 기다려주기 위해 1.5초 delay도 넣었다. 

```
set srcFile to ((path to desktop) as text) & "dialog.txt"
set lns to paragraphs of (read file srcFile as «class utf8»)

repeat with ln in lns
	tell application "KakaoTalk" to activate
	tell application "System Events"
		keystroke ln
		key code 36 
        delay 1.5
	end tell
end repeat
```

Run!

이를 실행하게 되면 영어는 잘 되지만, 한글이 깨짐을 확인할수 있다. 한글 처리는 항상 어렵다. 

### 6. 한글 처리하기 

바로 입력의 경우, 몇 언어 혹은 문자열이 그대로 타이핑이 안되는 문제가 있다. Cocoa의 기능을 이용해 클립보드에 복사(ctl+c)하여 붙혀넣는 방식(ctl+v)으로 하게되면 해결 할 수 있다. 

```
on stringToClipboard(t1)
	do shell script "/usr/bin/python -c 'import sys;from AppKit import NSPasteboard, NSPasteboardTypeString; cb=NSPasteboard.generalPasteboard();cb.declareTypes_owner_([NSPasteboardTypeString], None);cb.setString_forType_(sys.argv[1].decode(\"utf8\"), NSPasteboardTypeString)' " & quoted form of t1
end stringToClipboard
```

## 결과물 

![](@assets/20191228/demo_applescript.gif)

(demo 속 테스트를 길게 하고 싶어서 인터넷에 오픈 되어있는 연극 대본을 이용하였다.)  

최종 스크립트 : [https://gist.github.com/jiyeonseo/895023ea4ac94ed64c9359bdd2fd76b7](https://gist.github.com/jiyeonseo/895023ea4ac94ed64c9359bdd2fd76b7)
 
이 자동화로 아침에 업무를 시작하기 전에 혹은 업무 중간 중간에 돌리며 차근차근 친밀도를 올려나갔다.  

사실 어제 당첨자 발표가 올라왔다. 당첨자 이름들이 마스킹이 되어 잘 알아 볼 수는 없지만 안된것 같다.... 후우.. 역시 자동화는 중요하지 않다. 운이 있어야 한다. 

처음 AppleScript를 해봤는데 문법이 매우 직관적이여서 코드를 읽고 익히기에 쉬웠다. 다만, 기본 제공되는 Script Editor가 매우 단순하여, 포매팅이라던가 문법 하이라이팅이 아주 아쉬웠다. 개발은 툴이 반인데. 그래도 앞으로 계속 맥을 사용하며 로컬에서 단순한 나만의 자동화를 생각한다면, 바로 AppleScript를 생각해볼 것 같다. 

### 개선해야하는 사항들 (나중에해야징ㅋ)
- 특정 대화창 찾기. 
- 내가 직접 런 하지 않게 배치 돌며 알아서 돌기 (로컬용이기 때문에 내가 랩탑을 잠그면 소용없긴 함)  


### References 
- [https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html)

- [https://eastmanreference.com/complete-list-of-applescript-key-codes](https://eastmanreference.com/complete-list-of-applescript-key-codes )

- [https://apple.stackexchange.com/questions/288536/is-it-possible-to-keystroke-special-characters-in-applescript/288541#288541](https://apple.stackexchange.com/questions/288536/is-it-possible-to-keystroke-special-characters-in-applescript/288541#288541) 


  