# Variable Declaration (변수 선언)

- `let`, `const`는 자바스크립트에서 비교적 새로운 두 가지 유형의 변수 선언이다.
- `let`은 `var`와 어느 정도 유사하지만 사용자가 자바스크립트에서 자주 마주치는 결함을 피할 수 있게 해준다.
- `const`는 `let`의 기능이 강화된 것으로 변수에 재할당을 방지한다.

타입스크립트는 자바스크립트의 상위 집합이므로 당연히 `let`과 `const`를 지원한다. 여기서는 새로운 선언 방식들과 왜 그 방식들이 `var`보다 선호되는지 더 자세히 설명한다.

## `var` 선언

기존 자바스크립트에서는 변수 선언을 할 때 `var` 키워드를 사용했다.

```javascript
var a = 10;

function f() {
    var message = "Hello, world!";
    return message;
}
```

```javascript
function f() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    }
}
var g = f(); // g는 f 안에 선언된 a를 잡아둔다. 언제든 g가 호출될 때 a의 값은 f 안의 a 값을 가리킨다. f가 실행되면서 g가 한 번 호출된 후에도 a에 접근해 수정할 수 있다.
g(); // '11'을 반환
```

```javascript
function f() {
    var a = 1;
    a = 2;
    var b = g();
    a = 3;
    return b;
    function g() {
        return a;
    }
}
f(); // '2' 반환
```

## 스코프 규칙

`var` 선언은 다른 언어와 다른 이상한 스코프 규칙들을 가지고 있다.

`var` 선언은 이를 감싸고 있는 블록과 관계없이 이를 감싸고 있는 함수, 모듈, 네임스페이스, 전역 스코프에서 접근할 수 있다. 어떤 이는 이를 var-스코프 혹은 함수 스코프라고 부른다. 매개 변수 또한 함수 스코프다.

이런 스코프 규칙은 몇 가지 실수를 유발할 수 있으며, 더욱 심각한 것은 변수를 여러 번 선언하는 것이 에러가 아니라는 것이다.

```javascript
function f(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }
    return x;
}
f(true);  // '10' 반환
f(false); // 'undefined' 반환

function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) { // var i
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) { // var i
            sum += currentRow[i];
        }
    }
    return sum;
}
```

i가 같은 함수 스코프의 변수를 참고하고 있기 때문에 for-loop 안에서 실수로 변수 i를 덮어쓸 수도 있다. 경험 많은 개발자는 바로 알아차리겠지만, 비슷한 종류의 버그는 코드 리뷰를 거치며 좌절의 원인이 되기도 한다.

## 변수 캡쳐링의 단점

```javascript
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
```

출력결과:

```javascript
10
10
10
10
10
10
10
10
10
10
```

`setTimeout`에 전달하는 모든 함수 표현식은 사실 같은 스코프에서 `i`를 참조한다.

`setTime`은 함수를 몇 밀리 초 후에 실행시키겠지만, 항상 for-loop가 실행을 멈추고 난 뒤에 실행된다. for-loop가 실행을 중지했을 때 `i`의 값은 10이다. 따라서 매번 주어진 함수가 호출될 때마다 `10`을 출력할 것이다.

-> 즉시 실행 함수(IIFE - an Immediately Invoked Function Expression)를 사용해 매 반복마다 `i`를 잡아두면 된다.

```javascript
for (var i = 0; i < 10; i++) {
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}
```

이 이상해 보이는 패턴이 사실 일반적인 패턴이다. 매개변수에 `i`가 for-loop의 `i`를 감춰버린다. 하지만 이름을 같게 했기 때문에 루프의 실행부를 크게 수정할 필요가 없다.

## `let` 선언

위에서 말한 `var`의 문제점 때문에 `let`을 도입하게 되었다. 사용방법은 동일하다. 주요한 차이점은 구문보단 의미에 있다.

### 블록 스코프

변수가 `let`을 이용해 선언되었을 때, 이는 렉시컬 스코핑(lexical-scoping) 혹은 블록 스코핑(block-scoping)이라 불리는 것을 사용한다. `var`로 선언된 변수가 이를 포함한 함수까지 흘러나오는 것과 달리, 블록 스코프 변수들은 이ㄹ르 가장 가깝게 감싸고 있는 블록 밖에서 접근할 수 없다.

```javascript
function f(input: boolean) {
    let a = 100;
    if (input) {
        // 'a'를 참조 가능
        let b = a + 1;
        return b;
    }
    // 오류: 'b'는 여기서 존재하지 않음
    return b;
}
```

