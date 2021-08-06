# Type compatibility (타입 호환성)

- 타입스크립트의 타입 호환성은 구조적 서브 타이빙(subtyping)을 기반으로 한다.
  - 구조적 타이핑: 오직 멤버만으로 타입을 관계시키는 방식
  - 구조적 타이핑은 명목적 타이핑(nominal typing)과 대조됨

    ```typescript
    interface Named {
        name: string;
    }
    class Person {
        name: string;
    }
    let p: Named;
    // 성공, 구조적 타이핑이기 때문입니다.
    p = new Person();
    ```
  
  - C#이나 Java와 같은 명목적 타입 언어에서는 `Person` 클래스는 `Named` 인터페이스를 명시적인 구현체로 기술하지 않았기 때문에 해당 코드에서 오류가 발생한다.
  - 타입스크립트의 구조적 타입 시스템은 자바스크립트 코드의 일반적인 작성 방식에 따라서 설계되었다.
  - 자바스크립트는 함수 표현식이나 객체 리터럴 같은 익명 객체를 광범위하게 사용하기 때문에 자바스크립트에서 발견되는 관계의 타입을 명목적 타입 시스템보다는 구조적 타입 시스템을 이용하여 표현하는 것이 훨씬 더 자연스럽다.

## 건전성 (Soundness)

- 타입스크립트의 타입 시스템은 컴파일 시간에 확인할 수 없는 특정 작업을 안전하게 수행할 수 있다.
  - 타입 시스템이 이런 특성을 갖고 있을 때, **건전**하지 않다고 말한다.
  - 타입스크립트에서 건전하지 못한 곳을 허용하는 부분을 신중하게 고려했으며, 이 문서 전체에서는 이러한 상황이 발생하는 곳과 유발하는 시나리오에 대해 설명한다.

## 1. 시작

- 타입스크립트의 구조적 타입 시스템의 기본 규칙 -> `y`가 최소한 `x`와 동일한 멤버를 가지고 있다면 `x`와 `y`는 호환된다.

```typescript
interface Named {
    name: string;
}
let x: Named;
// y의 추론된 타입은 { name: string; location: string; } 입니다.
let y = { name: "Alice", location: "Seattle" };
x = y; // 성공

function greet(n: Named) {
    console.log("Hello, " + n.name);
}
greet(y); // 성공
```

- `y`는 `location` 프로퍼티를 추가적으로 가지고 있지만 오류를 발생시키지 않는 점에 유의한다.
- 호환성을 검사할 때는 오직 대상 타입의 멤버(`Named`)만 고려된다.
- 이 비교 과정은 재귀적으로 각 멤버와 하위 멤버의 타입을 탐색하면서 진행된다.

## 2. 두 함수 비교

- 원시 타입과 객체 타입을 비교하는 것은 비교적 간단하지만, 어떤 유형의 함수들이 호환될 수 있는지에 대한 질문은 조금 더 복잡하다.

- 매개변수 목록이 다른 두 함수

    ```typescript
    let x = (a: number) => 0;
    let y = (b: number, s: string) => 0;
    y = x; // 성공
    x = y; // 오류
    ```

    - 두 번째 할당은 `y`는 `x`에 없는 두 번째 필수적인 매개변수를 가지고 있기 때문에 할당이 허용되지 않아 오류가 발생한다.
    - `y = x` 예제에서처럼 매개변수를 버리는 것이 허용되는 이유가 궁금할 수 있다. 이러한 할당이 허용되는 이유는 함수의 추가 매개변수를 무시하는 것이 실제로 자바스크립트에선 매우 일반적이기 때문이다. 예를 들어, `Array#forEach`는 콜백 함수에게 3가지 매개변수인 배열 요소, 그 요소의 인덱스, 그리고 이것을 포함하는 배열을 제공한다. 그러나 콜백 함수에서 첫 번째 매개변수만 사용해도 된다.

        ```typescript
        let items = [1, 2, 3];
        items.forEach((item, index, array) => console.log(item));
        items.forEach(item => console.log(item));
        ```

