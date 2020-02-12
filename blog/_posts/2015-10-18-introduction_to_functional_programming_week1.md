---
date: 2015-10-18
tags: 
  - fp
  - haskell
---

# FP101x - week 1 

몇 주 전, Coursera에서 시작하는 한 코스를 등록했는데… 너무 빡쎄서 ㅠ.ㅠ  어쩌지 하고 있던 상황에서 괜찮은 코스를 알게되었다.

*<a href="https://courses.edx.org/courses/course-v1:DelftX+FP101x+3T2015/info" target="_blank">FP101x Introduction to Functional Programming</a>*

edx 역시 Coursera와 같은 MOOC로 이 코스는 <a href="http://www.tudelft.nl/">Delft University of Technology</a> 라는 네덜란드 대학에서 진행되는 수업이다. 사실 제목에 101 이 보여서 더 끌렸다.ㅋㅋㅋㅋ

그리고 요즘 대세인 Functional Programming. 제목만 보고는 왠지 스칼라로 진행 할 것 같았는데 Haskell이다. 아 당황스러웠다. 전혀 모르는데..
다행히 첫 수업은 하스켈의 문법부터 차근차근 알려주고 이 수업을 들으면 하스켈 뿐만 아니라 자바, 스칼라 등 다른 언어에서도 functional programming을 바로 써먹을 수 있다고 약을 판.. 아니 격려해 주니 맘 놓고 시작해 볼 만 한 것 같다.

수업은 총 8주로 이루어져 있고 avg 60% 이상 점수를 받아야 Certificate를 받을 수 있다.
점수는 11번의 homework와 7번의 lab assignment로 이루어진다.

## Github repo

*<a href="https://github.com/fptudelft/FP101x-Content-2015" target="_blank">https://github.com/fptudelft/FP101x-Content-2015</a>*
수업 mp3, slide, transcript, exercise 들이 올라온다.

# Week 1
- Functional Programming의 역사와 간단한 설명
- 하스켈 설치부터 간단한 문법을 알려준다.

## 설치
Glasgow Haskell Compiler (GHC)
<a href="https://www.haskell.org/platform/" target="_blank">https://www.haskell.org/platform/</a>

## 하스켈 문법
- Select the first element of a list

```
> head [1,2,3,4]
1
```

- Remove the first element from a list :

```
> tail [1,2,3,4,5]
[2,3,4,5]
```

- Select the nth element of a list :

```
> [1,2,3,4,5] !! 2
3
```

- Select the first e elements of a list :

```
> take 3 [1,2,3,4,5]
[1,2,3]
```

- Remove the first n elements from a list :

```
> drop 3 [1,2,3,4,5]
[4,5]
```

- Calculate the length of a list :

```
> length [1,2,3,4,5]
5
```

- Calculate the sum of a list of numbers :

```
> sum [1,2,3,4,5]
15
```

- Calculate the product of a list of numbers :

```
> product [1,2,3,4,5]
120
```

- Append two lists :

```
> [1,2,3] ++ [4,5]
[1,2,3,4,5]
```

- Reverse a list :

```
reverse [1,2,3,4,5]
[5,4,3,2,1]
```

## Function Application

```
(Mathematics) f(a,b) + c d >> (Haskell) f a b + c*d
```

```
f a + b
```
-  (f a) + b 를 의미한다
-  f (a + b) 가 아니라

| Mathematics  | Haskell |
| ------------- | ------------- |
| f(x) | f x |
| f(x,y) | f x y |
| f(g(x))| f ( g x ) |
| f(x, g(y) ) | f x ( g y ) |
| f(x)g(y) | f x * g y |

- 하스켈 확장자

```
.hs
```

## example

- test.hs

```
double x = x + x
quadruple x = double ( double x )
```

```
$ ghci test.hs
```

```
$ quadruple 10
> 40
```

```
$ take (double 2) [1,2,3,4,5,6]
> [1,2,3,4]
```

```
factorial n = product [1..n]
average ns = sum ns ‘div’ length ns
```

- x ‘f’ y == f x y

- $ :reload   
-- reading file
-- GHCi 는 파일 수정을 detect 하지 않기 때문에 새로 리 로드를 해줘야 함

## Naming

- lower-case로 시작
ex)
myFun
fun1
arg_2
x`

- list arguments는 s로
ex)
xs
ns
nss

## Layout Rules
- same column 맞추기

## Useful GHCi Commands

| Mathematics  | Haskell |
| ------------- | ------------- |
| :load {name} | load script {name} |
| :reload | reload current script |
| :edit {name} | edit script {name} |
| :edit | edit current script |
| :type {expr} | show type of {expo} |
| :? | show all commands |
| :quit | quit GHCi |
| :t {expr} | {expr} :: {type} |