if 문, catch 문에 선언된 변수 또한 비슷한 스코프 규칙을 가진다.

```javascript
try {
    throw "oh no!";
}
catch (e) {
    console.log("Oh well.");
}
// 오류: 'e'는 여기서 존재하지 않음
console.log(e);
```

블록 스코프 변수의 또 다른 특징은 변수들이 선언되기 전에 읽거나 쓰는 것이 불가능하다는 것이다. 이 변수들은 스코프에 걸쳐 존재하지만, 선언되는 부분 전까지 모든 부분들이 `temploral dead zone`이다. 이것은 `let`문 이전에 변수들에 접근할 수 없다는 정교한 방식이며, 다행히 타입스크립트가 알려준다.

주의할 점은 여전히 선언되기 전에 블록 스코프 변수를 잡아둘 수 있다는 것이다. 선언되기 전에 함수를 실행하는 것이 안된다는 것만 알아두면 된다. ES2015를 대상으로 하는 최신 런타임은 오류를 던지겠지만, 현재 타입스크립트에서는 허용되며 오류를 보고하지도 않는다.

```javascript
function foo() {
    // 'a' 캡처는 성공
    return a;
}
// `a`가 선언되기 전에 `foo` 를 호출
// 런타임에 오류를 던질 것임
foo();
let a;
```

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let]

## 재선언과 섀도잉

- `var`로 선언하면 얼마나 변수를 많이 선언하는지는 중요하지 않고, 단 하나만 생성된다.
- `let` 선언은 같은 스코프에서 변수를 단 한 번만 선언하도록 한다.
- `let` 선언 시 타입스크립트가 이 문제를 알려주기 때문에 변수를 반드시 블록 범위로 지정할 필요는 없다.

```javascript
function f(x) {
    let x = 100; // 오류: 매개 변수 선언을 방해합니다.
}
function g() {
    let x = 100;
    var x = 100; // 오류: `x`를 중복해서 선언할 수 없습니다.
}
```

- 블록 스코프 변수가 함수 스코프 변수로 선언될 수 없다는 것은 아니다. 단지 블록 스코프 변수는 별개의 다른 블록에 선언되어야 한다.

```javascript
function f(condition, x) {
    if (condition) {
        let x = 100;
        return x;
    }
    return x;
}
f(false, 0); // '0' 반환
f(true, 0);  // '100' 반환
```

```javascript
function sumMatrix(matrix: number[][]) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
    return sum;
}
```

- 더 중첩된 스코프에서 바깥 스코프의 변수 이름을 사용하는 것을 섀도잉이라고 한다. 섀도잉은 양날의 검이라고 할 수 있는데, 이는 실수가 되어 특정 버그를 일으키거나, 혹은 특정 버그를 막기 위해 쓰이기 때문이다.
- 보통 더 명확한 코드를 작성하기 위해 섀도잉 사용을 피한다. 하지만 섀도잉의 이점을 활용할 수 있는 적합한 상황도 있으므로 때에 따라 최선의 판단을 내려야 한다.

## 블록 스코프 변수 캡쳐링

- `var` 선언에서 변수 챕쳐링하는 것을 보았을 때 변수 캡쳐링이 어떻게 동작하는지 간단히 살펴봤다.
- 스코프가 각각 실행될 때마다 변수의 **환경**을 만든다. 변수의 환경과 캡쳐된 변수들은 심지어 스코프가 포함한 모든 것이 실행을 종료한 후에도 존재한다.

```javascript
function theCityThatAlwaysSleeps() {
    let getCity;
    if (true) {
        let city = "Seattle";
        getCity = function() {
            return city;
        }
    }
    return getCity();
}
```

- `city`를 해당 환경 안에 캡쳐했기 때문에 if 블록 실행이 완료돼도 여전히 `city`에 접근할 수 있다.
- 앞의 `setTimeout` 예제에서는 for-loop가 매번 반복될 때마다 변수를 캡쳐하기 위해서 IIFE를 사용했지만 실제론, 캡처된 변수를 위해 새로운 변수 환경을 만드는 것이다. 이는 약간 힘든 일이지만, 다행히도 타입스크립트에서는 그렇게 할 필요가 없다.
- `let` 선언은 루프의 일부로 선언할 때 동작이 크게 다르다. 이 선언은 루프 자체에 새로운 환경을 만드는 대신 반복마다 새로운 환경을 만들어낸다. 이전 `setTimeout` + IIFE 예제를 `let` 선언만 사용해서 바꿀 수 있다.

```javascript
for (let i = 0; i < 10 ; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
```

출력 결과:

```javascript
0
1
2
3
4
5
6
7
8
9
```

