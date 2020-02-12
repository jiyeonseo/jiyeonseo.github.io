---
date: 2016-10-07
tags: 
  - scala
---

# [beginning-scala-programming] Higher-order Methods and Lambda Expressions 

### Higher-order Methods and Lambda Expressions

```java
object HigerOrderMethods {
  val a = Array(1,2,3,4,5)
  val b = List(5,2,8,1,9)
  val c = Vector.tabulate(10)(i=>i*i)

  a.foreach(println)

  // map : transformation
  a.map(i => i*2)
  a.map(_*2) // same.

  // filter
  b.filter(_<5)

  a.map(i => b.take(i))
  // flatmap : 하나의 plain array로
  a.map(i => b.take(i)).flatten
  a.flatMap(i => b.take(i))

  // filter and return boolean
  c.exists(_>50) // Boolean = true
  c.forall(_<50) // Boolean = false

  //
  a.reduceLeft((x,y) => x+y) // Int = 15
  a.reduceLeft(_+_) // same.
  a.foldLeft(0)(_+_) // default value and function
  a.foldLeft("0")(_+_) //  String = 012345

  b.find(_==8) // Option[Int] = Some(8)
  b.find(_%7 == 0) // Option[Int] == None

  b.find(_%3 == 0).map(_/3) // Option[Int] = Some(3)
  b.find(_%3 == 0).map(_/3).getOrElse(0) // Int = 3
  b.find(_%7 == 0).map(_/3).getOrElse(0) // Int = 0

}
```

### Option
- Some type 과 None
- 값이 있는 경우 Some(3) 과 같이 return
- 값이 없는 경우 None 으로 return
- cf) Java의 `Null`
- `getOrElse()` 를 이용해 None 대신 default 값을 지정 가능. 
