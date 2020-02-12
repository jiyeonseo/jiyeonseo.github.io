---
date: 2016-10-04
tags: 
  - scala
---

# [beginning-scala-programming] 17. Special methods
- 직접 +, - 와 같은 method도 구현 할 수 있다.

```java
case class Vect3D(x:Double, y:Double, z:Double) {
  def apply(i:Int): Double = i match {
      case 0 => x
      case 1 => y
      case 2 => z
  }
  def +(v: Vect3D) = Vect3D(x + v.x, y + v.y, z+v.z)
  def -(v: Vect3D) = Vect3D(x - v.x, y - v.y, z-v.z)
  def *(c: Double) = Vect3D(c * x, c * y, c * z)
}
```
