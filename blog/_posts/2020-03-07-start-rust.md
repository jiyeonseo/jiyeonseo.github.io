---
date: 2020-3-7
tags:
  - rust
---

# 빠르게 Rust 시작하기 

## 설치

```
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Quick Hello world! 
```rs
// main.rs
fn main() { 
    println!("hello world")
}
```

```sh
$ rustc main.rs
$ ./main
```

## Cargo : Rust package manager 

- [https://doc.rust-lang.org/stable/cargo/](https://doc.rust-lang.org/stable/cargo/)
- dependencies 관리와 빌드를 도와주는 툴 
- 러스트 인스톨시 함께 설치됨.

### get started 

```sh
$ cargo new hello_cargo 
     Created binary (application) `hello_cargo` package
$ cd hello_cargo
$ tree
.
├── Cargo.lock
├── Cargo.toml
├── src
│   └── main.rs
└── target
    └── debug
        ├── build
        ├── deps
        │   ├── hello_cargo-4f9bbc766a6bed6e
        │   ├── hello_cargo-4f9bbc766a6bed6e.d
        │   └── hello_cargo-4f9bbc766a6bed6e.dSYM
        │       └── Contents
        │           ├── Info.plist
        │           └── Resources
        │               └── DWARF
        │                   └── hello_cargo-4f9bbc766a6bed6e
        ├── examples
        ├── hello-cargo
        ├── hello-cargo.d
        ├── hello-cargo.dSYM -> deps/hello_cargo-4f9bbc766a6bed6e.dSYM
        └── incremental
            └── hello_cargo-28uu69h6kcugh
                ├── s-fld3yscad2-1pczum-2by4xv7aucrey
                │   ├── 1a5pkpzb7dhttvwh.oi
                │   ├── 1kfwap09nwaqppw8.o
                │   ├── 2978eki65h1lupg3.o
                │   ├── 3gwtzgskfxw03ebx.o
                │   ├── 48kmlx83inextlui.o
                │   ├── 4a80t7ygk8z8v3mu.o
                │   ├── dep-graph.bin
                │   ├── query-cache.bin
                │   └── work-products.bin
                └── s-fld3yscad2-1pczum.lock
```

여기서 패키지 파일 `Cargo.toml`를 열어보면..

```
[package]
name = "hello-cargo" 
version = "0.1.0"
authors = ["jiyeonseo <seojeee@gmail.com>"]
edition = "2018" # edition/version of rust language

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
``` 

### cargo build 

```sh
$ cargo build
```
하위에 `/target` 폴더가 생성됨. 

```sh
$ l target/debug
total 560
drwxr-xr-x@ 11 user  staff   352B  3  8 21:20 .
drwxr-xr-x   4 user  staff   128B  3  8 21:20 ..
-rw-r--r--   1 user  staff     0B  3  8 21:20 .cargo-lock
drwxr-xr-x   3 user  staff    96B  3  8 21:20 .fingerprint
drwxr-xr-x   2 user  staff    64B  3  8 21:20 build
drwxr-xr-x   5 user  staff   160B  3  8 21:20 deps
drwxr-xr-x   2 user  staff    64B  3  8 21:20 examples
-rwxr-xr-x   2 user  staff   273K  3  8 21:20 hello-cargo # 실행 가능한 파일 
-rw-r--r--   1 user  staff   100B  3  8 21:20 hello-cargo.d
lrwxr-xr-x   1 user  staff    38B  3  8 21:20 hello-cargo.dSYM -> deps/hello_cargo-4f9bbc766a6bed6e.dSYM
drwxr-xr-x   3 user  staff    96B  3  8 21:20 incremental
```

### cargo run 

```sh
$ cargo run
```

### cargo clean 

만들어 놓은 빌드를 제거  (`/target` 디렉토리 삭제됨 )

```sh
$ cargo clean 
```

## Variable

```
let name = "Pascal";

println!("{}", name);
```
- 기본적으로 immutable임. 다른 값을 assign 하려 하면 에러가 남.
- mutable로 만들기 위해서는 `mut` 키워드를 사용한다. 

```
let mut name = "Pascal";

println!("{}", name); // Pascal
name = "Cheese";
println!("{}", name); // Cheese
```

### Types 

```
let x: i32; // `i32` is a signed 32-bit integer
x = 42;

// there's i8, i16, i32, i64, i128
//    also u8, u16, u32, u64, u128 for unsigned
```
- 더 자세한 내용은 [공식 문서](https://rinthel.github.io/rust-lang-book-ko/ch03-02-data-types.html) 참고 

### String


```
// `to_string()`

let first = "Cheese".to_string();

// length 
let aa = "123";
aa.len(); // 3 
```

### _ 

- 언더바 변수로 사용 가능 

```
let _ = 42;
```

- 언더바로 시작하는 변수는 unused에 대하여 warning 하지 않음.  

```
let _x = 123;
```

### Tuple

```
let pair = ('a', 123);
pair.0; // 'a'
pair.1; // 123

