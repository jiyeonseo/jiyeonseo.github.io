(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{316:function(e,t,a){e.exports=a.p+"assets/img/jhipster_generate.c951943b.png"},317:function(e,t,a){e.exports=a.p+"assets/img/jhipster_demo.5d56c1fe.png"},434:function(e,t,a){"use strict";a.r(t);var s=a(5),o=Object(s.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"jhipster-맛보기"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jhipster-맛보기"}},[e._v("#")]),e._v(" jhipster 맛보기")]),e._v(" "),t("p",[e._v("트위터 이것저것 보다가 "),t("a",{attrs:{href:"https://twitter.com/java_hipster"}},[e._v("@JHipster")]),e._v("를 발견하였다.")]),e._v(" "),t("h2",{attrs:{id:"jhipster란"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jhipster란"}},[e._v("#")]),e._v(" jhipster란")]),e._v(" "),t("p",[e._v("페이지 : "),t("a",{attrs:{href:"http://jhipster.github.io/"}},[e._v("http://jhipster.github.io/")])]),e._v(" "),t("ul",[t("li",[e._v("Spring boot를 이용한 생산성을 향상된 튼튼한 자바 스택 서버 사이드")]),e._v(" "),t("li",[e._v("AngularJS와 Bootstrap을 이용한 모던하고 모바일에 적합한 프론트 앤드")]),e._v(" "),t("li",[e._v("Yeoman, Bower, Grunt, Maven을 이용한 파워풀한 빌드 툴들")])]),e._v(" "),t("p",[e._v("을 이용한 모던 웹앱을 Generator 이다.")]),e._v(" "),t("h2",{attrs:{id:"일단-만들어보자"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#일단-만들어보자"}},[e._v("#")]),e._v(" 일단 만들어보자")]),e._v(" "),t("p",[e._v("1.yeoman & generator-jhipster 설치")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("$ npm install -g yo\n$ npm install -g generator-jhipster\n")])])]),t("p",[e._v("2.JHipster yeoman으로 generate")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("yo jhipster\n")])])]),t("p",[t("img",{attrs:{src:a(316),alt:""}})]),e._v(" "),t("p",[e._v("generate 이전에 몇몇 meta 정보/빌드툴에 대한 입력 및 선택이 진행 된다.\n(아래는 예시이다.)")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("? (1/15) What is the base name of your application? (jhipster)\n? (2/15) What is your default Java package name? (com.mycompany.myapp)\n? (3/15) Do you want to use Java 8? Yes (use Java 8)\n? (4/15) Which *type* of authentication would you like to use? HTTP Session Authentication (stateful, default Spring Security mechanism)\n? (5/15) Which *type* of database would you like to use? SQL (H2, MySQL, PostgreSQL, Oracle)\n? (6/15) Which *production* database would you like to use? MySQL\n? (7/15) Which *development* database would you like to use? H2 in-memory with Web console\n? (8/15) Do you want to use Hibernate 2nd level cache? Yes, with ehcache (local cache, for a single node)\n? (9/15) Do you want to use a search engine in your application? No\n? (10/15) Do you want to use clustered HTTP sessions? No\n? (11/15) Do you want to use WebSockets? No\n? (12/15) Would you like to use Maven or Gradle for building the backend? Maven\n? (13/15) Would you like to use Grunt or Gulp.js for building the frontend? Grunt (recommended)\n? (14/15) Would you like to use the LibSass stylesheet preprocessor for your CSS? No\n? (15/15) Would you like to enable translation support with Angular Translate? (Y/n) y\n")])])]),t("p",[e._v("3.실행하기")]),e._v(" "),t("ul",[t("li",[e._v("maven 경우")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("$mvn 혹은 $ mvn spring-boot:run\n")])])]),t("ul",[t("li",[e._v("gradle 경우")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("$ ./gradlew 혹은 $ ./gradlew bootRun\n")])])]),t("p",[t("a",{attrs:{href:"localhost:8080"}},[e._v("localhost:8080")]),e._v(" 로 실행 확인!")]),e._v(" "),t("p",[t("img",{attrs:{src:a(317),alt:""}})]),e._v(" "),t("p",[e._v("4.client side live reload")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("$ grunt serve\n")])])]),t("h2",{attrs:{id:"entity-더해보기"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#entity-더해보기"}},[e._v("#")]),e._v(" Entity 더해보기")]),e._v(" "),t("p",[e._v("yeoman으로 엔티티도 추가할 수 있다.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("$ yo jhipster:entity foo\n")])])]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("he entity foo is being created.\nGenerating field #1\n? Do you want to add a field to your entity? Yes\n? What is the name of your field? name\n? What is the type of your field? String\n? Do you want to add validation rules to your field? Yes\n? Which validation rules do you want to add?\n=================Foo=================\nname (String)\nGenerating field #2\n? Do you want to add a field to your entity? No\n=================Foo=================\nname (String)\nGenerating relationships with other entities\n? Do you want to add a relationship to another entity? No\n===========Foo==============\nname (String)\n-------------------\n? Do you want to use a Data Transfer Object (DTO)? [BETA] Yes, generate a DTO with MapStruct\n? Do you want pagination on your entity? Yes, with a simple pager\nEverything is configured, generating the entity...\n   create .jhipster/Foo.json\n   create src/main/java/net/jiyeon/demo/domain/Foo.java\n   create src/main/java/net/jiyeon/demo/repository/FooRepository.java\n   create src/main/java/net/jiyeon/demo/web/rest/FooResource.java\n   create src/main/java/net/jiyeon/demo/web/rest/dto/FooDTO.java\n   create src/main/java/net/jiyeon/demo/web/rest/mapper/FooMapper.java\n   create src/main/resources/config/liquibase/changelog/20151012163422_added_entity_Foo.xml\n   create src/main/webapp/scripts/app/entities/foo/foos.html\n   create src/main/webapp/scripts/app/entities/foo/foo-detail.html\n   create src/main/webapp/scripts/app/entities/foo/foo-dialog.html\n   create src/main/webapp/scripts/app/entities/foo/foo.js\n   create src/main/webapp/scripts/app/entities/foo/foo.controller.js\n   create src/main/webapp/scripts/app/entities/foo/foo-dialog.controller.js\n   create src/main/webapp/scripts/app/entities/foo/foo-detail.controller.js\n   create src/main/webapp/scripts/components/entities/foo/foo.service.js\n   create src/test/java/net/jiyeon/demo/web/rest/FooResourceTest.java\n   create src/test/gatling/simulations/FooGatlingTest.scala\n   create src/main/webapp/i18n/en/foo.json\n   create src/main/webapp/i18n/fr/foo.json\n")])])]),t("h2",{attrs:{id:"결론"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#결론"}},[e._v("#")]),e._v(" 결론")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("yeoman generator는 진짜 무궁무진 한것 같다.")])]),e._v(" "),t("li",[t("p",[e._v("기존 MEAN 스택 관련은 몇몇가지 프로젝트를 본 적 있는데, 개인적으로는 spring-boot를 좋아하는 지라 맘에 든다.")])]),e._v(" "),t("li",[t("p",[e._v("AngularJS 뿐만 아니라 요즘 뜨고 있는 React도 되면 좋을것 같다.")])]),e._v(" "),t("li",[t("p",[e._v("Gradle, Gulp도 지원하긴 하지만 recommended 는 Maven과 Grunt.. 크게 트랜디 한 것 같진 않다.")])]),e._v(" "),t("li",[t("p",[e._v("프로젝트 열어보면 뭐 엄청 복잡해 보이는데 그만큼 기본 제공하는 기능들이 많다.")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("Swagger2 : "),t("a",{attrs:{href:"http://localhost:8080/#/docs"}},[e._v("http://localhost:8080/#/docs")])])]),e._v(" "),t("li",[t("p",[e._v("SpringLiquibase")])]),e._v(" "),t("li",[t("p",[e._v("Application metrics : "),t("a",{attrs:{href:"http://localhost:8080/#/metrics"}},[e._v("http://localhost:8080/#/metrics")])])])])])]),e._v(" "),t("h2",{attrs:{id:"sample-app"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sample-app"}},[e._v("#")]),e._v(" sample app")]),e._v(" "),t("p",[e._v("github : "),t("a",{attrs:{href:"https://github.com/jhipster/jhipster-sample-app"}},[e._v("https://github.com/jhipster/jhipster-sample-app")])])])}),[],!1,null,null,null);t.default=o.exports}}]);