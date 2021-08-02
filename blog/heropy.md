## 타입 지정

```typescript
function add(a: number, b: number) {
    return a + b;
}

const sum = add(1, 2);
```

함수 반환값을 숫자로 추론(interence)해서 변수 `sum`도 `number` 타입으로 지정된다.

## 타입 에러

```typescript
let sum: string = add(1, 2); // TS2322 error

sum = 'a + b'; // TS2322 error
```

## 타입 선언

1. `boolean`
    참(`true`)/거짓(`false`)
2. `number`
    모든 부동 소수점 값. ES6의 2진수, 8진수, 16진수 리터럴도 지원함

    ```typescript
    let num: number;
    let integer: number = 6;
    let float: number = 3.14;
    let binary: number = 0b1010; // 2진수, 10
    let octal: number = 0o744; // 8진수, 484
    let hex: number = 0xf00d; // 16진수, 61453
    let infinity: number = Infinity;
    let nan: number = NaN;
    ```
3. `string`
    문자열. 작은따옴표, 큰따옴표, ES6의 템플릿 문자열 지원함
4. `Array`, `[]`

    ```typescript
    let fruits: string[] = ['apple', 'banana', 'mango'];
    // let fruits: Array<string> = ['apple', 'banana', 'mango'];

    let arr: (string | number)[] = [1, 'a', 2, 'b'];
    // let arr: Array<string | number> = [1, 'a', 2, 'b'];

    let tenArr = 10[];
    tenArr = [10];
    tenArr.push(11); // Error - TS2345

    let readOnlyArr: readonly number[] = [1, 2, 3, 4, 5];
    readOnlyArr[0] = 123; // Error - TS2542: Index signature in type 'readonly number[]' only permits reading.
    readOnlyArr.push(123); // Error - TS2339: Property 'push' does not exist on type 'readonly number[]'.

    // let readOnlyArr: ReadonlyArray<number> = [1, 2, 3, 4, 5];
    ```
5. `[TYPE, TYPE, ...]`
    튜플(Tuple). 배열과 매우 유사하며 정해진 타입의 고정된 길이(length) 배열을 표현함

    튜플은 정해진 타입의 고정된 길이 배열을 표현하지만, 이는 할당(Assign)에 국한됨

    ```typescript
    let tuple: [string, number];
    tuple = ['a', 1];
    tuple = ['a', 1, 2]; // Error - TS2322
    tuple = [1, 'a']; // Error - TS2322

    let users: [number, string, number][];
    // let users: Array<[number, string, number]>;
    users = [[1, 'Neo', 20], [2, 'Evan', 30], [3, 'Lewis', 30]];

    let oneTuple: [1, number];
    oneTuple = [2, 3]; // Error - TS2322: Type '2' is not assignable to type '1'.

    let readOnlyTuple: readonly [string, number] = ['Hello', 123];
    readOnlyTuple[0] = 'World'; // Error - TS2540: Cannot assign to '0' because it is a read-only property.
    ```
6. `enum`
    열거형. 숫자 혹은 문자열 값 집합에 이름(Member)을 부여할 수 있는 타입. 값의 종류가 일정한 범위로 정해져 있는 경우 유용함

    기본적으로 `0`부터 시작하며 값은 `1`씩 증가함

    ```typescript
    enum Week {
        Sun,
        Mon,
        Tue,
        Wed,
        Thu,
        Fri = 13,
        Sat
    }

    console.log(Week.Sun); // 0
    console.log(Week.Mon); // 1
    console.log(Week.Sat); // 14
    console.log(Week[13]); // Fri. 역방향 매핑


    enum Color {
        Red = 'red',
        Green = 'green',
        Blue = 'blue'
    } // 역방향 매핑 지원하지 않음
    console.log(Color.Red);
    console.log(Color['Green']);
    ```