## `const` 선언

- `const` 선언은 변수를 선언하는 또 다른 방법이다.
- 이 방법은 `let` 선언과 비슷하지만 일단 바인딩되면 값을 변경할 수 없다.
- 다르게 말하면, `const`는 `let`과 같은 스코프 규칙을 가지고 있지만 재할당할 수 없다.
- 이를 `const`가 참조하는 값이 **불변**이라고 혼동하면 안된다.

```javascript
const numLivesForCat = 9;
const kitty = {
    name: "Aurora",
    numLives: numLivesForCat,
}
// 오류
kitty = {
    name: "Danielle",
    numLives: numLivesForCat
};
// 모두 "성공"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;
```

- 위와 같은 상황을 피하기 위해 특별한 조치를 취하지 않는 한, `const` 변수의 내부 상태는 여전히 수정 가능하다.
- 타입스크립트를 사용하면 객체의 멤버를 읽기 전용(readonly)으로 지정할 수 있다.

## `let` vs `const`

- 두 가지 유형의 변수 선언 중 무엇을 사용하느냐는 때에 따라 다르다.
- **최소 권한의 원칙**을 적용하려면, 수정하려는 선언 이외에 모든 선언은 `const`를 사용해야 한다.
  - 그 이유는, 만약 변수가 수정될 필요가 없다면 같은 코드베이스에서는 작업하는 다른 사람들이 자동으로 객체를 수정할 수 없어야 하고, 그들이 정말 변수에 재할당할 필요가 있는지 고려할 필요가 있다. 이 때 `const`를 사용하는 것은 데이터의 흐름을 추론할 때 코드를 더 예측하기 쉽게 해준다.

## 구조 분해

타입스크립트가 가진 또 다른 ECMAScript 2015 특징은 구조 분해다.

1. 배열 구조 분해 (Array destructuring)

    ```javascript
    let input = [1, 2];
    let [first, second] = input;
    console.log(first); // 1 출력
    console.log(second); // 2 출력

    // 아래와 같이 인덱싱을 사용하는 것과 동일하지만 더 편리함
    first = input[0];
    second = input[1];
    ```

    - 구조 분해 할당은 이미 선언된 변수에도 동작한다.

        ```javascript
        let input = [1, 2];
        let [first, second] = input;
        console.log(first); // 1 출력
        console.log(second); // 2 출력

        // 아래와 같이 인덱싱을 사용하는 것과 동일하지만 더 편리함
        first = input[0];
        second = input[1];
        ```

    - 구조 분해 할당은 함수의 매개변수에도 동작한다.

        ```javascript
        function f([first, second]: [number, number]) {
            console.log(first);
            console.log(second);
        }
        f([1, 2]);
        ```

    - 나머지 요소들에 대해 `...` 구문을 사용하여 변수를 생성할 수 있다.

        ```javascript
        let [first, ...rest] = [1, 2, 3, 4];
        console.log(first); // 1 출력
        console.log(rest); // [ 2, 3, 4 ] 출력
        ```

    - 자바스크립트이기 때문에 필요하지 않은, 뒤따라 오는 요소들을 무시할 수 있으며 그 밖의 요소들도 무시할 수 있다.

        ```javascript
        let [first] = [1, 2, 3, 4];
        console.log(first); // 1 출력

        let [, second, , fourth] = [1, 2, 3, 4];
        console.log(second); // 2 출력
        console.log(fourth); // 4 출력
        ```

2. 튜플 구조 분해 (Tuple destructuring)

    1. 튜플은 배열처럼 구조 분해된다. 구조 분해된 변수는 튜플 요소와 일치하는 타입을 얻게 된다.
    2. 튜플의 범위를 넘어선 구조 분해는 오류다.
    3. 배열과 마찬가지로 더 짧은 튜플을 얻기 위해 `...`로 튜플의 나머지를 구조분해할 수 있다.
    4. 뒤따라 오는 요소나 다른 요소를 무시할 수 있다.

    ```javascript
    let tuple: [number, string, boolean] = [7, "hello", true];

    // 1
    let [a, b, c] = tuple; // a: number, b: string, c: boolean

    // 2
    let [a, b, c, d] = tuple; // 오류, 인덱스 3에 요소가 없습니다.

    // 3
    let [a, ...bc] = tuple; // bc: [string, boolean]
    let [a, b, c, ...d] = tuple; // d: [], 비어있는 튜플

    // 4
    let [a] = tuple; // a: number
    let [, b] = tuple; // b: string
    ```

