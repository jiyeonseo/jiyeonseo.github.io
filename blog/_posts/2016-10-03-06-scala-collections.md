---
date: 2016-10-06
tags: 
  - scala
---

# [beginning-scala-programming] Collections 

 크게 두가지 Collection이 있다.

- ```import scala.collection.mutable```

- ```import scala.collection.immutable```


<a href="http://backtobazics.com/wp-content/themes/twentyfourteen/images/scala/collections.png"><img src="http://backtobazics.com/wp-content/themes/twentyfourteen/images/scala/collections.png" /></a>
참고 : [http://www.scala-lang.org/api/current/index.html#scala.collection.package](http://www.scala-lang.org/api/current/index.html#scala.collection.package)

## Sequences : Array, List, Vector, Buffer and Range

### 생성

```java

scala> Array(1,2,3)
res0: Array[Int] = Array(1, 2, 3)

scala> List(7,8,9)
res1: List[Int] = List(7, 8, 9)

scala> List(6,2,'a',9)
res2: List[Int] = List(6, 2, 97, 9)

scala> List(6,2,"hi",9)
res3: List[Any] = List(6, 2, hi, 9)

scala> List(6,2,true,9)
res4: List[AnyVal] = List(6, 2, true, 9)

val arr = Array(1,2,3)
val lst = List(7.2, 4, 9)
arr(0) // res0: Int = 1 // index값

// function 사용처럼 보일 수 있다. like below
def f(i:Int) = 42 * i
f(0)

// 기본 Array는 mutable
arr(0) = 99
arr // res2: Array[Int] = Array(99, 2, 3)

// 기본 List는 Immutable
// lst(0) = 99 // value update is not a member of List[Double]

1::lst // List[AnyVal] = List(1, 7.2, 4, 9) // return new value, not change value

lst // List[Double] = List(7.2, 4, 9) // not changed

val arr2 = Array.fill(100)("hi") // Array.fill({array size})({담고자 하는 값})
// arr2: Array[String] = Array(hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi, hi)

// val arr2 = Array.fill(10)(math.random)

// pass by name
def littleArray(i: => Int):Array[Int] = Array(i,i,i)

littleArray(util.Random.nextInt(10))

val arr3 = Array.tabulate(10)(i=>i*i) // Array.tabulate({array size})({function})
```

## Vector
- indexable sequence
- immutable collection

```java
Vector(1,2,3) // res15: scala.collection.immutable.Vector[Int] = Vector(1, 2, 3)
```

## Buffer type
- mutable

```java
scala.collection.mutable.Buffer(1,2,3) // res16: scala.collection.mutable.Buffer[Int] = ArrayBuffer(1, 2, 3)
```

- scala에서 기본  collection은 immutable이라서 Buffer를 쓰려면 위와같이 쓰거나
- ```import collection.mutable._``` 를 import 받아야 한다.

## Range

```java
scala> 1 to 10 // (1).to(10) 로 컴파일 됨. like 1+2 == (1).+(2)
res17: scala.collection.immutable.Range.Inclusive = Range(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

scala> 1 to 10 by 2
res18: scala.collection.immutable.Range = Range(1, 3, 5, 7, 9)

scala> 0.1 to 1.0
res19: Range.Partial[Double,scala.collection.immutable.NumericRange[Double]] = scala.collection.immutable.Range$Partial@75332dcf

scala> 0.1 to 1.0 by 0.2
res20: scala.collection.immutable.NumericRange[Double] = NumericRange(0.1, 0.30000000000000004, 0.5, 0.7, 0.8999999999999999)

scala> 10 to 1
res21: scala.collection.immutable.Range.Inclusive = Range()

scala> 10 to 1 by -1
res22: scala.collection.immutable.Range = Range(10, 9, 8, 7, 6, 5, 4, 3, 2, 1)
```

## API

api 문서 : [http://www.scala-lang.org/api/current/index.html#scala.collection.package](http://www.scala-lang.org/api/current/index.html#scala.collection.package)

### array
- Array는 자바의 array를 상속받아 따로 있음.(collection 아래에 있지 않음)  http://www.scala-lang.org/api/current/index.html#scala.Array
- scala.collection.mutable 아래에 ArrayOps
— wapper for Arrays

```java
scala> arr
res25: Array[Int] = Array(99, 2, 3)

scala> val arr2 = Array.fill(10)(2)
arr2: Array[Int] = Array(2, 2, 2, 2, 2, 2, 2, 2, 2, 2)

scala> arr ++: arr2
res29: Array[Int] = Array(99, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2)

scala> arr ++ arr2
res30: Array[Int] = Array(99, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2)

scala> arr.++(arr2)
res31: Array[Int] = Array(99, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2)

scala> 2 +: arr2 :+ 2
res32: Array[Int] = Array(2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2)

scala> arr.size
res34: Int = 3

scala> arr.length
res35: Int = 3

scala> arr.head
res36: Int = 99

scala> arr.last
res37: Int = 3

scala> arr.tail
res38: Array[Int] = Array(2, 3)

scala> arr.drop(3)
res39: Array[Int] = Array()

scala> arr2.take(2)
res40: Array[Int] = Array(2, 2)

scala> arr.reverse
res41: Array[Int] = Array(3, 2, 99)

scala> arr2.splitAt(4)
res42: (Array[Int], Array[Int]) = (Array(2, 2, 2, 2),Array(2, 2, 2, 2, 2, 2))

scala> val (before, after) = arr2.splitAt(4)
before: Array[Int] = Array(2, 2, 2, 2)
after: Array[Int] = Array(2, 2, 2, 2, 2, 2)

scala> arr2.slice(3,6)
res45: Array[Int] = Array(2, 2, 2)

scala> arr.isEmpty
res47: Boolean = false

scala> arr.nonEmpty
res50: Boolean = true

scala> arr.startsWith(Array(1,2))
res51: Boolean = false

scala> arr.indexOf(2)
res52: Int = 1

scala> arr.indices
res53: scala.collection.immutable.Range = Range(0, 1, 2)

scala> arr.min
res54: Int = 2

scala> arr.max
res55: Int = 99

scala> arr.sum
res56: Int = 104

scala> arr.product
res57: Int = 594

scala> arr.patch(2, Array(1,2,3), 3)
res63: Array[Int] = Array(99, 2, 1, 2, 3)

scala> val lst = List(7,2,4,9)
lst: List[Int] = List(7, 2, 4, 9)

scala> last.toArray
<console>:11: error: not found: value last
       last.toArray
       ^

scala> lst.toArray
res59: Array[Int] = Array(7, 2, 4, 9)

scala> lst.toVector
res60: Vector[Int] = Vector(7, 2, 4, 9)

scala> lst.par // not a good idea
res61: scala.collection.parallel.immutable.ParSeq[Int] = ParVector(7, 2, 4, 9)

scala> lst.updated(1,99)
res62: List[Int] = List(7, 99, 4, 9)

scala> val arr4 = Array(1,3,5,7,9)
arr4: Array[Int] = Array(1, 3, 5, 7, 9)

scala> arr4.intersect(arr)
res64: Array[Int] = Array(3) // 교집합

scala> arr4.union(arr4)
res65: Array[Int] = Array(1, 3, 5, 7, 9, 1, 3, 5, 7, 9) // 합집합

scala> arr.union(arr4).distinct
res69: Array[Int] = Array(99, 2, 3, 1, 5, 7, 9) // distinct

scala> arr4.diff(arr)
res66: Array[Int] = Array(1, 5, 7, 9) // 차집합. arr4 - arr

scala> arr4.mkString(", ")
res70: String = 1, 3, 5, 7, 9

scala> arr4.mkString("(",",",")")
res72: String = (1,3,5,7,9)

scala> arr4.view
res73: scala.collection.mutable.IndexedSeqView[Int,Array[Int]] = SeqView(...)

scala> arr4.zip(arr2)
res75: Array[(Int, Int)] = Array((1,2), (3,2), (5,2), (7,2), (9,2))

scala> arr4.zipWithIndex
res77: Array[(Int, Int)] = Array((1,0), (3,1), (5,2), (7,3), (9,4))

scala> arr4.zip(arr4.indices)
res79: Array[(Int, Int)] = Array((1,0), (3,1), (5,2), (7,3), (9,4)) // 위와 같은 결과값
```

한글 참고 : [https://twitter.github.io/scala_school/ko/collections.html](https://twitter.github.io/scala_school/ko/collections.html)