7. `any`
    일반적인 자바스크립트 변수와 동일하게 어떤 타입의 값도 할당할 수 있으며, 외부 자원을 활용해 개발할 때 불가피하게 타입을 단언할 수 없는 경우, 유용할 수 있음

    강한 타입 시스템의 장점을 유지하기 위해 컴파일 옵션 `"noImplicitAny": true`를 설정하여 Any 사용을 엄격하게 금지할 수 있음
8. `unknown`
    Any와 같이 Unknown에는 어떤 타입의 값도 할당할 수 있지만, Unknown을 다른 타입에는 할당할 수 없음
9. `object`
    컴파일 옵션 `"strict": true`를 설정하면 object에 null은 포함되지 않음

    여러 타입의 상위 타입이기 때문에 그다지 유용하지 않으며, 보다 정확한 타입 지정을 위해 객체 속성들(Properties)에 대한 개별 타입을 지정할 수 있다(반복적인 사용을 원하는 경우 `interface`나 `type`을 사용하는 것을 추천).
10. `null`, `undefined`
11. `void`
    값을 반환하지 않는 함수(는 실제로 `undefined`를 반환함)에서 사용
12. 유니언(Union)
    `|`(vertical bar)를 사용해 두 개 이상의 타입을 허용함

    ```typescript
    let union: (string | number);
    union = 'Hello type!';
    union = 123;
    union = false; // Error - TS2322: Type 'false' is not assignable to type 'string | number'.
    ```
13. 인터섹션(Intersection)
    `&`(ampersand)를 사용해 2개 이상의 타입을 조합함
14. 함수(Function)
    화살표 함수를 이용해 타입(인수, 반환값)을 지정할 수 있음

## 타입 추론(Inference)

명시적으로 타입 선언이 되어있지 않은 경우, 타입스크립트는 타입을 추론해 제공함

- 타입스크립트가 타입을 추론하는 경우
  - 초기화된 변수
  - 기본값이 설정된 매개변수
  - 반환값이 있는 함수

> 타입 추론이 엄격하지 않은 타입 선언을 의미하는 것은 아니다. 따라서 이를 활용해 모든 곳에 타입을 명시할 필요는 없으며, 많은 경우 더 좋은 코드 가독성을 제공할 수 있디.

## 타입 단언(Assertions)

타입스크립트가 타입 추론을 통해 판단할 수 있는 타입의 범주는 넘어서는 경우, 더 이상 추론하지 않도록 지시할 수 있음

`string | number` 등 유니언 타입으로 정의했을 때 여러 타입 중 정확히 어느 타입인지 지시하기 위해 사용함

`변수 as 타입` / `<타입>변수` 2 가지 방식으로 단언할 수 있음

### Non-null 단언 연산자(Non-null assertion operator)

피연산자가 Nullish(null이나 undefined)값이 아님을 단언할 수 있는데, 변수나 속성에서 간단하게 사용할 수 있기 때문에 유용함

`!` 연산자를 사용함

특히 컴파일 환경에서 체크하기 어려운 DOM 사용에서 유용함

## 타입 가드(Guards)

타입 가드는 `NAME is TYPE` 형태의 타입 술부(Predicate)를 반환 타입으로 명시한 함수임

`is` 외에도 `typeof`, `in`, `instanceof` 연산자를 사용할 수도 있음

> `typeof` 연산자는 `number`, `string`, `boolean`, 그리고 `symbol`만 타입 가드로 인식할 수 있다.  `in` 연산자의 우변 객체(val)는 `any` 타입여야 한다.

## 인터페이스(interface)

`interface` 키워드를 사용함

`;`(semicolon), `,`(comma) 혹은 기호를 사용하지 않을 수 있음

`?`를 사용해 선택적(필수가 아닌) 속성으로 정의할 수 있음

### 읽기 전용 속성(Readonly properties)

`readonly` 키워드를 사용하면 초기화된 값을 유지해야 하는 읽기 전용 속성을 정의할 수 있음