let pair: (char, i32) = ('a', 17);

let (some_char, some_int) = ('a', 17);
//  `some_char`  ==  'a', `some_int` == 17
```

### struct

```
struct Vec2 {
    x: f64, // 64-bit floating point, aka "double precision"
    y: f64,
}
```

- `struct update syntax` : spread operator 같은 기능. ([자세히](https://rinthel.github.io/rust-lang-book-ko/ch05-01-defining-structs.html?highlight=struct,update#%EA%B5%AC%EC%A1%B0%EC%B2%B4-%EA%B0%B1%EC%8B%A0%EB%B2%95%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EA%B8%B0%EC%A1%B4-%EA%B5%AC%EC%A1%B0%EC%B2%B4-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EB%A1%9C-%EC%83%88-%EA%B5%AC%EC%A1%B0%EC%B2%B4-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0))

```
let v3 = Vec2 {
    x: 14.0,
    ..v2
};
```

## function  

### parameter 
```
fn main() {
    let name = "Cheese";
    
    say_cheese(name.to_string(), "Seo".to_string());
}

fn say_cheese(first: String, last: String) {
    println!("{} {}", first, last); // Cheese Seo
}
```
Type을 맞춰 param을 사용할 땐, `to_string()`으로 

### Blocks { }

- 여러 동작을 묶을 수도 있다. 

```
let x = {
    let y = 1; // first statement
    let z = 2; // second statement
    y + z // this is the *tail* - what the whole block will evaluate to
};
```

## use 

- 외부 모듈을 가져올 때

```
use std::io;
```

- `crate::module::function` 이러한 식으로 

```
use std::cmp::min;

let least = min(7, 1); // this is 1

use std::cmp::{min, max}; // 한번에 function 여러개 가져오기 가능 

use std::cmp::*; // wildcard도 가능!
```

같은 방식으로 function call도 가능 
```
let x = "amos".len(); // this is 4
let x = str::len("amos"); // 4 
```

## stdin

```
use std::io; 

fn main() {
    println!("Hey, enter your name: ");

    let mut name = String::new();

    io::stdin().read_line(&mut name); //  has a warning but works fine
    println!("Thanks {}", name)
}
```

## Error Handling 

### unwrap 
```
println!("plz enter your number: ");

let mut first = String::new();
io::stdin().read_line(&mut first);

let a:u32 = first.trim().parse();
```
- 문자로 받은 값을 그냥 `parse()` 해주면 다음과 같이 에러가 난다. 

```sh
7 |     let a:u32 = first.trim().parse();
  |           ---   ^^^^^^^^^^^^^^^^^^^^ expected `u32`, found enum `std::result::Result`
  |           |
  |           expected due to this
  |
  = note: expected type `u32`
             found enum `std::result::Result<_, _>`
```

- 해석하면 `u32` 즉 integer가 올 줄 알았으나 Result 라는 타입으로 떨어짐. 
- 간단히 말하자면, `Result` error 혹은 값을 가질 수 있는 타입. (좀 더 자세한 사항은 [공식 문서](https://rinthel.github.io/rust-lang-book-ko/ch09-02-recoverable-errors-with-result.html)에서 확인 할 수 있다.)
- `unwrap()` 에러가 없을 때 바로 값을 리턴해주는 함수. 만약 에러가 있을 경우 어플리케이션은 panic 됨. 

```sh 
# int 파싱 하려 햇으나 string이 들어온 경우 
thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: ParseIntError { kind: InvalidDigit }', src/libcore/result.rs:1188:5
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace.
``` 

- `unwrap()`은 에러 핸들링을 할 수 없으므로 개발중일때만 사용하고,  production 모드에서는 쓰지 않는 것이 좋다. 

### expect 

- `expect()` 함수는 에러가 났을 때, 유저에게 보여주고자 하는 에러 메세지를 정할 수 있다. 

```
let a:u32 = first.trim().parse().expect("This is not a valid number");
```

### match 
```
    let mut a:u32 = 0;

    match first.trim().parse() {
        Ok(val) => {
            a = val;
        }, 
        Err(_err) => { // 에러는 _err 와 같이 언더스코어 써주지 않으면 warning
            println!("This is not a valid number");
        }
    }
```

### process::exit()

- 프로세스 종료 

```
use std::process;
 match first.trim().parse() {
        Ok(val) => {
            a = val;
        }, 
        Err(_err) => { 
            println!("This is not a valid number");
            process::exit(1); // 0 이 아니면 모두 에러와 함께 종료
        }
    }
```

## loop 

```
loop {
    // add your code here
}
```

## Source code

- [hello-cargo](https://github.com/jiyeonseo/hello-cargo)

## references

- [write-your-first-program-with-the-rust-language](https://egghead.io/courses/write-your-first-program-with-the-rust-language)
- [A half-hour to learn Rust](https://fasterthanli.me/blog/2020/a-half-hour-to-learn-rust/)
