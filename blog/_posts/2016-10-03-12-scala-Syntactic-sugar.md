---
date: 2016-10-03
tags: 
  - scala
---

# [beginning-scala-programming] 12. Syntactic Sugar

## Syntactic Sugar

```java
  val a = Array(1,2,3,4)
  a foreach println



  def foo(i:Int):Unit = 8
  foo{
    println("hi")
    7
  }
  // String = hi





  def myWhile(cond: => Boolean)(body: => Unit):Unit = {
    if(cond) {
      body
      myWhile(cond)(body)
    }
  }

  var i = 0;

  myWhile(i<5){
    println(i)
    i += 1
  }

```
