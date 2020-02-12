---
date: 2016-10-04
tags: 
  - scala
---
# [beginning-scala-programming] 15. Case Class

### case class

- class + companion object를 사용 하듯이 new 없이 객체 생성 가능

- copy method
```java

case class Employee(name: String, office: String, role: String)

val fred = Employee("Fred", "Anchorage", "Salesman")
// fred: Employee = Employee(Fred,Anchorage,Salesman)
val joe = fred.copy(name="Joe")
// joe: Employee = Employee(Joe,Anchorage,Salesman)

```

참고 : [scala-exercies](https://www.scala-exercises.org/std_lib/case_classes)

참고 : [스칼라스쿨](https://twitter.github.io/scala_school/ko/basics2.html#caseclass)
