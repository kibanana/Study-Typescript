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