- 반환 타입이 다른 두 함수

    ```typescript
    let x = () => ({name: "Alice"});
    let y = () => ({name: "Alice", location: "Seattle"});
    x = y; // 성공
    y = x; // 오류, x()는 location 프로퍼티가 없습니다.
    ```

    - 타입 시스템은 원본 함수의 반환 타입이 대상 타입의 반환 타입의 하위 타입이 되도록 한다.

## 3. 함수 매개변수의 Bivariance

- 함수 매개변수의 타입을 비교할 때 원본 매개변수가 대상 매개변수에 할당이 가능하거나 이 반대여도 할당은 성공한다.
- 이것은 호출한 측에서 더 특수한 타입을 취하여 함수를 제공할 수도 있지만, 덜 특수화된 타입의 함수를 호출할 수 있기 때문에 바람직하지 않다. 실제로 이런 종류의 오류는 드물지만 이는 일반적인 자바스크립트 패턴들을 많이 사용할 수 있게 한다.

```typescript
enum EventType {
  Mouse,
  Keyboard,
}
interface Event {
  timestamp: number;
}
interface MyMouseEvent extends Event {
  x: number;
  y: number;
}
interface MyKeyEvent extends Event {
  keyCode: number;
}
function listenEvent(eventType: EventType, handler: (n: Event) => void) {
  /* ... */
}
// 바람직하진 않지만 유용하고 일반적임
listenEvent(EventType.Mouse, (e: MyMouseEvent) => console.log(e.x + "," + e.y));
// 건전성 측면에서 바람직하지 않은 대안
listenEvent(EventType.Mouse, (e: Event) =>
  console.log((e as MyMouseEvent).x + "," + (e as MyMouseEvent).y)
);
listenEvent(EventType.Mouse, ((e: MyMouseEvent) =>
  console.log(e.x + "," + e.y)) as (e: Event) => void);
// 여전히 허용되지 않음 (명확한 오류). 완전히 호환되지 않는 타입에 적용되는 타입 안전성(Type safety)
listenEvent(EventType.Mouse, (e: number) => console.log(e));
```

- 컴파일러 플래그인 `strictFunctionTypes`를 통해 이러한 상황이 발생하면 타입스크립트에서 오류가 발생하도록 할 수 있다.

## *4. 선택적 매개변수와 나머지 매개변수*

- 함수의 호환성을 비교할 때 선택적 매개변수와 필수 매개변수를 서로 바꿔 사용할 수 있다.
- 원본 타입의 추가 선택적 매개변수는 오류가 아니고, 원본 타입의 해당 매개변수가 없는 대상 타입의 선택적 매개변수도 오류가 아니다.
- 함수가 나머지 매개변수를 가지고 있다면, 마치 무한한 일련의 선택적 매개변수처럼 처리된다.
- 이것은 타입 시스템 관점에서는 바람직하지 않지만, 런타임 관점에서는 해당 위치에 `undefined`를 전달하는 것은 대부분 함수에 해당하므로 선택적 매개변수에 대한 아이디어는 제대로 적용되지 않는다.

콜백을 받아서 (프로그래머에게는) 예측이 가능하지만 (타입 시스템이) 알 수 없는 개수의 인수를 호출하는 함수의 일반적인 패턴

```typescript
function invokeLater(args: any[], callback: (...args: any[]) => void) {
    /* ... 'args'를 사용하여 콜백을 호출함 ... */
}
// 바람직하지 않음 - invokeLater는 "아마도" 여러개의 인수를 제공합니다
invokeLater([1, 2], (x, y) => console.log(x + ", " + y));
// 혼란스럽고 (x와 y가 실제로 필요함) 발견할 수 없음
invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));
```

## 5. 오버로드 함수

- 함수에 오버로드가 있는 경우 원본 타입의 각 오버로드는 대상 타입의 호환 가능한 시그니처와 일치해야 한다. 이를 통해 원본 함수와 모든 동일한 상황에서 대상 함수를 호출할 수 있다.

