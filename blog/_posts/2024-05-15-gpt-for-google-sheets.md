---
date: 2024-05-15
title: 'GPT for Google Sheets 만들기 with Apps Script'
tags: 
- etc
---

업무 생산성 높히기를 떠올리면 아무래도 가장 먼저 떠오르는게 역시 엑셀일 것 같다. "두번 이상 반복 작업은 무조건 Python으로!!" 외치는 사람이지만, 사실 두번째 작업 하면서  '엑셀 함수로는 못하나?'를 먼저 생각한다. 최고의 소프트웨어는 역시 엑셀이다.

다만, 맥을 주된 환경으로 사용하다보니(+ 협업을 위해) 로컬 엑셀보다는 Google Sheets를 훨씬 많이 사용하게된다. Google Sheets에서의 정말 강력한 기능 중 하나는 구글 드라이브(문서, 시트 등등)에서 Apps Script를 조합해서 사용할 수 있다는 것이다. 자바스크립트 문법만 조금 알면, 기본 제공되는 함수를 넘어서 각종 이벤트(데이터 추가,변경 등)을 이용하여 외부 연동, 복잡한 데이터 처리 등을 할 수 있으며, 커스텀 함수도 만들 수 있다. 

그 말인 즉슨, 외부 연동을 하는 커스텀 함수를 만들 수 있다. GPT를 Google Sheets에서 사용할 수 있는 커스텀 함수를 만들어보자. 

## Open AI API 

여러 LLM API 서비스들이 있지만 가장 유명한 Open AI API를 사용해보겠다. 만약 Google Gemini나 Claude를 사용하더라도 인터페이스가 많이 다르지 않기 때문에 조금 수정하여 사용할 수 있다. 

1. [OpenAI Platform](https://platform.openai.com/) 에서 로그인 한다.

2. 좌측 탭에서 `API Keys` 를 선택하고 새로운 API Key를 생성한다. 
![](https://github.com/jiyeonseo/jiyeonseo.github.io/assets/2231510/f139b19b-8199-4554-b835-ac5024901ee2)

> 만약, 처음 가입하거나 아직 전화번호 인증을 하지 않았으면 화면에 가이드되는 것을 따라 인증을 진행하고 API 사용을 위해서는 Credit을 사야한다. API를 얼마나 사용했는지는 `Usage`에서 하루하루 얼마나 사용했는지 확인해 볼 수 있다. 

![](https://github.com/jiyeonseo/jiyeonseo.github.io/assets/2231510/a777ac03-5609-4fb0-a462-846a4a3d95e0)

## Apps Script

1. 사용하고자 하는 시트를 생성하고, 상단 탭에서 "확장 프로그램" > "Apps Script" 를 클릭하여 해당 스프레드시트에서 사용할 수 있는 Apps Script 프로젝트를 만든다. 

![](https://github.com/jiyeonseo/jiyeonseo.github.io/assets/2231510/b799c068-8f7b-4152-844f-2489ef092e5f)

2. 하단 코드를 복사하여 넣는다. 

```javascript
var apiKey = "[위 Open AI Platform에서 발급받은 API Key]";

function GPT_FUNC(prompt, value, temperature = 0.7, model = "gpt-4o") {
  var url = "https://api.openai.com/v1/chat/completions";
  
  if (typeof prompt === "string") {
    prompt = prompt.trim();
  } else if (Array.isArray(prompt)) {
    prompt = prompt.join(" ");
  } else {
    throw new Error("Invalid prompt type. Expected string or array.");
  }
  
  if (value) {
    if (typeof value === "string") {
      prompt += " " + value.trim();
    } else if (Array.isArray(value)) {
      prompt += " " + value.join(" ");
    } else {
      throw new Error("Invalid value type. Expected string or array.");
    }
  }
  var payload = {
    model: model,
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: temperature,
  };

  var options = {
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + apiKey,
    },
    payload: JSON.stringify(payload),
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var json = response.getContentText();
  var data = JSON.parse(json);
  
 
  if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
    var content = data.choices[0].message.content;
    try {
      return JSON.parse(content);
    } catch (e) {
      return content;
    }
  } else {
    throw new Error("No valid response from the API.");
  }
}
```

3. 코드를 넣으면 자동으로 저장되고 다시 스프레드 시트로 돌아가 `=GPT_FUNC("[요청 프롬프트]", [값])`와 같이 함수를 사용할 수 있다. 

3.1. API를 좀 더 잘 사용하기위해서는 `temperature` 와 `model` 역시도 조정 가능하다. 

- `temperature` : 모델의 응답의 창의성, 무작위성을 조절하는 파라미터로 값이 낮으면(ex. 0.2) 더 일관되고 결정적인 응답을 제공하며, 값이 높으면(ex. 0.8) 더 다양하고 창의적인 응답을 생성한다. 값은 0~2까지 설정 가능하다. 

- `model` : Open AI API 에서 제공하는 model들을 선택할 수 있다. 기본적으로는 가장 최근에 나오고, 가격도 좋은  
`gpt-4o` 를 사용하도록 하였다. 사용 가능한 모델들은 [공식 문서](https://platform.openai.com/docs/models)에서 더 찾아볼 수 있다. 

## 사용법 

1. 간단하게 두 수를 더하는 방법 (물론 이 경우는 `SUM`을 사용하는 것이 훨씬..... 싸고 효율적이지만!)

> =GPT_FUNC("선택된 모든 수를 더하여 숫자만 돌려주세요. 예를 들어 '1,2' 가 선택되어있다면 '3' 숫자 값만 돌려주세요. 숫자가 아니라면 'N/A'로 답주세요. 오직 숫자 혹은 'N/A'만 답합니다.", A1:B1, 0.2, "gpt-4o")

- 답이 창의적일 필요가 없기 때문에 이러한 경우 temperature를 낮게 주는 것이 좋습니다. 

![](https://github.com/jiyeonseo/jiyeonseo.github.io/assets/2231510/7288a70c-c629-4130-83be-fb302106d018)


2. CS 문의 내용 상품 및 작업 분류하기 

> =GPT_FUNC("CS 내용을 읽고, '상품', 'CS 분류(교환,확인,결제관련)' 을 분류해주세요. JSON 형태로 답해주세요.",A1)

![](https://github.com/jiyeonseo/jiyeonseo.github.io/assets/2231510/cbefa4a4-b578-47dc-a7c3-b2c47fcfd3ee) 

더 다양한 GPT, AI 도구 사용법을 알아보고 싶다면 [요즘 AI 페어 프로그래밍](https://www.yes24.com/Product/Goods/126283890) 책을 추천합니다 :))) 

![XL (3)](https://github.com/jiyeonseo/jiyeonseo.github.io/assets/2231510/bf4b7e41-b160-422c-9c07-21c4419166b0)