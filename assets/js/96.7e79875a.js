(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{508:function(t,s,a){"use strict";a.r(s);var n=a(5),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"orm-잘못-쓰지-않기"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#orm-잘못-쓰지-않기"}},[t._v("#")]),t._v(" ORM 잘못 쓰지 않기")]),t._v(" "),s("p",[t._v("나는 ORM 쓰는 것을 좋아한다. 개발자의 실수를 컴파일 단계에서 많이 걸러줄 수 있고, IDE를 쓸 경우 자동 완성 기능이나 코드 트래킹, 또 추상화를 통해 특정 데이터베이스에 의존하지 않는 등 많은 장점들이 있다.")]),t._v(" "),s("p",[t._v("또 다른 큰 장점은 테이블 안 데이터를 객체로 사용할 수 있다는 것이다. 코드를 더 자주 보는 개발자에게는 훨씬 더 직관적이고, 가독성이 좋고, 비지니스 로직에 집중할 수 있다.")]),t._v(" "),s("p",[t._v("이 부분을 잘못 이해하는 경우가 종종 있다. DB에서는 객체를 가져오기만 하고 코드에서 모든 로직을 처리하는, 그야말로 코드로 그대로 풀어내는 경우가 있는데, 이는 RDB를 제대로 사용하지 않는 방법이며, 코드 가독성 역시 떨어뜨릴 수 있는 방법이기도 하다.")]),t._v(" "),s("p",[t._v("예를 들어, 아래와 같은 조건으로 쿼리를 해본다고 가정해보자.")]),t._v(" "),s("blockquote",[s("p",[s("code",[t._v("2021년에 결석한 적 있는 Class A 반에 있는 학생의 이름을 구해보자.")])])]),t._v(" "),s("p",[t._v("DB에는 "),s("code",[t._v("Student")]),t._v(", "),s("code",[t._v("Class")]),t._v(", "),s("code",[t._v("History")]),t._v(" 라는 테이블가 존재하고 각각은 학생 정보, 반 정보, 학생들의 출결 기록 정보를 가지고 있다.")]),t._v(" "),s("p",[t._v("잘못 사용한 사례를 먼저.")]),t._v(" "),s("p",[t._v("아래는 python ORM 라이브러리 중 하나인 "),s("a",{attrs:{href:"http://docs.peewee-orm.com/en/latest/",target:"_blank",rel:"noopener noreferrer"}},[t._v("peewee"),s("OutboundLink")],1),t._v(" 문법을 이용하여 간단하게 표현해보았다. (문법은 살짝 틀릴수 있다.)")]),t._v(" "),s("div",{staticClass:"language-py extra-class"},[s("pre",{pre:!0,attrs:{class:"language-py"}},[s("code",[t._v("  students "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("select"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  class_a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Class"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("select"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("where"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Class"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Class A"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  \n  class_a_students_id "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  \n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" student "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" students"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  \t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("class_id "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" class_a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  \t  class_a_students"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("append"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  \n\n  students_absent_2021 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" History"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("select"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("join"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("where"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" \\\n                            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("History"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("event "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"absence"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" \\\n                            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("History"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("created_at "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2021-01-01"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" \\\n                            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("History"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("student_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("in_"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("class_a_students_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \\\n                         "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("마치 긴 소설을 읽듯 처음부터 끝까지 여러 줄을 읽어야 코드가 이해가 된다. 마지막에 "),s("code",[t._v("join")]),t._v(" 이 들어갔지만 RDB의 특징인 테이블간의 관계를 잘 이용하지 못하였고, 조건 안에 들지 않는 모든 student를 통째로 들고와 메모리에 올리고 있다.")]),t._v(" "),s("p",[t._v("위 조건을 우선 쌩쿼리로 짜 본다.")]),t._v(" "),s("div",{staticClass:"language-sql extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sql"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("DISTINCT")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" Student "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" student\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("JOIN")]),t._v(" Class "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" class "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("on")]),t._v(" class"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("class_id\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("JOIN")]),t._v(" History "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" history "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("on")]),t._v(" history"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("student_id "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" class"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Class A"')]),t._v(" \n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("AND")]),t._v(" history"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("event "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"absence"')]),t._v(" \n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("AND")]),t._v(" history"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("created_at "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2021-01-01"')]),t._v("\n")])])]),s("p",[t._v("이를 위에서 사용해보았던 peewee 문법으로 다시 옮겨보겠다.")]),t._v(" "),s("div",{staticClass:"language-py extra-class"},[s("pre",{pre:!0,attrs:{class:"language-py"}},[s("code",[t._v(" students_absent_2021 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("select"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DISTINCT"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \\\n                        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("join"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Class"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" on"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Class"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("id")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" Student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("class_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \\\n                        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("join"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("History"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" on"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("History"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("student_id "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" Student"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \\\n                        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("where"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" \\\n                          "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Class"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Class A"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" \\\n                          "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("History"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("event "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"absence"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" \\ \n                          "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("History"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("created_at "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2021-01-01"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \\\n                        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("peewee 모델 클래스 객체를 사용하고 있으며, 조건문 역시 python 코드를 그대로 사용중이다. "),s("code",[t._v("where")]),t._v(" 절 안에 조건들이 잘 녹아있으며 쿼리 한번으로 필요한 데이터에 대해서만 가지고 왔다.")]),t._v(" "),s("p",[t._v("위 예제는 아주 기본적인 케이스라 크게 와닿지 않을 수도 있지만, 입문자 분들에게서 쉽게 실수 할 수 있는 부분이다. 저 코드 상태에서 리팩토링을 위해 "),s("code",[t._v("select")]),t._v(" 해오는 부분을 공통으로 뽑아 "),s("code",[t._v("get_students")]),t._v(" "),s("code",[t._v("get_class")]),t._v(" 이렇게 나누다보면 쿼리 요청수는 많아지고, 정작 어떤 것들을 "),s("code",[t._v("select")]),t._v(" 하려고 이해하려면 이곳저곳 흩뿌려진 코드들을 모두 따라가야 하는 불상사까지 일어난다.")]),t._v(" "),s("p",[t._v("코드도 언어다. 주저리주저리 길게 이야기하면 집중도가 떨어지게 되고 코드도 지루해진다. 간단 명료한 코드가 읽는데도 재미있다.")]),t._v(" "),s("p",[t._v("모든 원쿼리가 최고라는 의미는 아니다. 어느 정도의 적당한 레벨에서 타협하는 것이 좋다. 하지만, 어쨌든 데이터를 가져올 때는 데이터만! 가져오는 것에 집중하는 것이 좋다. 잘 짜인 쿼리는 코드보다 더 짧고 좋은 가독성을 가질 수 있다.")]),t._v(" "),s("p",[t._v("매우 꼰대 같은 말이긴 하지만 ORM을 잘 쓰려면 먼저 쿼리 잘 짜는 방법부터 공부해야 한다.")])])}),[],!1,null,null,null);s.default=e.exports}}]);