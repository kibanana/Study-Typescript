# Type Inference (타입 추론)

- 타입스크립트에는 명시적인 타입 표기가 없을 때 타입 정보를 제공하기 위해 타입 추론이 사용되는 여러 위치가 있다.

    ```typescript
    let x = 3; // let x: number
    ```

    `x` 변수의 타입은 `number`로 추론된다. 이러한 종류의 추론은 변수와 멤버를 초기화하고 매개변수 기본값을 설정하며, 함수 반환 타입을 결정할 때 발생한다.

## 최적 공통 타입

여러 표현 식에서 타입을 추론할 때, 표현식들의 타입을 이용해 **최적 공통 타입**을 계산한다.

```typescript
let x = [0, 1, null]; // let x: (number | null)[]
```

위의 예에서 `x`의 타입을 추론하려면 각 배열 요소의 타입들을 고려해야 한다. 여기서 배열 타입에 대해 이 두 가지 `number`, `null` 선택 사항을 제공한다. 가장 일반적인 타입 알고리즘은 각 후보 타입을 고려해서 다른 모든 후보와 호환되는 타입을 결정한다.

제공된 후보 타입에서 최적의 공통 타입을 선택해야하므로 타입이 공통적인 구조를 공유하지만, 한 타입이 모든 후보 타입의 슈퍼 타입이 아닐 수 있다.

```typescript
let zoo = [new Rhino(), new Elephant(), new Snake()]; // let zoo: (Rhino | Elephant | Snake)[]
```

이상적으로는 `zoo`가 `Animal[]`로 추론되기를 원할 수 있다. 하지만 배열에 `Animal` 타입의 객체가 없으므로 엄격하게 판단하여 배열 요소 타입으로 추론하지 않는다. 이를 수정하려면 한 타입이 다른 모든 후보의 상위 타입이 아닌 경우 유형을 명시적으로 제공해야 한다.

```typescript
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
```

## 문맥상 타이핑

- 타입스크립트의 타입 추론은 때에 따라 다른 방향에서도 작동한다. 이를 **문맥상 타이핑**이라고 한다.
- 문맥상 타이핑은 표현식의 타입이 위치에 의해 암시될 때 발생한다.

```typescript
window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button); //<- OK
  console.log(mouseEvent.kangaroo); //<- Error!
};

```

여기서 타입스크립트 타입 검사기는 `Window.onmousedown` 함수의 타입을 사용하여 오른쪽에 할당된 함수 표현식의 타입을 추론했다.

```typescript
window.onscroll = function (uiEvent) {
  console.log(uiEvent.button); //<- Error!
};
```

위의 함수가 `Window.onscroll`에 할당된다는 사실을 바탕으로 타입스크립트는 `uiEvent`가 이전 예제와 같은 `MouseEvent`가 아니라 `UIEvent`임을 알고있다. 이 객체에는 `button` 프로퍼티가 없으므로 타입스크립트에서 오류가 발생한다.

이 함수가 컨텍스트 타입 위치에 있지 않았을 때 함수는 암시적으로 `any` 타입을 가지며 오류가 발생하지 않는다(`--noImplicitAny` 옵션을 사용하지 않을 시에).

```typescript
const handler = function (uiEvent) {
  console.log(uiEvent.button); //<- OK
};
```

또한 함수의 인수에 타입 정보를 명시적으로 제공해서 컨텍스트 타입을 재정의할 수도 있다.

```typescript
window.onscroll = function (uiEvent: any) {
  console.log(uiEvent.button); //<- Now, no error is given
};
```

그러나 이 코드는 `uiEvent`에 `button` 프로퍼티가 없으므로 `undefined`를 기록한다.

문맥상 타이핑은 많은 경우에 적용된다.
일반적으로는

- 함수 호출에 대한 인수
- 오른쪽에 할당된 것
- 타입 어셜션(assertions)
- 개체 및 배열 리터럴의 멤버
- 반환문

이 포함된다.

컨텍스트 타입은 또한 가장 일반적인 타입에서 후보 타입으로 작동한다.

```typescript
function createZoo(): Animal[] {
  return [new Rhino(), new Elephant(), new Snake()];
}
```

이 예에서 가장 일반적인 타입에는 다음 네 가지의 후보가 있다: `Animal`, `Rhino`, `Elephant`, `Snake`. 이 중 `Animal`을 최적 공통 타입 알고리즘으로 선택할 수 있다.
