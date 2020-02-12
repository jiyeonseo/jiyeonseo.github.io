---
date: 2016-08-06
tags: 
  - spring
---

# CentOS에서 스프링 부트가 잘 안뜨는 경우 (SecureRandom) 

사내 개발용 가상서버에 평소처럼 스프링부트 프로젝트를 생성하여 run 했는데 멈춰버렸다. 그냥 안뜬다 ;;;

## 문제 환경 및 현상
- spring-boot
  - 1.4.0 버전
  - gradle
- 로컬 환경 (OSX 10.11, jdk 1.8) 에서는 잘 뜬다.
- 개발용 가상 서버 (centOS 7.1, jdk 1.8)
- 첫 빌드시에는 잘 뜨고 두번째 빌드부터 뜨지 않는다.

![](@assets/20160806/spring-centos-tomcat.png)

딱 여기서 멈춘다.
그리고 한 5분쯤 지나면 한 줄이 뜨면서 갑자기 주르륵 실행이 된다.

```
2016-08-04 15:02:41.239  INFO 26709 — [ost-startStop-1] o.a.c.util.SessionIdGeneratorBase        : Creation of SecureRandom instance for session ID generation using [SHA1PRNG] took [188,679] milliseconds.
```

으아아아 이게 문제였다.

## 문제 원인
SecureRandom instance를 생성하는데 오래 걸린다.
문제는 CentOS와 Tomcat의 문제였다.


>Tomcat 7+ heavily relies on SecureRandom class to provide random values for its session ids and in other places. Depending on your JRE it can cause delays during startup if entropy source that is used to initialize SecureRandom is short of entropy. You will see warning in the logs when this happens, e.g.:

참고 : [https://wiki.apache.org/tomcat/HowTo/FasterStartUp#Entropy_Source](https://wiki.apache.org/tomcat/HowTo/FasterStartUp#Entropy_Source)
참고 : [http://stackoverflow.com/questions/36078745/why-spring-boot-embedded-tomcat-cant-start-on-google-compute-engine](http://stackoverflow.com/questions/36078745/why-spring-boot-embedded-tomcat-cant-start-on-google-compute-engine)

## 해결 방법
- *방법1*.
스프링 run 시 다음 system property를 추가해준다.          
```
-Djava.security.egd=file:/dev/./urandom
```


- *방법2*.
스프링 부트에서 제공하는 다른 Embedded servlet containter을 사용한다.
tomcat 뿐만 아니라 undertow, jetty 등을 제공하고 있다.
  - 참고 : [http://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#howto-embedded-servlet-containers](http://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#howto-embedded-servlet-containers)
