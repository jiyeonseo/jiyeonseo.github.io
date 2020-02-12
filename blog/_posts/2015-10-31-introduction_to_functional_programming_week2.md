---
date: 2015-10-31
tags: 
  - fp
  - haskell
---

# FP101x - week 2 Types and Classes

### Type Error

```
> 1+ False
Error
```

### Type in Haskell
- `(expression)e :: (type)t`

### :type in GHCi

```
> not False
True
```

- calculates the type of an expression

```
> :type not False
not False :: Bool
```

### Basic Types
- Bool
- Char
- String
- Int
- Integer
- Float

### List Types
- sequence of value of the same type
- [False, Trye, False] :: [Bool]
- [‘a’, ‘b’, ‘c’ ] :: [Char]
- [[‘a’], [‘b’, ‘c’]] :: [‘Char’]

### Tuple Types
- A tuple is a sequence of values of different types
- (False, Ture) :: (Bool, Bool)
- (False, ‘a’, True) :: (Bool, Char, Bool)

### Function Types
- not :: Bool -> Bool
- isDigit :: Char -> Bool
— 0, 1
- argument and resist types are unrestricted

### Curried Functions
- functions as results
- add’      :: Int -> (Int -> Int)
add’ x y = x+y
- more flexible then functions on tuples

- associate to the left
mult x y z
means (((mult x) y) z)

### Polymorphic Fuctions
- a function is called polymorphic (“of many forms”) if its type contains one or more type variables.
- length :: [a] -> Int

ex )

```
> length [False, True]
2
> length [1,2,3,4]
4
```

- fst :: (a,b) -> a
- head :: [a] -> a
- take :: Int -> [a] -> [a]
- zip :: [a] -> [b] -> [(a,b)]
- id :: a -> a

### Overloaded Functions
- a polymorphic function is called overloaded of its type contains one or more class contains
- sum :: Num a => [a] -> a

ex)

```
> sum [1,2,3]
6
> sum [‘a’,’b’,’c’]
ERROR
```

### Haskell has a number of type classes
- Num : Numeric types
- Eq : Equality types
- Ord : Ordered types

ex )

- (+) :: Num a => a -> a -> a
- (==) :: Eq a => a -> a -> Bool
- (<) :: Ord a => a -> a -> Bool