모든 속성이 `readonly`일 경우, 유틸리티(Utility)나 단언(Assertion) 타입을 활용할 수 있음

## 함수 타입

함수 타입을 인터페이스로 정의하는 경우, 호출 시그니처(Call signature)라는 것을 사용하며 호출 시그니처는 함수의 매개 변수(parameter)와 반환 타입을 지정함

```typescript
interface User {
  name: string
}
interface GetUser {
  (name: string): User
}

// 매개 변수 이름이 인터페이스와 일치할 필요가 없습니다.
// 또한 타입 추론을 통해 매개 변수를 순서에 맞게 암시적 타입으로 제공할 수 있습니다.
const getUser: GetUser = function (n) { // n is name: string
  // Find user logic..
  // ...
  return user;
};
getUser('A');
```

## 클래스 타입

인터페이스로 클래스를 정의하는 경우, `implements` 키워드를 사용함

1.

```typescript
interface UserClass {
  name: string,
  getName(): string
}

class User implements UserClass {
  constructor(public name: string) {}
  getName() {
    return this.name;
  }
}

const neo = new User('Neo');
neo.getName(); // Neo
```

2.

```typescript
interface CatClass {
  name: string
}

class Cat implements CatClass {
  constructor(public name: string) {}
}

function makeKitten(c: CatClass, n: string) {
  return new c(n); // Error - TS2351: This expression is not constructable. Type 'CatClass' has no construct signatures.
}
const kitten = makeKitten(Cat, 'Lucy');
console.log(kitten);
```

↓

구성 시그니처(Construct signature): 호출 시그니처와 비슷하지만 `new` 키워드 사용함

```typescript
interface CatClass {
  name: string
}
interface CatConstructor {
  new (name: string): Cat;
}

class Cat implements CatClass {
  constructor(public name: string) {}
}

function makeKitten(c: CatConstructor, n: string) {
  return new c(n); // ok
}
const kitten = makeKitten(Cat, 'Lucy');
console.log(kitten);
```

3.

```typescript
interface FullName {
  firstName: string,
  lastName: string
}
interface FullNameConstructor {
  new(firstName: string): FullName; // Construct signature
}


function makeSon(c: FullNameConstructor, firstName: string) {
  return new c(firstName);
}
function getFullName(son: FullName) {
  return `${son.firstName} ${son.lastName}`;
}


// Anderson family
class Anderson implements FullName {
  public lastName: string;
  constructor (public firstName: string) {
    this.lastName = 'Anderson';
  }
}
const tomas = makeSon(Anderson, 'Tomas');
const jack = makeSon(Anderson, 'Jack');
getFullName(tomas); // Tomas Anderson
getFullName(jack); // Jack Anderson


// Smith family?
class Smith implements FullName {
  public lastName: string;
  constructor (public firstName: string, agentCode: number) {
    this.lastName = `Smith ${agentCode}`;
  }
}
const smith = makeSon(Smith, 7); // Error - TS2345: Argument of type 'typeof Smith' is not assignable to parameter of type 'FullNameConstructor'.
getFullName(smith);
```

## 인덱스 가능 타입(Indexable types)

인터페이스를 통해 특정 속성(메소드 등)의 타입을 정의할 순 있지만, 수많은 속성을 가지거나 단언할 수 없는 임의의 속성이 포함되는 구조에서는 기존의 방식만으론 한계가 있다. 이런 상황에서는 인덱스 시그니처(Index signature)가 유용하다.

배열같이 숫자로 인덱싱하거나 객체같이 문자로 인덱싱하는, **인덱싱 가능 타입(Indexable types)**들이 있다. 이런 인덱싱 가능 타입들을 정의하는 인터페이스는 **인덱스 시그니처(Index signature)**라는 것을 가질 수 있다. 인덱스 시그니처는 인덱싱에 사용할 인덱서의 이름과 타입, 그리고 인덱싱 결과의 반환 값을 지정한다. 인덱서의 타입은 `string`과 `number` 만 지정할 수 있다.