## 6. 열거형

- 열거형은 숫자와 호환되며 숫자는 열거형과 호환된다. 다른 열겨형 타입의 열거형 값은 호환되지 않는 것으로 간주한다.

```typescript
enum Status {
  Ready,
  Waiting,
}
enum Color {
  Red,
  Blue,
  Green,
}
let status = Status.Ready;
status = Color.Green; // 오류
```

## 7. 클래스

- 클래스는 객체 리터럴 타입과 인터페이스와 한 가지 예외를 제외하곤 유사하게 동작한다.
- 클래스는 정적 타입과 인스턴스 타입이 있다.
- 클래스 타입의 두 개의 객체를 비교할 때, 오직 인스턴스의 멤버만 비교된다.
- 정적인 멤버와 생성자는 호환성에 영향을 주지 않는다.

```typescript
class Animal {
  feet: number;
  constructor(name: string, numFeet: number) {}
}
class Size {
  feet: number;
  constructor(numFeet: number) {}
}
let a: Animal;
let s: Size;
a = s; // 성공
s = a; // 성공
```

## 8. 클래스의 private 멤버와 protected 멤버

- 클래스의 `private`과 `protected` 멤버는 호환성에 영향을 준다. 클래스 인스턴스의 호환성을 검사할 때 대상 타입에 `private` 멤버가 있다면, 원본 타입 또한 동일 클래스에서 비롯된 `private` 멤버가 있어야 한다. -> `protected` 멤버가 있는 인스턴스도 똑같이 적용된다.
- 이를 통해 클래스는 상위 클래스와 호환 가능하지만 같은 형태를 가진 다른 상속 계층 구조의 클래스와는 호환되지 않는다.

## 9. 제네릭

- 타입스크립트는 구조적 타입 시스템이기 때문에 타입 매개변수는 멤버의 타입의 일부로 사용할 때 결과 타입에만 영향을 준다.

```typescript
// x와 y는 구조가 타입 인수를 서로 다르게 사용하지 않기 때문에 호환된다. 이 예제에 Empty<T>를 멤버에 추가하여 어떻게 동작하는지 살펴보자.
interface Empty<T> {}
let x: Empty<number>;
let y: Empty<string>;
x = y; // 성공, y는 x의 구조와 대응하기 때문


// 타입 인수가 지정된 제네릭 타입은 비-제네릭 타입처럼 동작한다.
// 타입 인수가 지정되지 않은 제네릭 타입에 관해선 모든 지정되지 않은 타입 인수를 대신해서 any로 지정함으로써 호환성 검사를 한다. 그 결과 생성된 타입은 비-제네릭 경우와 마찬가지로 호환성을 검사한다.
interface NotEmpty<T> {
  data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;
x = y; // 오류, x와 y 는 호환되지 않음


let identity = function <T>(x: T): T {
  // ...
};
let reverse = function <U>(y: U): U {
  // ...
};
identity = reverse; // 성공, (x: any) => any는  (y: any) => any와 대응하기 때문
```

## 10. 고급 주제

### 하위 타입 vs 할당

- 지금까지 언어 사양에 정의된 용어가 아닌 **호환**을 사용했다.
- 타입스크립트에서는 두 가지 종류의 호환성이 있다: 하위 타입과 할당
  - 할당은 하위 타입의 호환성을 확장하여 `any`에서의 할당과 `enum`과 해당 숫자 값의 할당을 허용하는 규칙을 가진다는 점만 다르다.
- 언어에서 다른 위치는 상황에 따라 두 가지 호환 메커니즘 중 하나를 사용한다. 실용적인 목적을 위해 타입 호환성은 심지어 `implements`와 `extends`의 경우에도 할당 호환성에 의해 결정된다.

일부 추상 유형간의 할당 가능성

![image](https://user-images.githubusercontent.com/37951612/128477825-7831e62c-d43d-4a66-b4f1-dcedf8e517ee.png)