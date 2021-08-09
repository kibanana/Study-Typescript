# Utility Types

타입스크립트는 일반적인 타입 변환을 쉽게 하기 위해 몇 가지 유틸리티 타입을 제공하며, 이러한 유틸리티는 전역으로 사용 가능하다.

## `Partial<Type>`

- `Type` 집합의 모든 프로퍼티를 선택적으로 타입을 생성
- 주어진 타입의 모든 하위 타입 집합을 나타내는 타입을 반환

예제

```javascript
interface Todo {
  title: string;
  description: string;
}
 
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

## `Required<Type>`

- `Type` 집합의 모든 프로퍼티를 필수로 설정한 타입을 생성
- `Partial`의 반대

예제

```javascript
interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
 
const obj2: Required<Props> = { a: 5 }; // Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.
```

## `Readonly<Type>`

- `Type` 집합의 모든 프로퍼티읽기 전용(`readonly`)으로 설정한 타입을 생성
- 생성된 타입의 프로퍼티는 재할당될 수 없음

예제

```javascript
interface Todo {
  title: string;
}
 
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
 
todo.title = "Hello"; // Cannot assign to 'title' because it is a read-only property.
```

- 런타임에 실패할 할당 표현식을 표현할 때 유용하다. -> ex) frozen 객체 의 프로퍼티에 재할당하려고 하는 경우
- `Object.freeze` (객체 동결 메서드)
  - `function freeze<Type>(obj: Type): Readonly<Type>;`

## `Record<Keys,Type>`

- 타입 `Type`의 프로퍼티 키의 집합으로 타입 생성
- 타입의 프로퍼티를 다른 타입에 매핑 시키는 데 사용될 수 있음

예제

```javascript
interface PageInfo {
  title: string;
}
 
type Page = "home" | "about" | "contact";
 
const nav: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
 
nav.about; // const nav: Record<Page, PageInfo>
```

## `Pick<Type, Keys>`

- `Type`에서 프로퍼티 `Keys`의 집합을 선택해 타입 생성

예제

```javascript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
 
todo; // const todo: TodoPreview
```

## `Omit<Type, Keys>`

- `Type`에서 모든 프로퍼티를 선택, 키를 제거한 타입 생성

예제

```javascript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Omit<Todo, "description">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

todo; // const todo: TodoPreview
```

## `Exclude<Type, ExcludedUnion>`

- `ExcludedUnion`에 할당할 수 있는 모든 유니온 멤버를 `Type`에서 제외, 타입 생성

예제

```javascript
type T0 = Exclude<"a" | "b" | "c", "a">; // type T0 = "b" | "c"
     

type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // type T1 = "c"
     

type T2 = Exclude<string | number | (() => void), Function>; // type T2 = string | number
```

## `Extract<Type, Union>`

- `Union`에 할당할 수 있는 모든 유니온 멤버를 `Type`에서 가져와서 타입 생성

예제

```javascript
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // type T0 = "a"
type T1 = Extract<string | number | (() => void), Function>; // type T1 = () => void
```

## `NonNullable<Type>`

- `Type`에서 `null`과 정의되지 않은 것(`undefined`)을 제외하고 타입 생성

예제

```javascript
type T0 = NonNullable<string | number | undefined>; // type T0 = string | number
type T1 = NonNullable<string[] | null | undefined>; // type T1 = string[]
```

## `Parameters<Type>`

- 함수 타입 `Type`의 매개변수에 사용된 타입에서 튜플 타입 생성

예제

```javascript
declare function f1(arg: { a: number; b: string }): void;
 
type T0 = Parameters<() => string>; // type T0 = []
type T1 = Parameters<(s: string) => void>; // type T1 = [s: string]
type T2 = Parameters<<T>(arg: T) => T>; // type T2 = [arg: unknown]
type T3 = Parameters<typeof f1>; // type T3 = [arg: { a: number; b: string; }]
type T4 = Parameters<any>; // type T4 = unknown[]
type T5 = Parameters<never>; // type T5 = never
type T6 = Parameters<string>; // Type 'string' does not satisfy the constraint '(...args: any) => any'.
// type T6 = never
type T7 = Parameters<Function>; // Type 'Function' does not satisfy the constraint '(...args: any) => any'. Type 'Function' provides no match for the signature '(...args: any): any'.
//type T7 = never
```

## `ConstructorParameters<Type>`

- 생성자 함수 타입의 타입에서 튜플 또는 배열 타입 생성
- 모든 매개변수 타입을 가지는 튜플 타입(또는 `Type`이 함수가 아닌 경우 타입 `never`)을 생성

예제

```javascript
type T0 = ConstructorParameters<ErrorConstructor>; // type T0 = [message?: string]
type T1 = ConstructorParameters<FunctionConstructor>; // type T1 = string[]
type T2 = ConstructorParameters<RegExpConstructor>; // type T2 = [pattern: string | RegExp, flags?: string]
type T3 = ConstructorParameters<any>; // type T3 = unknown[]
type T4 = ConstructorParameters<Function>; // Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'. Type 'Function' provides no match for the signature 'new (...args: any): any'.
// type T4 = never
```

## `ReturnType<Type>`

- 함수 `Type`의 반환 타입으로 구성된 타입 생성

예제

```javascript
declare function f1(): { a: number; b: string };
 
