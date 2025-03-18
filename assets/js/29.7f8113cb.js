(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{329:function(e,t,r){e.exports=r.p+"assets/img/spring-centos-tomcat.7ca0b789.png"},448:function(e,t,r){"use strict";r.r(t);var o=r(5),n=Object(o.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"centos에서-스프링-부트가-잘-안뜨는-경우-securerandom"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#centos에서-스프링-부트가-잘-안뜨는-경우-securerandom"}},[e._v("#")]),e._v(" CentOS에서 스프링 부트가 잘 안뜨는 경우 (SecureRandom)")]),e._v(" "),t("p",[e._v("사내 개발용 가상서버에 평소처럼 스프링부트 프로젝트를 생성하여 run 했는데 멈춰버렸다. 그냥 안뜬다 ;;;")]),e._v(" "),t("h2",{attrs:{id:"문제-환경-및-현상"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#문제-환경-및-현상"}},[e._v("#")]),e._v(" 문제 환경 및 현상")]),e._v(" "),t("ul",[t("li",[e._v("spring-boot\n"),t("ul",[t("li",[e._v("1.4.0 버전")]),e._v(" "),t("li",[e._v("gradle")])])]),e._v(" "),t("li",[e._v("로컬 환경 (OSX 10.11, jdk 1.8) 에서는 잘 뜬다.")]),e._v(" "),t("li",[e._v("개발용 가상 서버 (centOS 7.1, jdk 1.8)")]),e._v(" "),t("li",[e._v("첫 빌드시에는 잘 뜨고 두번째 빌드부터 뜨지 않는다.")])]),e._v(" "),t("p",[t("img",{attrs:{src:r(329),alt:""}})]),e._v(" "),t("p",[e._v("딱 여기서 멈춘다.\n그리고 한 5분쯤 지나면 한 줄이 뜨면서 갑자기 주르륵 실행이 된다.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("2016-08-04 15:02:41.239  INFO 26709 — [ost-startStop-1] o.a.c.util.SessionIdGeneratorBase        : Creation of SecureRandom instance for session ID generation using [SHA1PRNG] took [188,679] milliseconds.\n")])])]),t("p",[e._v("으아아아 이게 문제였다.")]),e._v(" "),t("h2",{attrs:{id:"문제-원인"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#문제-원인"}},[e._v("#")]),e._v(" 문제 원인")]),e._v(" "),t("p",[e._v("SecureRandom instance를 생성하는데 오래 걸린다.\n문제는 CentOS와 Tomcat의 문제였다.")]),e._v(" "),t("blockquote",[t("p",[e._v("Tomcat 7+ heavily relies on SecureRandom class to provide random values for its session ids and in other places. Depending on your JRE it can cause delays during startup if entropy source that is used to initialize SecureRandom is short of entropy. You will see warning in the logs when this happens, e.g.:")])]),e._v(" "),t("p",[e._v("참고 : "),t("a",{attrs:{href:"https://wiki.apache.org/tomcat/HowTo/FasterStartUp#Entropy_Source",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://wiki.apache.org/tomcat/HowTo/FasterStartUp#Entropy_Source"),t("OutboundLink")],1),e._v("\n참고 : "),t("a",{attrs:{href:"http://stackoverflow.com/questions/36078745/why-spring-boot-embedded-tomcat-cant-start-on-google-compute-engine",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://stackoverflow.com/questions/36078745/why-spring-boot-embedded-tomcat-cant-start-on-google-compute-engine"),t("OutboundLink")],1)]),e._v(" "),t("h2",{attrs:{id:"해결-방법"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#해결-방법"}},[e._v("#")]),e._v(" 해결 방법")]),e._v(" "),t("ul",[t("li",[t("em",[e._v("방법1")]),e._v(".\n스프링 run 시 다음 system property를 추가해준다.")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("-Djava.security.egd=file:/dev/./urandom\n")])])]),t("ul",[t("li",[t("em",[e._v("방법2")]),e._v(".\n스프링 부트에서 제공하는 다른 Embedded servlet containter을 사용한다.\ntomcat 뿐만 아니라 undertow, jetty 등을 제공하고 있다.\n"),t("ul",[t("li",[e._v("참고 : "),t("a",{attrs:{href:"http://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#howto-embedded-servlet-containers",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#howto-embedded-servlet-containers"),t("OutboundLink")],1)])])])])])}),[],!1,null,null,null);t.default=n.exports}}]);