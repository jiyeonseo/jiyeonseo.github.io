---
date: 2022-10-09
tags: 
- fastapi
---

# Bird Eats Bug 

![Bird Eats Bug](https://user-images.githubusercontent.com/2231510/194751048-cf3c9b9a-bcf9-4a87-afbc-c5c7fafd2e2d.jpeg)

- 공식 페이지 [https://birdeatsbug.com/](https://birdeatsbug.com/)

웹 페이지 화면과 내부 로그, 네트워크, 환경을 한번에 녹화 기록 및 버그 리포트를 자동으로 생성해주는 도구.

트위터 탐라 돌아다니다가 [수진님의 추천 트윗](https://twitter.com/sujinleeme/status/1578324826552688641)보고 둘러봤는데 현업에서 너무 유용할것 같아서 짧게나마 정리해둔다. 사용법이 사실 어렵지 않아 그냥 sign up + 크롬 익스텐션 설치 하면 바로 사용 가능! 긴 설명보다는 직접 살펴보는게 최고다. 아래 링크들을 참고하자.


> 녹화 방법 설명 페이지 : [https://playground.birdeatsbug.com/onboarding/](https://playground.birdeatsbug.com/onboarding/)

> 녹화본 샘플 페이지 : [https://app.birdeatsbug.com/sessions/example/](https://app.birdeatsbug.com/sessions/example/)


## 녹화 하기

- 크롬 익스텐션 설치 [https://chrome.google.com/webstore/detail/bird-eats-bug-technical-s/mdplmiioglkpgkdblijgilgebpppgblm](https://chrome.google.com/webstore/detail/bird-eats-bug-technical-s/mdplmiioglkpgkdblijgilgebpppgblm)

![스크린샷 2022-10-09 오후 6 27 33](https://user-images.githubusercontent.com/2231510/194749079-55509866-7123-4e41-b8fa-2c51b16a6142.png)

간단하다. 설치 후 바로 record 하면 된다. 지금 떠 있는 current tab을 녹화하거나 혹은 전체 화면 (Your screen)을 녹화하면 된다. **살펴보려는 케이스가 클릭 후 새로운 탭이나 윈도우로 다른 페이지로 연결되는 경우 "Your screen"을 사용하면 된다. 넘어간 페이지에서의 network까지 모두 저장된다.**

## 녹화 결과 화면

![스크린샷 2022-10-09 오후 6 54 56](https://user-images.githubusercontent.com/2231510/194750239-1f1c2782-6f36-4a68-8689-7cdaa21075e6.png)

녹화 화면과 함께 "Developer tools"라는 크롬 개발자 도구와 같은 탭이 함께 제공된다. 

### Console

![스크린샷 2022-10-09 오후 6 56 27](https://user-images.githubusercontent.com/2231510/194750315-13278649-1563-4d63-a103-b864bf981abe.png)

마치 크롬 콘솔창처럼 어떠한 이벤트들이 일어났는지 확인할 수 있다. 시간 순으로 나열되어 있으며, 비디오 재생과 함께 시간의 흐름도 표시해준다. `console` 표시, script 내 error log도 함께 표시되니 버그 제보시 아주 유용해보인다. 

### Network

![스크린샷 2022-10-09 오후 6 57 10](https://user-images.githubusercontent.com/2231510/194750337-6a6f7e0a-e1d4-4b19-9ea5-829e501371e4.png)

녹화 중 발생한 network 이벤트들을 확인할 수 있다. 이 역시도 크롬과 동일한 모양이여서 금방 익힐 수 있다. 

### System Info

![스크린샷 2022-10-09 오후 7 06 59](https://user-images.githubusercontent.com/2231510/194750730-594135a2-bf63-48bd-a8f6-69c785f52b6a.png)

발생 환경 역시 확인할 수 있다.

### E2E Helper

![스크린샷 2022-10-09 오후 7 09 14](https://user-images.githubusercontent.com/2231510/194750843-2d1a3eaa-15cb-4230-aaba-66f2df72594f.png)

아직 Beta 버전이고, [playwright](https://playwright.dev/)로 DOM 이벤트 발생 및 expect 하는 테스트 코드를 자동으로 생성해 준다. 음. 아직은 부족해 보이지만, 복잡한 DOM 이벤트가 많이 발생하는 케이스라면 어느 정도 참고해볼 만하지 않을까 싶다.

## Replays 

상단에 "Replays"가 있는데, 일종의 차량 "블랙박스"라고 생각하면 된다.(공식 페이지에도 진짜 그렇게 써져있다) "Replays"를 활성화 시키면 백그라운드에서 계속 녹화를 하고 있고, 모두 종료된 후에 확인하고자 하는 구간만 crop 가능하다. 버그를 발견 한 뒤, 다시 녹화하기 위해 재현하는 수고를 줄 일 수 있다.


![스크린샷 2022-10-09 오후 6 42 49](https://user-images.githubusercontent.com/2231510/194749733-d19e33e0-ffa1-422a-9039-98b4015a1896.png)

Replays로 녹화 된 경우, 확인하려는 구간의 "start" ~ "end"를 직접 조절할 수 있다. 

Replays의 녹화는 기본 record 녹화와는 조금 다르게 동작한다고 한다. 

- Record : 녹화 시작 후 모든 프레임을 다 캡쳐 및 녹화 하기 때문에 리소스를 많이 사용한다.

- Replays : DOM의 변경 사항 혹은 event(클릭, 데이터 로드 등)에 대해서만 기록하기 때문에 리소스를 적게 사용한다. 그리고 모든 기록을 다 저장하지 않고, 최근 활동에 대해서만 저장한다고 한다. 

위와 같은 다른 동작 방식으로 인한 한계점들도 있다. 

- `<iframe>`, `<canvas>` 와 같은 일부 태그는 녹화되지 않는다. (예: Google 지도)
- HTML 문서 외부의 리소스는 녹화되지 않는다. 
- 팝업 윈도우는 녹화되지 않는다.
- "이벤트"를 녹화하는 것에 초점이 맞추어져 있기 때문에, 짧은 시간동안 많은 양의 이벤트를 트리거하는 경우(예: 백그라운드에서 데이터 로드가 많은 경우)에는 적합하지 않다. 

따라서 실제 페이지와 다르게 표시되거나 누락되는 세션이 있을 수도 있다. 

특정 도메인에 대해서 항상 백그라운드로 녹화하도록 설정할 수도 있다. 

![스크린샷_2022-10-09_오후_7_00_54](https://user-images.githubusercontent.com/2231510/194750507-5362d7a6-a72e-4981-bcd6-5f236facfc62.png)

크롬 익스텐션 설정에서 도메인 설정을 해주면 해당 도메인에 들어갈때마다 자동으로 "Replays"가 활성화되고 최근 이벤트에 대해서 계속 녹화를 하게 된다. 

![스크린샷 2022-10-09 오후 7 01 33](https://user-images.githubusercontent.com/2231510/194750532-137ccbad-4199-4856-b16a-01cd26a5100f.png)

블박이 바로 켜진다고 생각하면 된다. 본인이 서비스하는 웹페이지에 대해서 켜 놓으면 많은 이득을 볼 수 있을 것 같다. 


## 가격 

![스크린샷 2022-10-09 오후 8 13 50](https://user-images.githubusercontent.com/2231510/194753748-8882afef-cfde-426a-bd76-3f9bcf96b25f.png)


구독 plan을 제공하여, 녹화 후 간편히 upload를 통해 팀과 공유 하거나 댓글을 남길 수도 있고, jira, slack 등 다른 서비스와의 연동도 편리하게 할 수 있다. 

![스크린샷 2022-10-09 오후 6 14 46](https://user-images.githubusercontent.com/2231510/194748512-b04ddceb-af7b-4175-8a67-f3ba1c209af0.png)

가격 페이지 [https://birdeatsbug.com/pricing](https://birdeatsbug.com/pricing)

공짜로 사용시에는 한 달 15건 업로드 가능하고 혼자만의 workspace를 가질 수 있다. 

살짝 사용해보니 무료 plan 안에서도 충분히 사용해볼 수 있을 것 같다. 영상 같은 경우, Upload를 하지 않은 상태에서도 다운로드 기능을 제공한다. 

![스크린샷 2022-10-09 오후 6 44 30](https://user-images.githubusercontent.com/2231510/194749856-2bd82424-5560-416a-aa47-60a831e389f9.png) 


## reference 
- [How to use Bird Eats Bug to debug your front-end application](https://birdeatsbug.com/blog/how-to-use-bird-to-debug-front-end-application)
