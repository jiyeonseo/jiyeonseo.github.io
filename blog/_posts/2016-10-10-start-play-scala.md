---
date: 2016-10-10
tags: 
  - scala
---

# [Play framework] play-scala 시작하기 

### 환경
- Mac OSX 10.11
- brew 0.9.9
- activator 1.3.10

```java
$ brew install typesafe-activator

$ activator new {프로젝트명}

Fetching the latest list of templates...

Browse the list of templates: http://lightbend.com/activator/templates
Choose from these featured templates or enter a template name:
  1) minimal-akka-java-seed
  2) minimal-akka-scala-seed
  3) minimal-java
  4) minimal-scala
  5) play-java
  6) play-scala
(hit tab to see a list of all templates)

$ 6

OK, application "{프로젝트명}" is being created using the "play-scala" template.

To run "{프로젝트명}" from the command line, "cd {프로젝트명}" then:
{프로젝트명}/activator run

To run the test for "{프로젝트명}" from the command line, "cd {프로젝트명}" then:
{프로젝트명}/activator test

To run the Activator UI for "{프로젝트명}" from the command line, "cd {프로젝트명}" then:
{프로젝트명}/activator ui

```

커맨드 라인에서는 바로 프로젝트로 들어가면 activator가 있는 것 처럼 나오지만..

sbt 버전업이 되면서 activator가 bin/activator로 path가 변경되었다. 따라서 아래와 같이 실행하여야 한다.

```java

$ {프로젝트명}/bin/activator run
$ {프로젝트명}/bin/activator test
$ {프로젝트명}/bin/activator ui

```




참고 : [play framework 2.5 Doc](https://www.playframework.com/documentation/2.5.x/NewApplication)
