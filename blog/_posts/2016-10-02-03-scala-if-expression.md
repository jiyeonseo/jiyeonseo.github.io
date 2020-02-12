---
date: 2016-10-03
tags: 
  - scala
---

# [beginning-scala-programming] If Expression

### If Expression

```java
val a = 5
var b = 5
var i = 5

val next = if(a%2==0) a/2 else 3*a+1 // Int = 16
// (a%2==0)?(a/2):(3*a+1) // in Java

if(a>9) println("less") // if(expression)

if(a<9) 4 // res0: AnyVal = 4 //AnyVal인 이유? else가 생략되면 else ( ) 를 Unit으로 추론하기 때문

if(a<9) "hi" else ( ) // res0: Any = hi //Any인 이유? Int는 AnyVal을 상속받았고 String은 AnyRef를 상속 받음.
// 근데 위의 이유와 같이 else의 ( ) 는 unit이라 더 상위 개념인 Any로 추론
```

- scala 는 functional natured language
- if express의 결과 역시 return되어 변수에 할당 가능.
