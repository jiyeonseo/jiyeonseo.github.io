---
date: 2016-10-03
tags: 
  - scala
---

# [beginning-scala-programming] 11. Partial Functions

### Partial Functions

```java
// complete function
 def foo(i:Int):Int = ???

 // partial function
 val pf:PartialFunction[Any, String] = {
   case i: Int => "Number"
   case s:String => "The string "+s
 }

 pf(5) // String = Number
 pf("Hello") // String = The string Hello

```