type T0 = ReturnType<() => string>; // type T0 = string
type T1 = ReturnType<(s: string) => void>; // type T1 = void
type T2 = ReturnType<<T>() => T>; // type T2 = unknown
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // type T3 = number[]
type T4 = ReturnType<typeof f1>; // type T4 = { a: number; b: string; }
type T5 = ReturnType<any>; // type T5 = any
type T6 = ReturnType<never>; // type T6 = never
type T7 = ReturnType<string>; // Type 'string' does not satisfy the constraint '(...args: any) => any'.
// type T7 = any
type T8 = ReturnType<Function>; // Type 'Function' does not satisfy the constraint '(...args: any) => any'. Type 'Function' provides no match for the signature '(...args: any): any'.
// type T8 = any
```

## `InstanceType<Type>`

- `Type`의 생성자 함수의 인스턴스 타입으로 구성된 타입 생성

예제

```javascript
class C {
  x = 0;
  y = 0;
}
 
type T0 = InstanceType<typeof C>; // type T0 = C
type T1 = InstanceType<any>; // type T1 = any
type T2 = InstanceType<never>; // type T2 = never
type T3 = InstanceType<string>; // Type 'string' does not satisfy the constraint 'abstract new (...args: any) => any'.
//type T3 = any
type T4 = InstanceType<Function>; // Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'. Type 'Function' provides no match for the signature 'new (...args: any): any'.
// type T4 = any
```

## `ThisParameterType<Type>`

- 함수 타입의 `this` 매개변수의 타입, 또는 함수 타입에 `this` 매개변수가 없을 경우 `unknown` 추출

예제

```javascript
function toHex(this: Number) {
  return this.toString(16);
}
 
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
```

## `OmitThisParameter<Type>`

- `Type`에서 `this` 매개변수 제거
- `Type`에 명시적으로 선언된 `this` 매개변수가 없는 경우에, 단순히 `Type`
- 반면에, `this` 매개변수가 없는 새로운 함수 타입은 `Type`에서 생성됨. 제네릭은 사라지고 마지막 오버로드 시그니처만 새로운 함수 타입으로 전파됨

예제

```javascript
function toHex(this: Number) {
  return this.toString(16);
}
 
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
 
console.log(fiveToHex());
```

## `ThisType<Type>`

- 이 유틸리티는 변형된 타입을 반환하지 않고 대신에, 문맥적 this 타입에 표시하는 역할을 함
- 이 유틸리티를 사용하기 위해서는 `--noImplicitThis` 플래그를 사용해야 함

예제

```javascript
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};
 
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}
 
let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});
 
obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
```

- `makeObject`의 인수 `methods` 객체는 `ThisType<D & M>` 을 포함한 문맥적 타입을 가짐
  - -> `methods` 객체의 메서드 안에 `this` 타입은 `{ x: number, y: number } & { moveBy(dx: number, dy: number): number }` 임
- `methods` 프로퍼티의 타입은 추론 대상인 동시에 메서드의 `this` 타입의 출처임
- `ThisType<T>` 마커 인터페이스는 단지 lib.d.ts에 선언된 빈 인터페이스
  - 객체 리터럴의 문맥적 타입으로 인식되는 것을 넘어, 인터페이스는 빈 인터페이스처럼 동작함

## 내장 문자열 조작 타입

타입스크립트는 템플릿 문자열 리터럴에서의 문자열 조작을 돕기 위해 타입 시스템 내에서 문자열 조작에 사용할 수 있는 타입 집합을 포함함

`Uppercase<StringType>`

`Lowercase<StringType>`

`Capitalize<StringType>`

`Uncapitalize<StringType>`
