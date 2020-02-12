---
date: 2019-01-02
tags:
  - book
---

# [책] '가장 빨리 만나는 챗봇 프로그래밍'

['가장 빨리 만나는 챗봇 프로그래밍 with Bot Framework'](https://search.daum.net/search?w=bookpage&bookId=4836771&tab=introduction&DA=LB2&q=%EA%B0%80%EC%9E%A5%20%EB%B9%A8%EB%A6%AC%20%EB%A7%8C%EB%82%98%EB%8A%94%20%EC%B1%97%EB%B4%87%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)

튜토리얼 형식으로 챗봇을 처음 공부하는 사람 그리고 빠르게 익혀야 하는 사람들에게 추천.  

책에서 다루는 부분들은 아래와 같다. 
- Azure Bot Service 
- Bot Framework 
- Azure SQL Database
- QnA Maker
- LUIS 
- 외부 다양한 플랫폼들과의 통합. Skype, Facebook, Telegram, 그리고 카카오톡까지! 

개인적으로 Azure를 이용해 Serveless를 공부하고 있는데, Web Service, DB 등은 언급해주어서 같이 공부할 수 있어서 좋았다. 특히 요금 정책..... 저번달에 모르고 Service Plan 테스트용 만들어 놨다가 까먹고 돈 좀 나갔다.

그럼에도 불구하고 아쉬운 점을 꼽자면...  

- C#과 Visual Studio가 익숙하지 않은 사람이라면 많이 매일수 있다. (바로 나야 나...) Node 예제를 다 다루지 못하더라도 같은 기능을 동작하는 Node 예제 코드를 같이 제공했으면 더 좋았을 것 같다.
	- 5장 까지 내용을 Node + SDK3 기반으로 만들어 보았다 : [chatbot_node_botbuilder_sdk3](https://github.com/jiyeonseo/chatbot_node_botbuilder_sdk3)

- Window 환경 기반으로 쓰여진 책이라 내 환경인 Mac 그리고 Visual Studio for Mac과는 맞지 않는 부분이 있었다. 그리고 몰랐다.... 여기서 삽질을 좀 했다.
	- Visual Studio for Mac에 맞춘 코드 : [cheesecheeseball](https://github.com/jiyeonseo/cheesecheeseball)

- 중간에 Bot Builder SDK default 버전이 변경되면서 Portal Azure에서 헤맴 -- 아래 저자의 애프터 서비스 영상에서 언급되고 있다! 
	- Bot Template SDK 3 → SDK 4 : [http://blog.naver.com/PostView.nhn?blogId=warit&logNo=221431965506](http://blog.naver.com/PostView.nhn?blogId=warit&logNo=221431965506)

## 내 중간 공부 노트 

- [https://github.com/jiyeonseo-study/Azure-study/blob/master/bot_service.md](https://github.com/jiyeonseo-study/Azure-study/blob/master/bot_service.md)

## Azure Function 을 이용한 봇 코드 샘플 
- [azure-line-bot-example](https://github.com/jiyeonseo/azure-line-bot-example)
- [azure-telegram-sample](https://github.com/jiyeonseo/azure-telegram-sample)