```typescript
interface INAME {
  [INDEXER_NAME: INDEXER_TYPE]: RETURN_TYPE // Index signature
}
```

인덱스 시그니처를 사용하면 인터페이스에 정의되지 않은 속성들을 사용할 때 유용하다. 단, 해당 속성이 인덱스 시그니처에 정의된 반환 값을 가져야 함에 주의해야 한다.

### keyof

인덱스 가능 타입에서 `keyof`를 사용하면 속성 이름을 타입으로 사용할 수 있다. 인덱스 가능 타입의 속성 이름들이 유니온 타입으로 적용된다.

```typescript
interface ICountries {
  KR: '대한민국',
  US: '미국',
  CP: '중국'
}
let country: keyof ICountries; // 'KR' | 'US' | 'CP'
country = 'KR'; // ok
country = 'RU'; // Error - TS2322: Type '"RU"' is not assignable to type '"KR" | "US" | "CP"'.
```

```typescript
interface ICountries {
  KR: '대한민국',
  US: '미국',
  CP: '중국'
}
let country: ICountries[keyof ICountries]; // ICountries['KR' | 'US' | 'CP']
country = '대한민국';
country = '러시아'; // Error - TS2322: Type '"러시아"' is not assignable to type '"대한민국" | "미국" | "중국"'.
```

## 인터페이스 확장

1. `extends` 키워드
2. 같은 이름

## 타입 별칭(Type Aliases)

`type` 키워드를 사용해 새로운 타입 조합을 만들 수 있다. 일반적인 경우 둘 이상의 조합으로 구성하기 위해 유니온을 많이 사용한다.

## 제네릭(Generic)

제네릭은 재사용을 목적으로 함수나 클래스의 선언 시점이 아닌, **사용 시점**에 타입을 선언할 수 있는 방법을 제공한다.

> 타입을 인수로 받아서 사용한다고 생각하면 쉽다.

## 제약 조건(Constraints)

인터페이스나 타입 별칭을 사용하는 제네릭을 작성할 수도 있다.

`<T>` 형태로 작성하면 별도의 제약 조건이 없어서 모든 타입이 허용된다.

만약 타입 변수 `T`가 `string`과 `number`인 경우만 허용하려면 `extends` 키워드를 사용하는 제약 조건을 추가할 수 있다.

`T extends U`

## 조건부 타입(Conditional Types)

제약 조건과 다르게, **타입 구현** 영역에서 사용하는 `extends`는 삼항연산자(Conditional ternary operator)를 사용할 수 있다. 이를 조건부 타입이라고 한다.

`T extends U ? X : Y`

## Infer

`infer` 키워드를 사용해 타입 변수의 타입 추론(Inference) 여부를 확인할 수 있다.

`T extends infer U ? X : Y` // U 가 추론 가능한 타입이면 참, 아니면 거짓

- infer 키워드는 제약 조건 extends가 아닌 조건부 타입 extends 절에서만 사용 가능
- infer 키워드는 같은 타입 변수를 여러 위치에서 사용 가능
- 일반적인 공변성(co-variant) 위치에선 유니언 타입으로 추론
- 함수 인수인 반공변성(contra-variant) 위치에선 인터섹션 타입으로 추론
- 여러 호출 시그니처(함수 오버로드)의 경우 마지막 시그니처에서 추론

