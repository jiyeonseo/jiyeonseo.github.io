---
date: 2015-11-01
tags: 
  - fp
  - haskell
---

# FP101x - week 3 Defining Functions

### Conditional Expressions
- `abs :: Int -> Int`
- `abs n = if n >= 0 then n else -n`

- `signum :: Int -> Int`
```
signum n = if n < 0 then -1 else
                    if n == 0 then 0 else 1
```

### Guarded Equations

```
 abs n | n >= 0     = n
          | otherwise = -n

 signum n | n < 0 = -1
                    | n == 0 =0
                    | otherwise = 1
```

### Pattern Matching
- `not :: Bool -> Bool`
- `not False = True`
- `not True = False`

- `(&&) :: Bool -> Bool -> Bool`
- `True && True = True`
- `True && False = False`
- `False && True = False`
- `False && False = False`

- `True && True = True`
- `_ && _ = False`

so..

- `True && b = b`
- `False && _ = False`

### List Pattern
- `[1,2,3,4] means 1:(2:(3:(4:[])))`

- Functions on lists can be defined using `x:xs` patterns

```
head :: [a] -> a
head (x:_) = x
tail :: [a] -> [a]
tail (_:xs) = xs
```

- `x:xs` patterns only matches non-empty lists:

```
> head []
ERROR
```

### Lambda Expressions
- Functions can be constructed without naming the functions by using lambda expressions
- `\x -> x+x`

```
add x y = x + y
```

means

```
add = \x -> (\y -> x+y)
```

- Lambda expressions are also useful when defining functions that return functions as results

ex)

```
const :: a -> b -> a
const x _ = x
```

to lambda

```
const :: a -> ( b -> a )
const x = \_ -> x
```

### Sections
- An operator written before its arguments by using parentheses
ex)

```
> 1+ 2
3
> (+) 1 2
3
> (1+) 2
3
> (+2) 1
3
```

- Useful functions can sometimes be constructed in a simple way using sections.
- ex)
- (1+) : successor function
- (1/) : reciprocation function
- (*2) : doubling function
- (/2) : halving function
