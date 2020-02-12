---
date: 2016-09-07
tags: 
  - etc
---

# [후기] SpringOne Platform re:Cap

[SpringOne Platform re:cap](https://www.meetup.com/Seoul-Cloud-Foundry-Meetup/events/233547901/) 밋업을 다녀왔다.

[SpringOne Platform](https://springoneplatform.io/) 이라 하면 전자정부 표준프레임워크 spring framework를 개발 및 컨설팅 하고 있는 [Pivotal](https://pivotal.io/) 에서 주최하는 컨퍼런스이다. 올해 컨퍼런스는 8월 1일부터 4일, 총 4일동안 진행되었고, 올해 발표된 스프링 관련 기술부터 내년 발표될 실험적인 기술까지 다양한 주제에 대해서 다뤄졌다고 한다.

Youtube 에도 [SpringOne Platform 2016 ](https://www.youtube.com/playlist?list=PLAdzTan_eSPQ1fuLSBhyB4eEZF7JQM0Mx)이 올라오고 있으니 필요한 세션들을 찾아보자.

오늘 다녀온 SpringOne Platform re:Cap은 Pivotal Korea에서 주최한 밋업으로 SpringOne 컨퍼런스에서 발표된 주제중에 몇가지 포인트 되는 세션들을 "한국말"로 소개해주셨다. (넘나 좋은 것!)

그리고 [migrating to cloud native application architectures](https://download3.vmware.com/vmworld/2015/downloads/oreilly-cloud-native-archx.pdf) 요 책도 나눠주었는데. 이건... 나중에봐야징ㅋ

시간이 지나기 전에 오늘 들은 귀중한 지식들을 짧게 정리해보고자 한다.

***

# 1. Spring framework 5

- 곧 나옵니다.
- 자바9 과 함께 나오는걸 계획 (아마 내년 3월? 자바는 모르겟다.)
- 프로젝트 직소 때문에 밀렷대.
- 5.1 부터 자바9 fully support (내년 11월 12월 정도?)
- 9~10개월로 minor update 중 ( x.1, x.2 … )
- jdk 8+ 서포트 (6,7 not anymore)
- 멀티 쓰래드로 부트스트랩
- 지금 자르파일을 bean을 모두 scan > index 파일을 만들어서 그걸로 스캔 할지 고민중 .
- 자바9에 주요 feature : [jigsaw project](http://openjdk.java.net/projects/jigsaw/)
- http2
- lambda 형식으로 http routing
- 자바9에서  GC enhancements 잇을 것.
- Reactor가 큰 테마다 >> Mono, Flux 등.. <a href="#article3">후 세션</a>에서 더 자세히 다뤄보겠다.

ex)

```java
@PostMapping()
public Mono<Account> getAccount (@RequestBody Mono<Account> mono){
     return mono.then(account ->  this.repository.save(account))
}
```

# 2. Spring Boot 1.4

- Spring boot - 2.25M in maven downloads in 2015 (Wow!)

### major update

1.  spring 4.3
2.  third party lib upgrade - 제티, 톰캣 등등
3.  new auto-configuration support - 더 많은 라이브러리 redis, Jta, caffeine(cache) elasricsearch jest ? 등등
4. startup failures 분석 - 리포팅 기능 추가.<br/>ex) 같은 포트가 이미 떠있다와 같은. 더 보기 편해짐
5.  @SpringBootTest - @springpplicationConfiguration, contextconfiguration, integrationtest, webintegrationtest 등 다 통합
6. @MockBean 추가
7. slice ,, @jsonTest, @WebMvcTest 등 역할별로 테스트 해 고거랑 관련된 설정만 가지고 와서  퍼포먼스 향상
@RestClientTest, @DataJpaTest SpringRestDoc

### demo

- simple wether app
- youtube : [https://www.youtube.com/watch?v=7U90Lfxatpk](https://www.youtube.com/watch?v=7U90Lfxatpk)
- github :  [https://github.com/SpringOnePlatform2016/weather-app](https://github.com/SpringOnePlatform2016/weather-app)

### new features

1. @ConfigurationProperties 을 통해서 properties에 잇는 정보를 그대로 가져올 수 있다.

2. error code define >>  resources/static/error/404.html 바로 디파인 해줌

3. test 강화
  - @RunWith(SpringRunner.class) << 내부적으로 알아서
  - Configuration 통합
  - slice 기능으로 WebMvcTest > 웹 관련 테스트만 하겟다
  - Mock을 하려면 예전에는 @before 에서 인젝트 해줘야 햇엇는데 이제는 @MockBean으로 할 수 있따.

4. Autowired를 따로 안해줘도 알아서 inject

```java
@Autowired // << 생략 가능
public class someclass(SomeService someServce) {
}
```

5. in-memory-cache

- [caffeine](https://github.com/ben-manes/caffeine) 이라는 게 기본으로 들어가 잇음
- dependencies
  - spring-boot-starter-cache
  - com.github.ben-manes.caffeine

```java
- @cacheable("value") // << 이렇게만하면  캐시 하겟다
- @EnableCaching(proxyTargetClass=true)  // << 캐시 쓰겟다
```

- actuator로 캐시size ,hit ,hit ratio 등 도 추가 되어잇음
- localhost:8080/metrics 에서  확인 가능.

6. info end-point
- boot-maven-plugin 으로 추가/
- 깃, 리비전 번호 등등. buildinfo. properties라는 프로퍼티를 자동 생성해서 넣어줘서 빌드떄 메타정보를 넣을 수 있다.
- 빌드 하면 ```target/classes/META-INFo/build-info.properties``` 라는게 추가 됨.
- localhost:8080/info 에서 확인 가능.

7. RestDoc
- dependencies
```restdoc-mockmvc```

- plugin
```asciidoctor```

- 각각 api 별로 조각조각 파일 떨어짐.
- asciidoc 와꾸 정보 넣기
- asciidoc 안 snippets << 정보가 들어간다.

- 테스트 케이스에 어노테이션을 넣어준다

```java
@AutoConfiguraeRestDoc(outputDir-’target/~~’)
```

테스트 돌리면 맨 마지막에 doc이 생성된다.

```java
target/generated-snippets
target/generated-docs // 여기에 들어가서 보면 html로 나옴
```

# 3. Spring Reactor

### reactive programming이란?
- 데이터의 흐름과 변화를 전달해주는 페러다임

### 등장 배경
— (java8) Future
- 완벽한 비동기는 아니다 future.get() 올때까지 기다린다.

- 비동기성 @Async  - ListenableFuture

- java8에서 이런식으로 …
```java
CompletableFuture
     .somethingcallback()
     .somethingcallback2();
```

### Reactive Streams
- 비동기 스트림
- RxJava
- ReactiveX
- [RxJavaReactiveStreams](https://github.com/ReactiveX/RxJavaReactiveStreams)

### Reactive Manifesto

- 가장 큰 키포인트
1. responsive
2. resilient
3. elastic
4. message driven

- 마이크로서비스 > 네트웤으로 통신해서 그걸 조합하는거 > 15개를 부르는게  하나라도 대답을 못하면 화면을 렌더링 해줄수 잇는가?! > 고로 리액티브가 필요하다 .

- netflix - 주울

### 서킷브레이커 패턴
- 넷플릭스가 마이크로서비스로 넘어가면서
- 두꺼비집
- 한 서비스가 오래걸리면 장애 전파를 막기위해 :  hystrix
- 히스트릭스 커맨드 안을 보면 리액티브 프로그래밍을 하고 잇다.
- 장애의 전파를 끊고 / 비동기때 밀리는걸 막아줌.

### LMAX
- log4j2 링 버퍼 - 하나의 쓰레드가 멀티쓰레드보다 더 빠르게. 600만 tps를 처리.
- nodejs

### 리액티브 프로그래밍
- java ocncurrency in practice - 정석 책! 추천!

- 10년 > today
- monorithic > microservice
- app server  > cloud

### ASYNC!!
- scalability에 유리하다
- non-blocking
- event driven
- small number of thread  >>>>> mechanical sympathy : hardware and software working together in harmony. 소프트웨어 개발자가 잘 하려면 실제 cpu, cache 구조를 이해하는게 퍼포먼스에 더 좋다.
- lmax 적용
- flow control : like back pressure 받을수 잇는 만큼만 보내준다. 효율적으로 굴리기 위해 감당할수 잇는 만큼만 일을 시킨다. like 야근

기존 동기식
```java
User user = userRepository.findById()
Future<User> findById(String id) <Del>throws IOException </Del>

future.get(); // 을 하게 되면 결국 여기서 block 이 되니 진정한 비동기가 아니다 .
```

### CompletableFuture를 통해 완벽한 비동기

```java
CompletableFuture<User> future
future.whenComplete(???)

CompletableFuture<Void> save(User user); // void임!
```

- 단점
-- 컬렉션 리턴 밸류가 적당치 않앗다.
-- 끊임없이 들어오는 스트림에는 적당하지 않다

### Reactive Stream
- 계속 들어오는걸 받아주고 Error/Complete가 되엇을때를 callback으로 지원 like onError, onComplete ...
- onNext(param)

### java 8 stream api
- 액티브한 소스에 대한걸 처리하기가 적당치 않다.  (단점)
- latency sensitive data sequesnces에 적당치 않다.

### Reactive stream
- TCK를 포함한다 : 자바표준에 부합하는지 테스트 해주는 툴
- publish , subscribe with back- pressure
- java8 stream이랑 똑같이 생겨쪙
- version 3.0  (6월 released)

### 개념
1. Mono
  - 기거나 아니거나 (1 or 0)

2. Flux
  - 끊임없는 데이터 스트림
  - interval, 중간 operator를 둬서 처리.
  - 스프링 클라우드에 대해서

```java
public interface UserRepository {
     Mono<User> findById(Long id);
     Flux<User> findAll();
     Mono<Void> save(User user);
}

repository.findall()
               .filter()
               .map()
               .useCapacity(2) // 한번에 두개만 받것다. (이거 없으면 by default consume without back-pressure )
               .log() // tapping
               .subscribe(user -> {}) //

```

### Reactive Web application

- Reactive Processing pipeline
- httpserver > web framework > controller > repository
- controller 에서 Return 타입이 달라짐 like mono , flux

- if RxJava
```java
Single<User>
Obserbable<User>
```

### Reactive Http Adaption
- Flux라던가 이런걸로 http 통신 하고 이씀

- Reactive stream으로 tomcat I/O 지금 bridge 작업중, 제티는 이미 bridge 작업 됨(?)

- 시리얼라이즈 jackson 이용한거 json/xml 하는것도 Mono 라던가 이런걸로 받을 수 잇음

```java
return new User(id) ; //synchronouse, non-blocking method
return Mono<User> // Async, non-blocking method
```

- 장단이 잇으니 서비스 성격에 맞춰서 결정해야한다.
- [5.0](repo.spring.io/milestone) 나왓어유.

### 예제
- [lite-rx-api-hands-on](https://github.com/reactor/lite-rx-api-hands-on)
- mono / flux
- consume /
- influx db 를 사용하고 잇음.

- 주기적으로 내가 스트림으로 짜서 찌르는게 아니라 Flux를 이용, 설정을 통해

### experimental
- 아직 실험 단계지만 [start.spring.io](http://start.spring.io/)에서 사용해 볼 수 있다.
<img src="/images/start-spring-io-reactive-web.png" />

- 쓰는 작업 병목, 실시간 성 처리
1. [아파치 GEODE](http://geode.apache.org/)를 사용
2. 큐 사용 (worker들이 적절히)

- 스프링 세션??
-- 레디스, 대신 geode 한번 써보세요!

- akka / reator
-- 언어적 차이는 잇지만 사상은 똑같다.


# 4. Spring Cloud Data Flow
- from micro service to data micro service

- 스프링 클라우드 데이터 플로우.
- 아마존, 오픈스택, 위에 "피보탈 클라우드 파운더리” 를 올리고
- 각각의 모노리딕을 >> CI 로 묶어주고
- datasource는 쉐어하지 않도록

### 전통적인 data analysis
- 각각의 서비스의 database를 ETL을 해서 Data warebouse에 넣고 데이터를 콩짝콩짝 하겟지
- 이러한거는 data를 분석하는 사람들은 대부분 밤에 움직이니까 로긴해서 쿼리 해보고
- (최대 단점) 중간에 데이터 처리하기가 힘듬
- data warehouse를 보고 데이터 사이언스가 뭘 콩짝 콩짝 하고 그걸 다시 어플리케이션에 적용하고
- 일련의 데이터 파이프라인이 monolith 임

```
data > source > processing > processing processing > destination > data
```

- 뭔가 껴넣기 힘들다 싶으면 모노리틱임 << 한 덩어리로 되어잇으니까 재배포/확장/서버 OS업데이트라던가 이런게 어려움.

- 그러니.. 스프링 어플리케이션으로 저 하나하나를 다 떼어버리자.

### spring cloud stream
- 각각의 스프링부트 어플리케이션 이 데이터를 쿵짝쿵짝 한 데이터를 bus에 태워서
- 받아온 데이터를 가공하고 다시 때려넣고

### spring cloud data flow가 하는일
- 데이터가 들어오면 > ETL을 하고 > 각 db나 데이터하우징 하는곳에 넣는다 > 이걸 각각 boot app으로 띄워서 연결 해주는것
- [http://cloud.spring.io/spring-cloud-stream/](http://cloud.spring.io/spring-cloud-stream/)

### 예제
- [spring-cloud-dataflow](http://cloud.spring.io/spring-cloud-dataflow/)

### 스프링 클라우드 웹 UI
- 파이프라인을 디자인하기 편하게
- source(데이터들어온다) / processor(쿵짝쿵짝) / sink(결과 던지기)
- streams/create stream 메뉴를 클릭하면 스트림 디자인 가능
— 드래그앤드랍, 설정 가능
- definition 에서 deploy
예제 : [melofred/FraudDetection-DataMicroservices](https://github.com/melofred/FraudDetection-DataMicroservices)

- 각각의 기능을 하는 앱서버를 만들고 파이프라인을 만드는데 편해졌다.
- 전통적인거는 그 파이프라인 자체가 스케일 업햇는데 이건 필요한 부분만 scale늘려주면 된다 (ex. eval부분만 늘린다)

- businesss microservice + data microservice
- 각각을 이용해서 서비스를 구성할 수 잇다.

### 롤백처리
- 트랜젝션.
—> 이벤트 소싱.
—> 각각 떨어진는 로그들을 처리할 수 있도록
—> 나중에 그런 문제 가 잇을때 취합된 로그를 받아서 재현도 해볼수 잇다.
