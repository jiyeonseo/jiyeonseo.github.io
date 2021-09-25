---
date: 2021-09-26
tags:
  - python
  - flask
---

# Flask에서 RuntimeError: Working outside of request context.

Flask 쓰다가 삽질을 너무 쎄게 해서 잊지 않기 위해 글로 남겨둔다. 

Flask + Celery 조합으로 비동기 처리를 하던중 다음과 같은 에러메세지가 떴다. 

```
RuntimeError: Working outside of request context.

This typically means that you attempted to use functionality that
needed an active HTTP request. Consult the documentation on testing
for information about how to avoid this problem.
```

(어디서 났는지 코드라인을 정확하게 알려주면 좋을텐데 ㅠ)

에러 메시지를 읽어보면 active한 HTTP 요청을 필요로 하는 기능을 사용하려 했고 이때문에 에러가 발생한 케이스이다. 

나의 경우, Celery를 통해 시작된 Task가 실행된 코드 내에서 발생한 것이 였기에 HTTP 요청이 없는 것이 맞고, 다만 내가 언뜻 보기에는 따로 처리하는 부분이 없어서 코드를 하나 하나 뒤져가며 디버깅을 했다. 

결론 먼저 이야기하자면, `Task` 안에서 생성하는 `class`의 `__init__` 안에서 다른 Util성 Class 객체를 가져오는 부분이 있었고, 그 내부에서 `request`의 `header`를 가져와서 체크하는 로직이 들어있었다. 타고 타고 계속 들어가야 하는 부분이여서 찾아내는데 꽤 오래 걸렸다.

이렇게 열심히 디버깅을 하고 나서 ㅠㅠ 나중에 공식문서에서 이에 대한 힌트를 주고 있는 것을 확인했다. 

> If you try to access [request](https://flask.palletsprojects.com/en/2.0.x/api/#flask.request), or anything that uses it, outside a request context, you’ll get this error message:
>
> This should typically only happen when testing code that expects an active request. One option is to use the [test client](https://flask.palletsprojects.com/en/2.0.x/api/#flask.Flask.test_client) to simulate a full request. Or you can use [test_request_context()](https://flask.palletsprojects.com/en/2.0.x/api/#flask.Flask.test_request_context) in a with block, and everything that runs in the block will have access to request, populated with your test data.
>
> If you see that error somewhere else in your code not related to testing, it most likely indicates that you should move that code into a view function.

([https://flask.palletsprojects.com/en/2.0.x/reqcontext/#manually-push-a-context](https://flask.palletsprojects.com/en/2.0.x/reqcontext/#manually-push-a-context))

이를 정리해보면...

위의 에러 메세지를 보았을 때, 

- 코드 안에서 [request](https://flask.palletsprojects.com/en/2.0.x/api/#flask.request)를 부르고 있는지를 먼저 체크해 볼 것. 
  - 왠만하면 view function으로 코드 옮기기 

```py
from flask import request # 요걸로 찾아보자
``` 

- 만약 테스트 코드 안에서 발생한다면...
  - [test client](https://flask.palletsprojects.com/en/2.0.x/api/#flask.Flask.test_client)를 사용해서 요청을 만들거나 
  - `with` 블락과 함께 [test_request_context](https://flask.palletsprojects.com/en/2.0.x/api/#flask.Flask.test_request_context)를 아래와 같이 사용하거나 

```py
def generate_report(year):
    format = request.args.get('format')
    ...

with app.test_request_context(
        '/make_report/2017', data={'format': 'short'}):
    generate_report()
```

에러 메세지에서도 이미 이야기 해주고 있는데, "내 코드에서는 request 안 찾는데?" 라고 굳게 믿어버리고 돌아 돌아 문제를 발견했다. 에러 메세지 속 request가 `from flask import request` 거라고 생각도 못했다. (왜그래쓰까) 

에러 메세지, 그리고 공식 문서 꼼꼼히 읽는 것은 항상 중요하다.  