3. 객체 구조 분해 (Object destructuring)

    ```javascript
    let o = {
        a: "foo",
        b: 12,
        c: "bar"
    };

    let { a, b } = o;
    ```

    - 객체 분해는 배열 구조 분해처럼 선언 없이 할당할 수 있다. 해당 구문을 괄호로 감싸고 있다는 것에 주의한다.

        ```javascript
        ({ a, b } = { a: "baz", b: 101 });
        ```

    - 객체 안에 나머지 요소들을 `...` 구문을 사용하여 변수로 생성할 수 있다.

        ```javascript
        let { a, ...passthrough } = o;
        let total = passthrough.b + passthrough.c.length;
        ```

    - **프로퍼티 이름 바꾸기 (Property renaming)**

        ```javascript
        //
        let { a: newName1, b: newName2 } = o;

        //
        let newName1 = o.a;
        let newName2 = o.b;

        // 타입 지정(전체 구조 분해 뒤에 작성해야 함)
        let { a, b }: { a: string, b: number } = o;
        ```

    - **기본 값 (Default values)**

        ```javascript
        function keepWholeObject(wholeObject: { a: string, b?: number }) { // b는 선택적(= undefined일 수도 있음)
            let { a, b = 1001 } = wholeObject;
        }
        ```

4. 함수 선언 (Function declarations)

    ```javascript
    type C = { a: string, b?: number } // 선택적 프로퍼티 사용
    function f({ a, b }: C): void {
        // ...
    }

    // 기본값 명시
    function f({ a="", b=0 } = {}): void {
        // ...
    }
    f();

    // 선택적 프로퍼티를 위해 기본 초기화 대신 구조 분해될 프로퍼티에 기본 값을 주어야 한다는 걸 기억해야 한다.
    function f({ a, b = 0 } = { a: "" }): void {
        // ...
    }
    f({ a: "yes" }); // 성공, 기본값으로 b = 0 입니다.
    f(); // 성공, 기본 값은 { a: "" } 이고 b = 0 입니다.
    f({}); // 오류, 매개 변수가 주어지면 `a`가 필요합니다.
    ```

5. 전개 (Spread)

    전개 연산자는 구조 분해와 반대다. 이는 배열을 다른 배열 안에, 혹은 객체를 다른 객체 안에 전개하도록 해준다.

    ```javascript
    let first = [1, 2];
    let second = [3, 4];
    let bothPlus = [0, ...first, ...second, 5]; // [0, 1, 2, 3, 4, 5]
    ```

    전개는 얕은 복사를 만든다. 이들은 전개에 의해 변하지 않는다.

    객체 전개:

    ```javascript
    let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
    let search = { ...defaults, food: "rich" }; //  food: "rich", price: "$$", ambiance: "noisy" }
    ```

    객체 전개는 배열 전개보다 훨씬 복잡하다. 배열 전개처럼 왼쪽에서 오른쪽으로 진행되지만 그 결과는 여전히 객체다. 이는 전개 전개 객체 안에서 나중에 오는 프로퍼티가 이전에 오는 프로퍼티를 덮어쓰는 것을 의미한다.

    ```javascript
    // 이전 예제를 마지막에 전개하도록 수정

    let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
    let search = { food: "rich", ...defaults }; // { food: "spicy", ... }
    ```

    객체 전개는 놀라운 제한점이 몇 개 있다.

    1. 이는 오직 객체 본인의 열거 가능한 프로퍼티만 해당한다. 기본적으로 이는 객체의 인스턴스를 전개하면 메서드를 잃게 된다는 것을 뜻한다.
    2. 타입스크립트 컴파일러는 제네릭 함수에서 타입 매개변수를 전개하는 것을 허용하지 않는다. 이후 버전에서 추가될 것이라 예상되는 기능이다.

        ```javascript
        class C {
            p = 12;
            m() {
            }
        }
        let c = new C();
        let clone = { ...c };
        clone.p; // 성공
        clone.m(); // 오류!
        ```

    
    defaults안에 food 프로퍼티는 food: "rich"를 덮어쓰는데, 이 경우 우리가 의도한 것은 아닙니다.

    객체 전개는 또한 몇몇의 놀라운 제한점이 잇습니다. 첫째로, 이는 오직 객체 본인의 열거 가능한 프로퍼티만 해당한다는 것입니다. 기본적으로, 이는 객체의 인스턴스를 전개하면 메서드를 잃게 된다는 것을 뜻합니다:

    
    두 번째로, TypeScript 컴파일러는 제네릭 함수에서 타입 매개변수를 전개하는 것을 허용하지 않습니다. 이 기능은 이후 버전에서 예상되는 기능입니다.