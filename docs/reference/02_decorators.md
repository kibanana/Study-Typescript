# Decorators

- 타입스크립트 및 ES6에 클래스가 도입됨에 따라 클래스 및 클래스 멤버에 어노테이션을 달거나 수정하기 위해 추가 기능이 필요한 특정 시나리오가 있다.
- 데코레이터는 클래스 선언과 멤버에 어노테이션과 메타-프로그래밍 구문을 추가할 수 있는 방법을 제공한다.
- 데코레이터는 자바스크립트에 대한 2단계 제안이며 타입스크립트의 실험적 기능으로 이용가능하다.
- `tsconfig.json` `experimentDecorators` 컴파일러 옵션 활성화 / `tsc --target ES5 --experimentalDecorators`

---

- 데코레이터는 **클래스 선언, 메서드, 접근자, 프로퍼티 또는 매개변수**에 첨부할 수 있는 특수한 종류의 선언이다.
- 데코레이터는 `@expression` 형식을 사용한다.
  - `expression`은 데코레이팅 된 선언에 대한 정보와 함께 런타임에 호출되는 함수여야 한다.

```typescript
function sealed(target) {
    // 'target' 변수와 함께 무언가를 수행합니다.
}
```

## 데코레이터 팩토리

- 데코레이터가 선언에 적용되는 방식을 원하는 대로 바꾸고 싶을 때 작성한다.
- 데코레이터 팩토리는 단순히 데코레이터가 런타임에 호출할 표현식을 반환하는 함수다.

```typescript
function color(value: string) { // 데코레이터 팩토리
    return function (target) { // 데코레이터
        // 'target'과 'value' 변수를 가지고 무언가를 수행합니다.
  };
}
```

## 데코레이터 합성

- 단일 행

    ```javascript
    @f @g x
    ```

- 여러 행

    ```javascript
    @f
    @g
    x
    ```

- 여러 데코레이터가 단일 선언에 적용되는 경우는 수학의 합성 함수와 유사하다.
  - 함수 `f`와 `g`을 합성할 때
    - -> `(f∘g)(x)`의 합성 결과는 `f(g(x))`

- 타입스크립트에서 단일 선언에서 여러 데코레이터를 사용할 때 다음 단계가 수행된다.
  1. 각 데코레이터의 표현은 위에서 아래로 평가됨
  2. 그런 다음 결과는 아래에서 위 함수로 호출된다.

```typescript
function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}
 
function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}
 
class ExampleClass {
  @first()
  @second()
  method() {}
}
```

```javascript
first(): factory evaluated
second(): factory evaluated
second(): called
first(): called
```

## 데코레이터 평가

- 클래스에서 다양한 선언에 데코레이터를 적용하는 방법
  1. 메서드, 접근자 또는 프로퍼티 데코레이터가 다음에 오는 매개변수 데코레이터는 각 인스턴스 멤버에 적용됨
  2. " 각 정적 멤버에 적용됨
  3. 매개 변수 데코레이터는 생성자에 적용됨
  4. 클래스 데코레이터는 클래스에 적용됨

## 클래스 데코레이터

- 클래스 데코레이터는 클래스 선언 직전에 선언됨
- 클래스 데코레이터는 클래스 생성자에 적용되며 클래스 정의를 관찰, 수정 또는 교체하는 데 사용할 수 있음
- 클래스 데코레이터는 선언 파일이나 다른 주변 컨텍스트(ex. 선언 클래스)에서 사용할 수 없다.

---

- 클래스 데코레이터의 표현식은 데코레이팅된 클래스의 생성자를 유일한 인수로 런타임에 함수로 호출됨
- 클래스 데코레이터가 값을 반환하면 클래스가 선언을 제공하는 생성자 함수로 바꿈
  - -> 새 생성자 함수를 반환하도록 선택한 경우 원래 프로토타입을 유지 관리해야 함
- 런타임에 데코레이터를 적용하는 로직은 이 기능을 대신해주지 않음
  
```typescript
function sealed(constructor: Function) { // 함수 선언을 사용하여 @sealed 데코레이터 정의
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed // BugReport 클래스에 적용된 클래스 데코레이터(@sealed)
class BugReport {
  type = "report";
  title: string;
 
  constructor(t: string) {
    this.title = t;
  }
}
```

`@sealed` 가 실행되면 생성자와 프로토타입을 모두 감싼다.

(아래 예제를 Typescript Playground에 붙여넣으면 빨간줄이 생기지만 Run 하면 실행은 잘된다.)

```typescript
// 생성자 재정의

function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor) {
  return class extends constructor {
    reportingURL = "http://www...";
  };
}
 
@reportableClassDecorator
class BugReport {
  type = "report";
  title: string;
 
  constructor(t: string) {
    this.title = t;
  }
}
 
const bug = new BugReport("Needs dark mode");
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"
 
// Note that the decorator _does not_ change the TypeScript type
// and so the new property `reportingURL` is not known
// to the type system:
bug.reportingURL;
// Property 'reportingURL' does not exist on type 'BugReport'.
```

[https://stackoverflow.com/questions/54813329/adding-properties-to-a-class-via-decorators-in-typescript]

```typescript
function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

const Greeter = classDecorator(class {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
});
type Greeter = InstanceType<typeof Greeter> // have the instance type just as if we were to declare a class

console.log(new Greeter("world"));
```

## 메서드 데코레이터

- 메서드 선언 직전에 선언됨
- 데코레이터는 메서드의 프로퍼티 설명자(Property Descriptor)에 적용되며 메서드 정의를 관찰, 수정 또는 대체하는 데 사용할 수 있음
- 메서드 데코레이터는 선언 파일, 오버로드 또는 기타 주변 컨텍스트(예: 선언 클래스)에서 사용할 수 없음

- 메서드 데코레이터의 표현식은 런타임에 다음 세 개의 인수와 함께 함수로 호출됨
  1. 

## 접근자 데코레이터

## 프로퍼티 데코레이터

## 매개변수 데코레이터

## 메타데이터
