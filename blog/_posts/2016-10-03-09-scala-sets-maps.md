---
date: 2016-10-03
tags: 
  - scala
---

# [beginning-scala-programming] 9. Sets and Maps 

## Set

- default : immutable

```java
scala> val s = Set(1,2,3)
s: scala.collection.immutable.Set[Int] = Set(1, 2, 3)

scala> s + 4
res0: scala.collection.immutable.Set[Int] = Set(1, 2, 3, 4)

scala> s
res1: scala.collection.immutable.Set[Int] = Set(1, 2, 3)
```

mutable로 하고 싶으면 ```import collection.mutable``` 임포트!

```java

scala> import collection.mutable
import collection.mutable

scala> val mutSet = mutable.Set(1,2,3)
mutSet: scala.collection.mutable.Set[Int] = Set(1, 2, 3)

scala> mutSet += 4
res3: mutSet.type = Set(1, 2, 3, 4)

```

## Map

- default : immutable

```java

val m = Map(("Taxas", "Austin"), ("Colorado", "Denver"))
val m2 = Map("Taxas"->"Austin", "Colorado"->"Denver") // same

import collection.mutable
val mutMap = mutable.Map()
```
