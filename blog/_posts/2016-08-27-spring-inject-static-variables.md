---
date: 2016-08-27
tags: 
  - spring
---

# Spring - 환경변수 static 변수에 넣기

스프링 프레임 워크에서는 static 변수에 값을 삽입(inject) 할 수 없다.

예를 들어 다음과 같은 환경변수를 설정 하였을 때

```
// application.yml
hello: spring.profiles.active is default
```

```java
@Component
public class HelloComponent {

    @Value("${hello}")
    String hello;

    @Value("${hello}")
    static String staticHello;

    public String getHello(){
        return hello; // spring.profiles.active is default
    }

    public String getStaticHello(){
        return staticHello; // null
    }
}

```

## 해결방법

non static 메소드를 통해 받은 환경변수를 static 변수에 넣어 줄 수 있다.

```java
@Component
public class HelloComponent {

    @Value("${hello}")
    static String staticHello;

    @Value("${hello}")
    private void setValue(String hello){
        staticHello = hello;
    }

    public String getStaticHello(){
        return staticHello; // spring.profiles.active is default
    }
}
```

Github : [https://github.com/jiyeonseo/spring-static-value-sample](https://github.com/jiyeonseo/spring-static-value-sample)
