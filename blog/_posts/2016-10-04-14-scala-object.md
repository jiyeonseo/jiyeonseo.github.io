---
date: 2016-10-04
tags: 
  - scala
---

# [beginning-scala-programming] 14. Object

### Object

- companion object : class 명과 같은 object. factory 를 만들때 자주 사용.

```java

class Bar(i:Int)

object Bar {
     def apply(i:Int) = new Bar(i)
}

val testBar = Bar(1) // new 사용하지 않고 바로 생성 가능
```

참고 : [scala-exercies](https://www.scala-exercises.org/std_lib/objects)

참고 : [스칼라스쿨](https://twitter.github.io/scala_school/ko/basics2.html#object)
