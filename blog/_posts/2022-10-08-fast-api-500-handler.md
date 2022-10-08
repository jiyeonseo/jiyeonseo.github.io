---
date: 2022-10-08
tags: 
- fastapi
---

# Fast API 500 Exception Handler 처리

Real world에 나가기 전 서버에서 꼭 챙겨야 하는 것 중 하나는 500 error handling이다. `500 internal server error`는 의도한 것도 예상했던 에러도 아니니 발견하고 빨리 고치는 수 밖엔 없다. 발생 하였을 때, 
내부적으로는 자세한 로그를 남겨야 하지만, 외부로 자세한 내용을 알려줄 필요는 없다. (보안 이슈)

Fast API 공식 문서에서도 동일한 내용을 찾아 볼 수 있다. 

```
FastAPI uses it so that, if you use a Pydantic model in response_model, and your data has an error, you will see the error in your log.

But the client/user will not see it. Instead, the client will receive an "Internal Server Error" with a HTTP status code 500.

It should be this way because if you have a Pydantic ValidationError in your response or anywhere in your code (not in the client's request), it's actually a bug in your code.

And while you fix it, your clients/users shouldn't have access to internal information about the error, as that could expose a security vulnerability.
```

## 기본 error handler 추가 방법

FastAPI 에서 제공하는 데코레이터를 이용하여 간편하게 `@app.exception_handler` 로 핸들러를 등록할 수 있다. 

```py
from fastapi import FastAPI, Request, status
from fastapi.responses import PlainTextResponse, JSONResponse

from starlette.exceptions import HTTPException as StarletteHTTPException

app = FastAPI()

@app.exception_handler(StarletteHTTPException) # Exception class로 
async def http_exception_handler(request: Request, exc):
    return PlainTextResponse(str(exc.detail), status_code=exc.status_code)

@app.exception_handler(500) # error http code로도 가능! 
async def http_500_exception_handler(request: Request, exc):
    # plain text로 응답을 보내는 경우
    return PlainTextResponse("Internal server error", status_code=exc.status_code)
    
@app.exception_handler(404)
async def http_not_found_handler(request, exc):
    # custom json 형태로 응답을 보내는 경우 
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )

```

만약 error handler를 세분화해서 파일 자체를 나누어야 하는 상황이라면 다음과 같이 `add_exception_handler()`를 이용할 수도 있다. 

```py
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

def get_application() -> FastAPI:

    application.add_exception_handler(
        Exception, exception_error_handler)
    
    return application

app = get_application()

async def exception_error_handler(_: Request, exc) -> JSONResponse:
    return JSONResponse({
        "statusCode": exc.code,
        "message": exc.message,
    }, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)

```

## 근데 500 error handler가 제대로 동작 안한다

위와 같이 등록하였는데도 이상하게 400 에러에 대해서는 handler가 잘 먹히는데 500 에러 같은 경우에는 response에 계속 노출이 되었다. FastAPI 기본 설정에서 `debug`가 `True` 로 되어있으면 internal server error의 내부 로직이 그대로 계속 노출되게 된다. 기본값이 `False` 이니, 만약 개발 환경에서도 필요하지 않다면 아예 빼는 것도 방법이다.

```py
from fastapi import FastAPI

server = FastAPI(
    title=app_settings.PROJECT_NAME,
    version=app_settings.VERSION,
    debug=app_settings.debug # default : False
)
```

## reference 
- [Catch `Exception` globally in FastAPI](https://stackoverflow.com/questions/61596911/catch-exception-globally-in-fastapi)
