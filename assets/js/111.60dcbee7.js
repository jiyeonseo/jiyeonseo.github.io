(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{527:function(t,s,a){"use strict";a.r(s);var n=a(5),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"fast-api-500-exception-handler-처리"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fast-api-500-exception-handler-처리"}},[t._v("#")]),t._v(" Fast API 500 Exception Handler 처리")]),t._v(" "),s("p",[t._v("Real world에 나가기 전 서버에서 꼭 챙겨야 하는 것 중 하나는 500 error handling이다. "),s("code",[t._v("500 internal server error")]),t._v("는 의도한 것도 예상했던 에러도 아니니 발견하고 빨리 고치는 수 밖엔 없다. 발생 하였을 때,\n내부적으로는 자세한 로그를 남겨야 하지만, 외부로 자세한 내용을 알려줄 필요는 없다. (보안 이슈)")]),t._v(" "),s("p",[t._v("Fast API 공식 문서에서도 동일한 내용을 찾아 볼 수 있다.")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("FastAPI uses it so that, if you use a Pydantic model in response_model, and your data has an error, you will see the error in your log.\n\nBut the client/user will not see it. Instead, the client will receive an \"Internal Server Error\" with a HTTP status code 500.\n\nIt should be this way because if you have a Pydantic ValidationError in your response or anywhere in your code (not in the client's request), it's actually a bug in your code.\n\nAnd while you fix it, your clients/users shouldn't have access to internal information about the error, as that could expose a security vulnerability.\n")])])]),s("h2",{attrs:{id:"기본-error-handler-추가-방법"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#기본-error-handler-추가-방법"}},[t._v("#")]),t._v(" 기본 error handler 추가 방법")]),t._v(" "),s("p",[t._v("FastAPI 에서 제공하는 데코레이터를 이용하여 간편하게 "),s("code",[t._v("@app.exception_handler")]),t._v(" 로 핸들러를 등록할 수 있다.")]),t._v(" "),s("div",{staticClass:"language-py extra-class"},[s("pre",{pre:!0,attrs:{class:"language-py"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" fastapi "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" FastAPI"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" status\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" fastapi"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("responses "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" PlainTextResponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" JSONResponse\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" starlette"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exceptions "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" HTTPException "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" StarletteHTTPException\n\napp "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" FastAPI"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token decorator annotation punctuation"}},[t._v("@app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exception_handler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("StarletteHTTPException"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Exception class로 ")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("http_exception_handler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" exc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" PlainTextResponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("str")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("exc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("detail"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" status_code"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("exc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("status_code"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token decorator annotation punctuation"}},[t._v("@app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exception_handler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("500")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# error http code로도 가능! ")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("http_500_exception_handler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" exc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# plain text로 응답을 보내는 경우")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" PlainTextResponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Internal server error"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" status_code"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("exc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("status_code"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    \n"),s("span",{pre:!0,attrs:{class:"token decorator annotation punctuation"}},[t._v("@app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exception_handler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("404")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("http_not_found_handler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" exc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# custom json 형태로 응답을 보내는 경우 ")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" JSONResponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        status_code"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("status"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("HTTP_422_UNPROCESSABLE_ENTITY"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        content"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("jsonable_encoder"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"detail"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" exc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("errors"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"body"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" exc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n")])])]),s("p",[t._v("만약 error handler를 세분화해서 파일 자체를 나누어야 하는 상황이라면 다음과 같이 "),s("code",[t._v("add_exception_handler()")]),t._v("를 이용할 수도 있다.")]),t._v(" "),s("div",{staticClass:"language-py extra-class"},[s("pre",{pre:!0,attrs:{class:"language-py"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" fastapi "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" FastAPI"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" status\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" fastapi"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("responses "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" JSONResponse\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get_application")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" FastAPI"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n    application"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("add_exception_handler"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        Exception"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" exception_error_handler"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    \n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" application\n\napp "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" get_application"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("exception_error_handler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("_")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" exc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" JSONResponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" JSONResponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"statusCode"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" exc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("code"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"message"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" exc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("message"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" status_code"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("status"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("HTTP_422_UNPROCESSABLE_ENTITY"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n")])])]),s("h2",{attrs:{id:"근데-500-error-handler가-제대로-동작-안한다"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#근데-500-error-handler가-제대로-동작-안한다"}},[t._v("#")]),t._v(" 근데 500 error handler가 제대로 동작 안한다")]),t._v(" "),s("p",[t._v("위와 같이 등록하였는데도 이상하게 400 에러에 대해서는 handler가 잘 먹히는데 500 에러 같은 경우에는 response에 계속 노출이 되었다. FastAPI 기본 설정에서 "),s("code",[t._v("debug")]),t._v("가 "),s("code",[t._v("True")]),t._v(" 로 되어있으면 internal server error의 내부 로직이 그대로 계속 노출되게 된다. 기본값이 "),s("code",[t._v("False")]),t._v(" 이니, 만약 개발 환경에서도 필요하지 않다면 아예 빼는 것도 방법이다.")]),t._v(" "),s("div",{staticClass:"language-py extra-class"},[s("pre",{pre:!0,attrs:{class:"language-py"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" fastapi "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" FastAPI\n\nserver "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" FastAPI"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    title"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("app_settings"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("PROJECT_NAME"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    version"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("app_settings"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("VERSION"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    debug"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("app_settings"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("debug "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# default : False")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h2",{attrs:{id:"reference"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[t._v("#")]),t._v(" reference")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://stackoverflow.com/questions/61596911/catch-exception-globally-in-fastapi",target:"_blank",rel:"noopener noreferrer"}},[t._v("Catch "),s("code",[t._v("Exception")]),t._v(" globally in FastAPI"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=e.exports}}]);