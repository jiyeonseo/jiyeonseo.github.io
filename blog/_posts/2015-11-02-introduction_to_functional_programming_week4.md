---
date: 2015-11-01
tags: 
  - fp
  - haskell
---

# FP101x - week 4 List Comprehensions

### Set Comprehensions
- the comprehension notation can be used to construct new sets from old sets

- x <- [1..5] : generator
- Comprehensions can have multiple generators , separated bu commas
- ex)

```
> [(x,y) | x <- [1,2,3] , y <- [4,5]]
[(1,4),(1,5),(2,4),(2,5),(3,4),(3,5)]
```

- changing the order of the generators changes the order of the elements in the final list

```
> [(x,y) | y <- [4,5], x <- [1,2,3] ]
[(1,4),(2,4),(3,4),(1,5),(2,5),(3,5)]
```

### dependant Generators
- Later generators can depend on the variables
ex)

```
> [(x,y) | x <- [1..3], y <-[x..3]]
[(1,1),(1,2),(1,3),(2,2),(2,3),(3,3)]
```

- concatenates a list of lists

```
concat :: [[a]] -> [a]
concat xss = [x|xs <- xss, x <- xs]

> concat [[1,2,3], [4,5], [6]]
[1,2,3,4,5,6]
```

### Guards
- List comprehensions can use guards to restrict the values

```
> [ x | x <- [1..10], even x]
[2,4,6,8,10]
```

- factors
- maps a positive integer to its list of factors:
- 인자, 인수

```
factors :: Int -> [Int]
factors n = [ x | x <- [1..n], n ‘mod’ x == 0]

> factor 15
[1,3,5,15]
```

- prime
- A positive integer is prime if its only factors are 1 and itself.
- Hence, using factors we can define a function that decides it a number is prime
- 소수

```
prime :: Int -> Bool
prime n = factors  == [1,n]

> prime 15
false
> prime 7
truer
```

- primes
- the list of all primes up to a given limit

```
primes :: Int -> [Int]
primes n = [x | x <- [2..n], prime x]

> primes 40
[2,3,5,7,11,13,17,19,23,29,31,37]
```

### the Zip Function
- maps two lists to a list of pairs of their corresponding elements

```
zip :: [a] -> [b] -> [(a,b)]

> zip [‘a’,’b’,’c’] [1,2,3,4]
[(‘a’,1),(‘b’,2),(‘c’,3)]
```

- pairs
- Using zip we can define a function returns the list of all pairs of adjacent elements from a list

```
pairs :: [a] -> [(a,a)]
pairs xs = zip xs (tail xs)

> pairs [1,2,3,4]
[(1,2),(2,3),(3,4)]
```

- sorted
- Using pairs we can define a function that decides if the elements in a list are sorted

```
sorted :: Ord a => [a] -> Bool
sorted xs = and [ x <= y | (x,y) <- pairs xs ]

> sorted [1,2,3,4]
True
> sorted [1,3,2,4]
False
```

- positions
- Using zip, functions that returns the list of all positions of a value in a list

```
positions :: Ez a => a -> [a] -> [Int]
positions x xs =
     [ i | (x’ ,i) <- zip xs [0..n], x == x’]
      where n = length xs - 1

> positions 0 [1,0,0,1,0,1,1,0]
[1,2,4,7]
```

### String Comprehensions
- A string is a sequence of characters enclosed in double quotes
- Strings are represented as lists of characters
- “abc” :: String
- means [‘a’,’b’,’c’] :: [Char]

```
> length “abcde"
5

>take 3 “abcde"
“abc"

> zip “abc” [1,2,3,4]
[(‘a’,1),(‘b’,2),(‘c’,3)]
```

- lowers
- function that counts the lower-case letters in a string

```
lowers :: String -> Int
lowers xs = length [x | x <- xs, isLower x]

> lowers “Haskell"
6
```
