---
date: 2015-11-05
tags: 
  - fp
  - haskell
---
# FP101x - week 5 Recursive Functions

- factorial :: Int -> Int
- factorial n = product [1..n]
- factorial maps any integer n to the product of the integers between 1 and n
- ex)

~~~
factorial 4
= product [1..4]
= product [1,2,3,4]
= 1*2*3*4
```

### Recursive Function
- functions can also be defined in terms of themselves
- factorial 0 = 1
- factorial n = n * factorial (n-1)
- ex)

```
factorial 3
= 3 * factorial 2
= 3 * ( 2 * factorial 1)
= 3 * ( 2 * ( 1 * factorial 0 ) )
= 3 * ( 2 * ( 1 * 1 ) )
= 3 * ( 2 * 1 )
= 3 * 2
= 6
```

### why
- simpler to defined in terms of other functions.
- naturally be defined in terms of themselves
- simple but powerful mathematical technique of induction

### Recursion of Lists
- Recursion is not restricted to numbers, but can also be used to define functions on lists

```
product :: [Int] -> Int
product [] = 1
product (n:ns) = n * product ns
```

- product maps the empty list to 1 and any non-empty list to its head multiplied by the product of its tail

```
product [2,3,4]
= 2 * product [3,4]
= 2 * ( 3 * product [4])
= 2 * ( 3 * ( 4 * product [] ) )
= 2 * ( 3 * ( 4 * 1 ) )
= 24
```

ex ) function length

```
length :: [a] -> Int
length [] = 0
length (_:xs) = 1 + length xs
```

```
length [ 1 , 2 , 3 ]
= 1 + length [ 2 , 3 ]
= 1 + ( 1 + length [ 3 ] )
= 1 + ( 1 + ( 1 + length [ ] )
= 1 + ( 1 + ( 1 + ( 1 + 0 ) )
= 3
```

ex ) reverse

```
reverse :: [a] -> [a]
reverse [] = []
reverse (x:xs) = reverse xs ++ [x]
```

```
reverse [1,2,3]
= reverse [2,3] ++ [1]
= ( reverse [3] ++ [2] ) ++ [1]
= ( (reverse [] ++ [3] ) ++ [2] ) ++ [1]
= ( ([] ++ [3] ) ++ [2] ) ++ [1]
= [3,2,1]
```
- appending the element from right to left

### Multiple Arguments
- zip

```
zip :: [a] -> [b] -> [(a,b)]
zip [] _ = []
zip _ [] = []
zip (x:xs) (y:ys) = (x,y) : zip xs ys
```

- drop

```
drop :: Int -> [a] -> [a]
drop 0 xs = xs
drop _ [] = []
drop n (_:xs) = drop (n-1) xs
```

- appending

```
(++) :: [a] -> [a] -> [a]
[] ++ ys = ys
(x:xs) ++ ys  = x : (xs ++ ys)
```

### Quicksort
- rule 1 : The empty list is already sorted
- rule 2 : Non-empty lists can be sorted by sorting the tail values <= the head sorting the tail values > the head, and then appending the resulting list on either side of the head value

```
qsort :: [Int] -> [Int]
qsort [] = []
qsort ( x : xs ) =
     sort smaller ++ [x] ++ sort larger
     where
          smaller = [ a | a <- xs, x <= x]
          larger = [ b | b <- xs, b > x ]
```

```
q [ 3,2,4,1,5 ]
q  [2,1] ++ [3] ++ q [4,5]
q[1] ++ [2] ++ q[] ++ [3] ++ q[] ++ [4] ++ q[5]
[1] ++ [2] ++ [] ++ [3] ++ [] ++ [4] ++ [5]
```

- produce a list with n identical elements

```
replicate :: Int -> a -> [a]
```

- select the nth element of a list

```
(!!) :: [a] -> Int -> a
```

- decide if a value is an element of a list

```
elem :: Eq a => a -> [a] -> Bool
```
