---
date: 2018-08-31
tags: 
  - etc
  - Azure
---

# Azure Function + Telegram chatbot 만들기

[Serverless Telegram bot on AWS Lambda](https://hackernoon.com/serverless-telegram-bot-on-aws-lambda-851204d4236c) 는 AWS 람다 + Python 을 이용하여 텔레그램 봇을 만드는 실습 블로그인데, 읽다가 왠지 조금 다르게 해보고 싶어서 Azure Function + Node 로 살짝 다르게 실습해 보았다. 

***

# 준비사항
- Node v6.5.0 이상
- MS Azure 계정 
- 텔레그램 계정 


## 1단계 : Telegram Bot 생성 및 토큰 받기 

[@BotFather](https://web.telegram.org/#/im?p=@BotFather) 에서 봇을 만든다. 

- `/newbot` : 새로운 봇 생성. 이름은 *_bot 과 같은 형식으로

![](@assets/20180831/telegram_bot.png)

마지막에 발급 받은 Token을 나중에 사용한다. 봇 생성 끝!

## 2단계 : Serverless framework 를 이용한 프로젝트 생성

쉽게 사용하고 쉽게 배포할수 있는 [Severless framework](https://serverless.com/framework/)을 사용하겠다. 이 프레임워크에서는 AWS, Azure 뿐만 아니라 Google cloud 등 [다양한 클라우드 프로바이더](https://serverless.com/framework/docs/)에 대해 서포트 하고 있으니 원하는 클라우드에 따라서 선택하면 된다. 이번 블로그에서는 Azure function을 사용해 보도록 하겠다. 

### Serverless framework 설치 

```sh
$ npm install -g serverless
```

### 새로운 프로젝트 생성  
```sh 
$ serverless create --template azure-nodejs --path {path_name} --name {my-unique-name}
```

새로 생성된 프로젝트 폴더로 들어가면 두 개의 파일이 생성된 것을 볼 수 있다. 

- `handler.js` : node 코드로 된 템플릿
- `serverless.yml` : 설정 파일 

```
$ cd {path_name}
$ npm install 
```

## 3단계 : Serverless 배포 및 확인 

```sh
$ serverless deploy
```

만약, Azure에 미리 로그인이 되어있지 않다면 로그인 하는 페이지가 열리게 된다. 
그리고 다음과 같이 로깅이 뜨는 걸 볼 수 있다. 

```sh
Serverless: WARNING: Missing "tenant" and "app" properties in serverless.yml. Without these properties, you can not publish the service to the Serverless Platform.
Serverless: Building Azure Events Hooks
Serverless: Parsing Azure Functions Bindings.json...
Serverless: Building binding for function: hello event: httpTrigger
Serverless: Building binding for function: hello event: http
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Logging in to Azure
Serverless: Creating resource group: azure-telegram-sample-rg
Serverless: Creating function app: azure-telegram-sample
Serverless: Waiting for Kudu endpoint...
Serverless: Uploading function: hello
```

### invoking 
```sh
$ serverless invoke -f hello -l
```

### log 
```sh
serverless logs -f hello -t
```
[Azure Portal](https://portal.azure.com/) 에 들어가 Azure Function을 확인하면 새로운 함수 앱과 함수 hello가 생성된 것을 확인 할 수 있다. 

![](@assets/20180831/azure-telegram-sample-function.png)


## 4단계 : Telegram bot (Node.js)

텔레그램 봇 개발을 더 편하게 하기위해 아래 패키지들을 추가로 설치해준다. 

```
$ npm install --save node-telegram-bot-api request
```

- [`node-telegram-bot-api`](https://github.com/yagop/node-telegram-bot-api) : Telegram Bot API for NodeJS


위에서 생성된 `handler.js` 에 다음 코드를 복사 붙혀넣기 한다
```js
'use strict';

module.exports = (context, req) => {
    const TelegramBot = require('node-telegram-bot-api');

    const token = "YOUR_API_TOKEN";
    const bot = new TelegramBot(token);
    const chatId = req.body.message.chat.id;

    const out = bot.sendMessage(chatId, 'Hello World!');
    
    context.res = {
    // status: 200, /* Defaults to 200 */
        body: 'ok',
    };    

    context.done();
};
```

그리고 배포 

```sh
$ serverless deploy
```

## 5단계 : Telegram bot과 연결
 
Portal > Function App -> 만든 functionn app -> function "hello"를 들어가면 url end point를 얻을 수 있다. 

![](@assets/20180831/azure-telegram-sample.png)

`https://api.telegram.org/bot<Your Telegram TOKEN>/setWebhook` 로 
	발급받은 endpoint 를 연결해준다. 

```sh 
$ curl --request POST --url https://api.telegram.org/bot{token}/setWebhook --header 'content-type: application/json' --data '{"url": "{end-point}"}'
```

## 6단계 : demo!

봇에게 말을 걸어보면! 

![](@assets/20180831/Telegram_Web.png)

끄읕! 

### 소스코드 

[https://github.com/jiyeonseo/azure-telegram-sample](https://github.com/jiyeonseo/azure-telegram-sample)

### 참고 링크들 
- [https://dev.to/lordferquad/telegram-bot-prototype-using-serverless-framework-and-webtask-e7g](https://dev.to/lordferquad/telegram-bot-prototype-using-serverless-framework-and-webtask-e7g)