[https://medium.com/@iamssen/typescript-%EC%97%90%EC%84%9C%EC%9D%98-%EA%B3%B5%EB%B3%80%EC%84%B1%EA%B3%BC-%EB%B0%98%EA%B3%B5%EB%B3%80%EC%84%B1-strictfunctiontypes-a82400e67f2]

## 함수

### this

- 함수 내 `this`는 전역 객체를 참조하거나(sloppy mode), `undefined`(strict mode)가 되는 등 우리가 원하는 콘텍스트(context)를 잃고 다른 값이 되는 경우가 있다.

```typescript
const obj = {
  a: 'Hello~',
  b: function () {
    console.log(this.a);
  }
};
```

```typescript
obj.b(); // Hello~

const b = obj.b;
b(); // Cannot read property 'a' of undefined

function someFn(cb: any) {
  cb();
}
someFn(obj.b); // Cannot read property 'a' of undefined

setTimeout(obj.b, 100); // undefined
```

위 예제와 같이 ‘호출하지 않는 메소드’를 사용(할당)하는 경우, this가 유효한 콘텍스트를 잃어버리고 a를 참조할 수 없게 된다.

`this` 콘텍스트가 정상적으로 유지돼 `a` 속성을 참조할 수 있는 방법

1. `bind` 메서드를 이용해 `this`를 직접 연결.
2. 화살표 함수. 유효한 콘텍스트를 유지하며 메소드를 호출.

만약 클래스의 메소드 멤버를 정의하는 경우, 프로토타입(Prototype) 메서드가 아닌 화살표 함수를 사용할 수 있다.

여기서 주의할 점은 인스턴스를 생성할 때마다 개별적인 메서드가 만들어지게 되는데, 일반적인 메서드 호출에서의 화살표 함수 사용은 비효율적이지만 만약에 메서드를 주로 콜백으로 사용하는 경우엔 프로토타입의 새로운 클로져 호출보다 화살표 함수의 생성된 메서드 참조가 훨씬 효율적일 수 있다.

### 명시적 this

- `someCatFn` 함수 내 `this`가 캡처할 수 있는 `cat` 객체를 `call` 메소드를 통해 전달 및 실행했지만, 엄격 모드에서 `this`는 암시적인(implicitly) any 타입이기 때문에 에러가 발생한다.
- ‘엄격 모드’는 컴파일러 옵션에서 `strict: true`(혹은 `noImplicitThis: true`)인 경우
- 이 경우 this의 타입을 명시적으로(explicitly) 선언할 수 있다. -> 첫 번째 가짜(fake) 매개변수로 this를 선언한다.

## 오버로드(Overloads)

매개변수 타입과 반환 타입이 다른 여러 함수를 가질 수 있는 것

함수 오버로드를 통해 다양한 구조의 함수를 생성하고 관리할 수 있다.

주의점은 함수 선언부와 함수 구현부의 매개변수개수가 같아야 한다.

함수 구현부에 `any`가 자주 사용된다.

## 클래스

클래스의 생성자 메서드(constructor)와 일반 메소드(methods) 멤버(class member)와는 다르게, 속성(properties)는 `name: string;`와 같이 클래스 바디(class body)에 별도로 타입을 선언한다(중괄호 {} 로 묶여 있는 영역이 클래스 바디).

- 접근제어자(Access Modifiers): 클래스, 메서드 및 기타 멤버의 접근 가능성을 설정하는 객체 지향 언어 키워드
  - public: 어디서나 자유롭게 접근 가능(생략 가능)
  - protected: 나의 파생된 후손 클래스 내에서 접근 가능
  - private: 내 클래스에서만 접근 가능

- 수식어
  - static: 정적으로 사용
  - readonly: 읽기 전용으로 사용(속성에만 적용 가능)

## 추상(Abstract) 클래스

다른 클래스가 파생될 수 있는 기본 클래스로, 인터페이스와 굉장히 유사하다. `abstract`는 클래스뿐만 아니라 속성과 메소드에도 사용할 수 있다. 추상 클래스는 직접 인스턴스를 생성할 수 없기 때문에 파생된 후손 클래스에서 인스턴스를 생성해야 한다.

추상 클래스가 인터페이스와 다른 점은 속성이나 메소드 멤버에 대한 세부 구현이 가능하다는 점이다.

## Optional

`?` 키워드

- 타입을 선언할 땐 선택적 매개 변수(Optional Parameter)를 지정할 수 있다. -> `y?: number`
- `?` 키워드 사용은 `| undefined`를 추가하는 것과 같다. -> `y: number | undefined`

## 속성과 메서드(Properties and Methods)

? 키워드를 속성(Properties)과 메소드(Methods) 타입 선언에도 사용할 수 있습니다.
다음은 인터페이스 파트에서 살펴봤던 예제입니다.
isAdult를 선택적 속성으로 선언하면서 더 이상 에러가 발생하지 않습니다.

```typescript
interface IUser {
  name: string,
  age: number,
  isAdult?: boolean
}

let user1: IUser = {
  name: 'Neo',
  age: 123,
  isAdult: true
};

let user2: IUser = {
  name: 'Evan',
  age: 456
};
```

Type이나 Class에서도 사용할 수 있습니다.

```typescript
interface IUser {
  name: string,
  age: number,
  isAdult?: boolean,
  validate?(): boolean
}
type TUser = {
  name: string,
  age: number,
  isAdult?: boolean,
  validate?(): boolean
}
abstract class CUser {
  abstract name: string;
  abstract age: number;
  abstract isAdult?: boolean;
  abstract validate?(): boolean;
}
```

## 선택적 체이닝(Optional Chaining)

`?.` 연산자 사용

```typescript
// Error - TS2532: Object is possibly 'undefined'.
function toString(str: string | undefined) {
  return str.toString();
}

// Type Assertion
function toString(str: string | undefined) {
  return (str as string).toString();
}

// Optional Chaining
function toString(str: string | undefined) {
  return str?.toString();
}
```

```typescript
// Before
if (foo && foo.bar && foo.bar.baz) {}

// After-ish
if (foo?.bar?.baz) {}
```

## Nullish 병합 연산자

일반적으로 논리 연산자 `||`를 사용해 Falsy 체크(`0, "", NaN, null, undefined`를 확인)하는 경우가 많습니다.
여기서 `0`이나 `""` 값을 유효 값으로 사용하는 경우 원치 않는 결과가 발생할 수 있는데, 이럴 때 유용한 Nullish 병합(Nullish Coalescing) 연산자 `??`를 타입스크립트에서 사용할 수 있습니다.

```typescript
const foo = null ?? 'Hello nullish.';
console.log(foo); // Hello nullish.

const bar = false ?? true;
console.log(bar); // false

const baz = 0 ?? 12;
console.log(baz); // 0
```

## 모듈

- 타입스크립트는 일반적인 변수나 함수, 클래스 뿐만 아니라 인터페이스나 타입 별칭도 모듈로 내보낼 수 있다.
- 타입스크립트는 CommonJS/AMD/UMD 모듈을 위해 `export = ABC;` `import ABC = require('abc');` 와 같은 내보내기와 가져오기 문법을 제공한다. 이는 ES6 모듈의 export default 같이 하나의 모듈에서 하나의 객체만 내보내는 Default Export 기능을 제공한다.
- 컴파일 옵션에 `"esModuleInterop": true` 를 제공하면 ES6 모듈의 Default Import 방식도 같이 사용할 수 있다.

### 모듈의 타입 선언(Ambient module declaration)

- 타입스크립트의 외부 자바스크립트 모듈 사용
  - `npm install <package-name`>
  - 가져오기(import) 단계에서 에러가 발생함
    - -> 타임스크립트 컴파일러가 확인할 수 있는 모듈의 타입 선언(Ambient module declaration)
- 모듈 구현과 타입 선언이 동시에 이뤄지는 타입스크립트와 달리, 구현만 존재하는 자바스크립트 모듈(E.g. Lodash)을 사용하는 경우, 컴파일러가 이해할 수 있는 모듈의 타입 선언이 필요하며, 이를 대부분 `.d.ts` 파일로 만들어 제공하게 된다.
  - `lodash.d.ts`

```typescript
// lodash.d.ts

// 모듈의 타입 선언(Ambient module declaration)
declare module 'lodash' {
  // 1. 타입(인터페이스) 선언
  interface ILodash {
    camelCase(str?: string): string
  }

  // 2. 타입(인터페이스)을 가지는 변수 선언
  const _: ILodash;

  // 3. 내보내기(CommonJS)
  export = _;
}
```

- 위 타입 선언이 컴파일 과정에 포함될 수 있도록 다음과 같이 `///`(삼중 슬래시 지시자, Triple-slash directive)를 사용하는 참조 태그(`<reference />`)와 `path` 속성을 사용한다.
- 참조 태그의 특징
  - 참조 태그로 가져오는 것은 모듈 구현이 아니라 타입 선언이기 때문에 `import` 키워드로 가져오지 않아야 한다.
  - 삼중 슬래시 지시자는 자바스크립트로 컴파일되면 단순 주석이다.
  - `path` 속성은 가져올 타입 선언의 상대 경로를 지정하며, 확장자를 꼭 입력해야 한다.
  - `types` 속성은 `/// <reference types="lodash" />` 와 같이 모듈 이름을 지정해야 하며, 이는 컴파일 옵션 `typeRoots`와 Definitely Typed(`@types`)를 기준으로 한다.

```typescript
// 참조 태그(Triple-slash directive)
/// <reference path="./lodash.d.ts" />

import * as _ from 'lodash';

console.log(_.camelCase('import lodash module'));
```

```
ts-node main.ts
```

### Definitely Typed(@types)

위에서 했던 것처럼 프로젝트에서 사용하는 모든 모듈에 대해 직접 타입 선언을 작성하는 것(타이핑, Typing)은 매우 비효율적이다. 그래서 우리는 여러 사용자들의 기여로 만들어진 Definitely Typed를 사용할 수 있다. 수많은 모듈의 타입이 정의되어 있으며, 지속적으로 추가되고 있다.

- `npm install -D @types/<module-name>`
- `npm info @types/<module-name>`

- 타입 선언 모듈(`@types/<module-name>`)은 `node_modules/@types` 경로에 설치되며, 이 경로의 모든 타입 선언은 모듈 가져오기(Import)를 통해 컴파일에 자동으로 포함된다.

### typeRoots와 types 옵션

- 자바스크립트 모듈을 사용할 때 타입 선언을 고민하지 않아도 되는 상황
  - 처음부터 타입스크립트로 작성된 모듈
  - 타입 선언(`.d.ts` 파일 등)을 같이 제공하는 자바스크립트 모듈
  - Definitely Typed(`@types/모듈`)에 타입 선언이 기여된 자바스크립트 모듈

하지만 직접 타입 선언을 작성(타이핑, Typing)해야 하는 다음과 같은 상황도 있다.
- 타입 선언을 찾을 수 없는 자바스크립트 모듈
- 가지고 있는 타입 선언을 수정해야 하는 경우


1. typeRoots 옵션을 테스트하기 위해, 새로운 프로젝트를 만들어 아래와 같이 Lodash를 설치하고 main.ts 파일을 생성
2. `npm install lodash`
3. ‘가져오기(Import)’ 단계에서 에러 발생

    ```typescript
    // main.ts

    import * as _ from 'lodash'; // Error - TS2307: Cannot find module 'lodash'.

    console.log(_.camelCase('import lodash module'));
    ```

4. `index.d.ts` 파일을 `types/lodash` 경로에 생성하고 `tsconfig.json` 파일 컴파일 옵션으로 `"typeRoots": ["./types"]` 를 제공한다.
   1. `typeRoots` 옵션의 기본값은 `"typeRoots": ["./node_modules/@types"]`이다.
   2. `typeRoots` 옵션은 지정된 경로에서 `index.d.ts` 파일을 우선 탐색한다.
   3. `index.d.ts` 파일이 없다면 `package.json`의 types 혹은 typings 속성에 작성된 경로와 파일 이름을 탐색한다.
   4. 타입 선언을 찾을 수 없으면 컴파일 오류가 발생한다.

    ```typescript
    // types/lodash/index.d.ts

    declare module 'lodash' {
      interface ILodash {
        camelCase(str?: string): string
      }
      const _: ILodash;
      export = _;
    }
    ```

5. `ts-node main.ts`

이렇게 typeRoots 옵션을 통해 types 디렉터리에서 여러 모듈의 타입 선언을 관리할 수 있으며,
디렉터리 이름은 `types` 뿐만 아니라 `@types`, `_types`, `typings` 등 자유롭게 사용할 수 있다.

추가로 컴파일러 옵션 `types`를 통해 화이트리스트(Whitelist) 방식으로 사용할 모듈 이름만을 작성할 수 있는데,
`"types": ["lodash"]`로 작성하면 types 디렉터리에서 Lodash의 타입 선언만을 사용하며,
`"types": []`로 작성하면 types 디렉터리의 모든 모듈의 타입 선언을 사용하지 않음을 의미하며,
types 옵션을 사용하지 않으면 types 디렉터리의 모든 모듈의 타입 선언을 사용하게 된다.

```typescript
// tsconfig.json

"typeRoots": ["./types"],
"types": ["lodash"] // 일반적으로 작성할 필요 없는 types 옵션
```

## TS 유틸리티 타입

- `Partial`	 TYPE의 모든 속성을 선택적으로 변경한 새로운 타입 반환 (인터페이스)
  - \<TYPE>
- `Required`	TYPE의 모든 속성을 필수로 변경한 새로운 타입 반환 (인터페이스)
  - \<TYPE>
- `Readonly`	TYPE의 모든 속성을 읽기 전용으로 변경한 새로운 타입 반환 (인터페이스)
  - \<TYPE>
- `Record`	KEY를 속성으로, TYPE를 그 속성값의 타입으로 지정하는 새로운 타입 반환 (인터페이스)
  - \<KEY, TYPE>
- `Pick`	TYPE에서 KEY로 속성을 선택한 새로운 타입 반환 (인터페이스)
  - \<TYPE, KEY>
- `Omit`	TYPE에서 KEY로 속성을 생략하고 나머지를 선택한 새로운 타입 반환 (인터페이스)
  - \<TYPE, KEY>
- `Exclude`	TYPE1에서 TYPE2를 제외한 새로운 타입 반환 (유니언)
  - \<TYPE1, TYPE2>
- `Extract`	TYPE1에서 TYPE2를 추출한 새로운 타입 반환 (유니언)
  - \<TYPE1, TYPE2>
- `NonNullable`	TYPE에서 null과 undefined를 제외한 새로운 타입 반환 (유니언)
  - \<TYPE>
- `Parameters`	TYPE의 매개변수 타입을 새로운 튜플 타입으로 반환 (함수, 튜플)
  - \<TYPE>
- `ConstructorParameters`	TYPE의 매개변수 타입을 새로운 튜플 타입으로 반환 (클래스, 튜플)
  - \<TYPE>
- `ReturnType`	TYPE의 반환 타입을 새로운 타입으로 반환 (함수)
  - \<TYPE>
- `InstanceType`	TYPE의 인스턴스 타입을 반환 (클래스)
  - \<TYPE>
- `ThisParameterType`	TYPE의 명시적 this 매개변수 타입을 새로운 타입으로 반환 (함수)
  - \<TYPE>
- `OmitThisParameter`	TYPE의 명시적 this 매개변수를 제거한 새로운 타입을 반환 (함수)
  - \<TYPE>
- `ThisType`	TYPE의 this 컨텍스트(Context)를 명시, 별도 반환 없음! (인터페이스)
  - \<TYPE>
