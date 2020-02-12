---
date: 2016-10-08
tags: 
  - scala
---

# [beginning-scala-programming] Patterns 

### Patterns

```java
object Patterns {
  val strs = "Something Something string".split(" ")

  val lst = List(1,2,3,4,5)

  "5:36:43".split(":") // Array[String] = Array(5, 36, 43)

  val Array(hour,minute,second) = "5:36:43".split(":")
  //hour: String = 5
  //minute: String = 36
  //second: String = 43

  List(1,2,3)
  1::2::3::Nil  // same

  def listLength(lst:List[Int]): Int = lst match {
    case Nil => 0
    case h::t => 1+listLength(t) // head :: tail
  }

  listLength(lst) // Int = 5


  lst.find(_>6) match {
    case None => "Not found"
    case Some(i) => "Found " + i
  } // String = Found 3

  case class Person(name:String, age:Int)

  val people = Array(Person("Mark",40),Person("Amber", 13))
  val Person(n,a) = people(0)
  //n: String = Mark
  //a: Int = 40

}

```
