---
date: 2016-11-15
tags: 
  - etc
---

# github에서 travis-ci 연결하기

## CI
- 지속적 통합, continuous integration.
- 테스트, 빌드를 자동으로 도와주는 툴.
- 대표적으로 [Jenkins](https://jenkins.io/), [Go.cd](https://www.go.cd/), [Travis](https://travis-ci.org/)가 있다.
- 빌드 실패, 혹은 테스트 실패를 로컬에서 미처 확인 못 한 경우, CI의 noti를 받을 수 있다.


## 연동 방법
1. [https://travis-ci.org/](https://travis-ci.org/)에 github login을 한다.

2. [https://travis-ci.org/profile](https://travis-ci.org/profile)에서 연결하고자 하는
repository를 허용한다.
- 만약 없다면 상단 ```Sync account```를 눌러 새로고침을 해본다.

3. 프로젝트에 ```.travis.yml``` 설정 파일을 추가한다.

- 각 언어에 맞는 설정은 [Document](https://docs.travis-ci.com/user/getting-started/)를 참고하길 바란다.

~~~
language: java

jdk:
  - oraclejdk8
~~~

- 2016년 11월 기준, Java의 경우 default가 jdk7이다.
java 8을 쓸 경우 위와같이 반드시 jdk를 명시해 주어야 한다.

4. commit을 하면 바로 travis-ci가 도는 모습을 확인 할 수 있다.

![](@assets/20161115/2.png)

- 기본적으로 각 commit 마다 웹훅을 통해 자동으로 빌드된다.
- Pull Request를 보내게되면 연결된 커밋에 따른 빌드 결과가 하단에 나타난다.

![](@assets/20161115/3.png)

예제 : [https://github.com/jiyeonseo/napucon-cheese-demo/pull/2](https://github.com/jiyeonseo/napucon-cheese-demo/pull/2)


참고 : [getting-started](https://docs.travis-ci.com/user/getting-started/)

***

```#지프넓얕``` , ```#지적프로그래밍을위한넓고얕은습관```
