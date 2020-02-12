---
date: 2016-10-05
tags: 
  - scala
---

# [beginning-scala-programming] Function & Recursion

## Functions

```java

val a = 5

def square(x:Double) : Double = x*x  // def {name}({paramname} :{paramtype}) : {return type} = {function}

square(a) // res0 : Double = 25.0
```

- function에서 마지막 값이 return 되는 것

```
{ 3
4
5} // res0:Int = 5
```

- return type 생략해도 됨. 추론 가능. but 에러 혹은 실수를 막기위해 써주는게 좋다.
- 함수 안에서 return 을 사용하면 반드시 return type을 명시해 주어야 한다.

```java

def greet(name:String):Unit = { // Unit : doesn’t return anything (생략 가능)
     pintln(s"Hello, $name")
}

greet("Mark") // Hello, Mark

```

## Recursion

```java

// n! = n * (n-1) * (n-2) * … * 3 * 2 * 1
def factorial(n:Int):Int = if(n<2) 1 else n*factorial(n-a)
factorial(3)

```

- recursive function은 반드시 return 타입을 명시해 주어야 한다.

```java

def estimatePi(n:Int):Double = {
     def helper(n:Int):Double = {
          if(n<1) 0 else {
          val x = math.random
          val y = math.random
               (if(x*x+y*y<1) 1 else 0 ) + helper(n-1)
          }
          helper(n)/n*4
     }
}

estimatePi(1000) // StackOverFlow Exception occured

```

-  StackOverFlow Exception을 잡기 위해서 꼬리재귀함수를 만들어야함
- 꼬리 재귀 함수 조건 : return 값에 어떠한 operate를 하면 안됨.


```java

import scala.annotation._

def estimatePi(n:Int):Double = {
     @tailrec
     def helper(n:Int, sum:Int):Double = {
          if(n<1) sum else {
          val x = math.random
          val y = math.random
          helper(n-1, sum+if(x*x+y*y<1) 1 else 0 )
          }
          helper(n)/n*4
     }
}

estimatePi(1000) // Nothing exception appeared.

```

- @tailrec을 명시적으로 분펴주면 return에 어떠한 opertation이 들어가면 컴파일 단계에서 에러를 뱉어준다.

참고 : [puruni/Recursion.scala](https://github.com/jiyeonseo/exercises-fpinscala/blob/master/src/test/scala/puruni/Recursion.scala)
