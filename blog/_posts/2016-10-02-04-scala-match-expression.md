---
date: 2016-10-04
tags: 
  - scala
---

# [beginning-scala-programming] Match Expression

### Match Expression

```java

val a = 5
var b = 6

val result = a match {
     case 0 => "zero"
     case 1 => "one"
     case _ => "Something bigger, "+a // _ : general wide , Something or Anything
}

val result2 = a*3 match {
     case 0 => "zero"
     case 1 => "one"
     case i => "Something bigger, "+i // result2 : String Something bugger, 15
}

val result3 = (a*3, b) match { // tuple OK
     case (0, _) => "zero"
     case (i, 0) => "one"
     case i => "Something bigger, "+i // result2 : String =  Something bugger, (15, 6)
}

val result4 = a*3 match {
     case 0 => "zero"
     case 1 => "one"
     case b => "Same as b"  // result4 : String = Same as b // bcz this b is new variable.
     case i => "Something bigger, "+i
}

 // 위 경우 b를 val로 바꾸고 아래와 같이 바꾸면 원하는 대로 나올 수 있음.
val result5 = a*3 match {
     case 0 => "zero"
     case 1 => "one"
     case `b` => "Same as b"
     case i => "Something bigger, "+i // result2 : String Something bugger, 15
}
```
