---
date: 2018-07-23
tags: 
  - etc
---

# asciinema - Record and share your terminal sessions

Terminal 작업을 공유해야 할 상황에서 크게 두가지를 생각해 볼 수 있다. 

###  1. 스크린캐스트  
맥 환경에서는 기본앱인 QuickTime으로 쉽게 스크린캐스트가 가능하지만 보는사람 입장에서는 화면만 볼 수 있고 실습을 해보고자 할때는 다시 손으로 직접 쳐봐야 한다. 

### 2. 코드 스닛팻 공유 

실습하는 입장에서는 복붙이 쉽다. 하지만 작성자가 커맨드 결과에 대해서도 이야기 하고자 할때 결과를 다 복붙하는 것은 귀찮다. 

이 두가지를 해결 할 수 있는 신박한 솔루션을 찾았다. 

![](@assets/20180723/asciinema.png)

# asciinema
- [https://asciinema.org/](https://asciinema.org/)
- Record and share your terminal sessions, the right way.
- 터미널 작업 녹화 + 웹 공유 를 지원하는 솔루션. 

## 장점 
- Simple recording : 커맨드 라인으로 바로 리코딩 시작.  
- Copy & paste : 플레이어 내 커맨드 라인 드래그/복붙 가능.
- Embedding : embedded player 가능. [링크](https://asciinema.org/docs/embedding)를 통해 더 자세히 알아 볼 수 있다. 

## 내가 한 환경
- Mac OSX Sierra

## 설치 
```sh
$ brew install 
```

- `fails after brew installation: ModuleNotFoundError: No module named 'pkg_resources’` 에러가 날 경우. 다음 이슈를 따르면 잘 해결된다. [asciinema/asciinema#260](https://github.com/asciinema/asciinema/issues/260)


## 사용방법
```
$ asciinema rec // 녹화시작 

asciinema: recording asciicast to /var/folders/n4/ws_1h7316zb6rjv6_2_tbnqhmll586/T/tmpckm85iin-ascii.cast
asciinema: press <ctrl-d> or type "exit" when you're done

$ exit // or <ctr-d> 녹화 끝  
asciinema: recording finished
asciinema: press <enter> to upload to asciinema.org, <ctrl-c> to save locally

https://asciinema.org/a/DwAilr7WusKCkBYumSqRB5O0v
```
무료로 서버에 업로드까지 해준다!!! 

<!-- <script src="https://asciinema.org/a/qCFY7oOgOIb4K7MDHtx60yww2.js" id="asciicast-qCFY7oOgOIb4K7MDHtx60yww2" async></script> -->

끝으로, [Featured asciinema](https://asciinema.org/explore/featured)에 가면 대단한 terminal덕 들의 작품을 볼 수 있다.

