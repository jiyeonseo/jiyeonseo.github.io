---
date: 2017-05-14
tags: 
  - etc
---

# Typescript 시작

[Egghead](https://egghead.io)의 [Use Types Effectively in TypeScript](https://egghead.io/courses/use-types-effectively-in-typescript)를 공부하며 정리한 내용입니다.

***

# Typescript

- TypeScript is JavaScript with static typing.

# 환경 세팅

```
$ npm install -g typescript // npm으로 설치 
$ tsc -v // 버전
$ tsc main.ts // main.ts >> main.js 변환
```

# playground

[https://www.typescriptlang.org/play/](https://www.typescriptlang.org/play/)

## Union Types

- 다양한 타입을 받을 수 있도록 해줄 수 있다.

```js
let thing : string | number | string[] | boolean;

let returnSomthing = (someThing : string | number | string[] | boolean ) => {
  return someThing;
};
```

- Union type을 변수에 선언해 줄 수도 있다.

```js
type thing = string | number | string[] | boolean;

let returnSomthing = (someThing : thing ) => someThing;
```

- 내부에서 타입 검사를 해볼 수도 있다.

```js
type thing = string | number | string[] | boolean;

let returnSomthing = (someThing : thing ) => {
  if (typeof someThing === "string") ||
      typeof someThing === "number") ||
      typeof someThing === "boolean")) {
        console.log("someThing = ", someThing )
      }
  if (someThing instanceof Array) {
    let joinedThings = "";
    someThing.forEach((thing) => {
        joinedThings += `${thing}`;
      });
      console.log("joinedThings = ", joinedThings);  
  }
};

returnSomthing(123); // someThing = 123
returnSomthing(["a","b","c"]); // joinedThings = abc
```

-  type 에는 object가 아닌 것도 들어갈 수 있다.

```js
type stuff = string | {name:string};
let gimmeStuff = (stuff: stuff) => {
  typeof stuff === "string";
  typeof stuff === "string";    
};  
// error TS2339: Property 'name' does not exist on type 'string | { name: string; }'
// object와 not object가 함께 있으면 에러가 남.
```

```js
type coolThings = {name: string;} | {id: number;};
let gimmeCoolthings = (thing: coolThings) => {
  if (typeof thing.name === "string") { return thing.name; }
  if (typeof thing.id === "number") { return thing.id; }
};  
// error TS2339: Property 'name' does not exist on type '{ name: string; } | { id: number }'
// error TS2339: Property 'name' does not exist on type '{ name: string; } | { id: number }'
// error TS2339: Property 'id' does not exist on type '{ name: string; } | { id: number }'
// error TS2339: Property 'id' does not exist on type '{ name: string; } | { id: number }'
// not object끼리 있더라도 같은 parameter가 없으면 에러가 남
```

```js
type stuffAndThings = {cool: string; meh: string;} | {cool: string; lame: string; }
let gimmeStuffAndThings = (sat: stuffandThings) => {
  return sat.cool;
};
// It works! 같은 parameter가 있으면 된다.
```

## string literal type

```js
let unit: string = "아무거나 올 수 있다.";
let miles: "MILES" = "MILES"; // literal type. type과 같은 값, null, undefined 만 가능.
```

- 이걸 이용해서 parameter에 들어올 값들을 제한 할 수 있다.

```js
type distanceMetric = "MILES" | "KILOMETERS" | "METERS" | "YARDS" | "FEET" | "INCHES";
function moveCharacter(distance: number, value: distanceMetric) {
  console.log(`You moved ${distance} ${value}`);
   // error TS2345: Argument of type '"dragon"' is not
   // assignable to parameter of type '"MILES" | "KILOMETERS" | ... '
};
```

## interface

```js
let superHero: { secretIdentity: string; superHeroName: string; health: number };
let superVillain: { secretIdentity: string; superHeroName: string; health: number };
```

- 같은 모양의 변수를 많이 만들어야 할 때 interface를 이용할 수 있다.

```js
interface ComicBookCharacter {
  secretIdentity?: string;  // ? : optional
  alias: string;
  health: number;
}

let superHero: ComicBookCharacter = {
  alias: true,      // Types of property 'alias' are incompatable. Type 'boolean' is not assignable to type 'string'.
  health: 5000      
}
let superVillain: ComicBookCharacter = {
  secretIdentity: "Jack Napier", // Object literal may only specify known
  alias: "Joker",               // properties and 'secretIdentity' does not
  health: 75                    // exist in type 'ComicBookCharacter'
}
```

- 함수에서 parameter에 interface로 받을 수도 있다.

```js
function getSecretIdentity(character: ComicBookCharacter) {
  if (character.secretIdentity) {
    console.log(`${character.alias} is ${character.secretIdentity}`);
  } else {
    console.log(`${character.alias} has no secret identity`);
  }
}
getSecretIdentity(superHero);  
```

- interface 내에서 다른 interface를 사용도 가능하다.

```js
interface AttackFunction {
  (opponent: { alias: string; health: number; }, attackWith: number): number; // opponent와 attackWith를 parameter로 받는 function
}

interface KrustyTheClown {
  alias: string;
  health: number;
  inebriationLevel: number;
  attack: AttackFunction;
}

function attackFunc(opponent, attackWith) {
  opponent.health -= attackWith;
  console.log(`${this.alias} attacked ${opponent.alias}, who's health = ${opponent.health}`);
  return opponent.health;
}

let superVillain: ComicBookCharacter = {
  scretIdentity: "Jack Napier",
  alias: "Joker",               
  health: 75,
  insanity: 175,
  attack: attackFunc
}
```

- interface를 extends 할 수도 있다.

```js
interface OptionalAttributes {
  strength?: number;
  insanity?: number;
  dexterity?: number;
  healingFactor?: number;
}

interface ComicBookCharacter extends OptionalAttributes { ... }
```

## class

- 타입스크립트에서 class는 function 이다. function 은 object 이고 즉, property를 가질 수 있다.
- class는 method도 가질 수 있다.
- method에서는 function이라고 표현하지 않아도 된다.
- method명(parameter){ }

```js
class ComicBookCharacter {
  alias: string;
  health: number;
  strength: number;
  secretIdentity: string;

  attackFunc(opponent, attackWith: number) {
    opponent.health -= attackWith;
    console.log(`${this.alias} attacked ${opponent.alias} who's health = ${opponent.health}`);
  }
}
```

- 클래스 내 property들은 기본 public. private으로 하면 class 밖에서는 .으로 접근할 수 없다.

```js
class ComicBookCharacter {
  alias: string;
  health: number;
  strength: number;
  private secretIdentity: string;

  attackFunc(opponent: Opponent, attackWith: number) { ... }

  getSecretIdentity() {
    console.log(`${this,alias}'s secret identity is $(this.secretIdentity)`);
  }
}
```

- constructor arguments를 이용하면 property를 따로 정의할 필요가 없다.
- 이 경우 public, private 와 같은 access modifiers를 반드시 함께 써주어야 한다.
- 없으면 그저 constructor의 argument로만 간주된다.

```js
class ComicBookCharacter {
  attackFunc(opponent: Opponent, attackWith: number) { ... }

  getSecretIdentity() { console.log(`${this,alias}'s secret identity is $(this.secretIdentity)`);}

  constructor(public alias: string, public health: number, public strength: number, private secretIdentity: string) {}
}
```

- class는 static property 역시 가지고 있다.
- instance에서는 사용할 수 없다.
- 오직 class를 통해서만 사용할 수 있다.

```js
class ComicBookCharacter {
  static createTeam(teamName: string, members: ComicBookCharacter[]) {
    name: teamName,
    members: members
  }
}

let instanceTeam = new ComicBookCharacter();
instanceTeam.createTeam("oddCouple, [storm, theBlob]); // error!!!!  

let team = ComicBookCharacter.createTeam("oddCouple, [storm, theBlob]);
```

- class역시 extends할 수 있다.

```js
class ComicBookCharacter (
  constructor{
    public alias: string, public health: number , public strength: number,
    private secretIdentity: string
  ) {}
}

class SuperHero extends ComicBookCharacter {
  traits = ["empathy", "strong moral code"];

  getSecretId() { console.log(this.secretIdentity);  // not working!!!  
  // extends 된 class 에서는 부모 class의 private property에 접근 할 수없다.
  // private은 자신이 속해있는 container에서만 접근 가능하다.
  // 이 경우, secretIdentity 를 protected로 변경해주면 된다.
}

class SuperVillain extends ComicBookCharacter {
  flaws = ["hubris", "always explains evil plan"];
}

let jubilee = new SuperHero("Jubilee", 23, 233, "Jubilation Lee");
let scarletWitch = new SuperVillain("Scarlet Witch", 233, 4444, "Wanda Maximoff");
```

- 만약 자식 class에서 constructor를 만드려면 반드시 super(); 를 호출해 주어야 한다.
- 부모 class의 argument를 모두 받아야한다.
- constructor 내부에서 꼭! 첫번째로 불려야한다.

```js
class ComicBookCharacter (
  constructor{
    public alias: string, public health: number , public strength: number,
    protected secretIdentity: string
  ) {}
}

class SuperVillain extends ComicBookCharacter {
  flaws = ["hubris", "always explains evil plan"];

  constructor(a, b, c, d) {
    super(a, b, c, d);
    console.log('${this.alias} eats kittens!!!');
  }  
}
```

## Type Converting

- (something as Type)
- `<Type>`something

```js
interface SuperHero {
  powers: string[];
  savesTheDay: () => void;
}

interface BadGuy {
  badDeeds: string[];
  getRandomBadDeed: () => string;
  commitBadDeed: () => void;
}

function saveDayOrBadDeed(something: SuperHero | BadGuy) {
  // if (<SuperHero>something.powers) {} // angle bracket syntax
  if ((something as SuperHero).powers) {
    (something as SuperHero).savesTheDay();
  } else {
    (something as BadGuy).commitBadDeed();
  }
}

saveDayOrBadDeed(dazzler); // Dazzler transduces sonic vibrations into light to save the day!!!
saveDayOrBadDeed(badGuy); // BadGuy farts on old folks
```

- js로 바뀐걸 확인해보면 convert가 모두 사라진 것을 확인할 수 있다.

## Generics

```js
function pushSomethingIntoCollection(something, collection) {
  collection.push(something);
  console.log(collection);
}

let jeanGrey = { name: "Jean Grey" };
let wolverine = { name: "Wolverine" };

let superHeroes = [jeanGrey];
let powers = ["telekinesis", "esp"];

pushSomethingIntoCollection("cool", superHeroes);
pushSomethingIntoCollection("adamantium claws", []);
// [ { name: 'Jean Grey' }, 'cool' ]
// [ 'adamantium claws' ]
```

- 위와같이 할 경우, array 내에 각각 다른 type들이 들어가게 됨.

- Generics :  function 뒤에 `<T>` 를 써주고 parameter type에 (param : T) 와 같이 쓴다.
- 꼭 T 일 필요는 없고, cool, test 와 같이 다른 문자열을 쓸 수 있다.

```js
function pushSomethingIntoCollection<T>(something: T, collection: T[]) {
  collection.push(something);
  console.log(collection);
}

let jeanGrey = { name: "Jean Grey" };
let wolverine = { name: "Wolverine" };

let superHeroes = [jeanGrey];
let powers = ["telekinesis", "esp"];

pushSomethingIntoCollection("meh", superHeroes); // error!!!!!!
pushSomethingIntoCollection(jeanGrey, superHeroes); // it works!!
pushSomethingIntoCollection("adamantium claws", []);
```

- function 뒤에 `<T>` 를 위와 같이 생략해도 되지만 써주는게 IDE에서 작업할 때 더 좋다.

```js
interface SuperHero {name: string;}

pushSomethingIntoCollection<SuperHero>("meh", superHeroes); // error!!!
pushSomethingIntoCollection<SuperHero>(jeanGrey, superHeroes); // it works!!  
pushSomethingIntoCollection<string>("adamantium claws", []);
```

### Interface generic constraints

```js
interface Crocodile { personality: string; }
interface Taxes { year: number; }
interface Container<T> { unit: T; }

let crocContainer: Container<Crocodile> = {unit: { personality: "mean"}};
let taxContainer: Container<Taxes> = {unit: {year: 2011}};

interface RedCroc extends Crocodile { color: "red"; }
interface BlueCroc extends Crocodile { color: "blue"; }

interface CrocContainer<T extends Crocodile> { crocUnit: T; }

let blueCrocContainer: CrocContainer<BlueCroc> = {crocUnit: {personality: "cool", color: "blue"}};
```

### Class generic constraints

```js
class ClassyContainer<T extends Crocodile> {
  classyCrocUnit: T;
}

let classyCrocContainer = new ClassyContainer(); // type argument 를 안알려줘도 됨.
classyCrocContainer.classyCrocUnit = {personality: "classy"}; // 하지만  Crocodile을 extends 한 interface들의 property를 사용할 수 없다.

let classyCrocContainer = new ClassyContainer<RedCroc>(); // T을 알려주면
classyCrocContainer.classyCrocUnit = {personality: "classy", color: "red"}; // IDE에서자동완성도 됨.
```

- constructor를 사용한 경우
- type argument를 생략하더라도 property에 값을 셋 할수 있다.

```js
class CCC<T extends Crocodile> {]
  constructor(public cccUnit: T) {}
}

let ccc = new CCC<BlueCroc>({personality: "ultra classy", color: "blue"});
let ccc2 = new CCC({personality: "ultra classy", color: "blue"}); // it works!!
```
