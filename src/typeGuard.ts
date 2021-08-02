function isNumber(val: string | number): val is number {
    return typeof val === 'number';
}

function someGuardFunc(val: string | number) {
    if (isNumber(val)) {
        val.toFixed(2);
        isNaN(val);
    } else {
        val.split('');
        val.toUpperCase();
        val.length;
    }
}

// 기존 예제와 같이 `isNumber`를 제공(추상화)하지 않아도 `typeof` 연산자를 직접 사용하면 타입 가드로 동작합니다.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/typeof
function someGuardFuncTypeof(val: string | number) {
    if (typeof val === 'number') {
        val.toFixed(2);
        isNaN(val);
    } else {
        val.split('');
        val.toUpperCase();
        val.length;
    }
}

// 별도의 추상화 없이 `in` 연산자를 사용해 타입 가드를 제공합니다.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/in
function someGuardFuncIn(val: any) {
    if ('toFixed' in val) {
        val.toFixed(2);
        isNaN(val);
    } else if ('split' in val) {
        val.split('');
        val.toUpperCase();
        val.length;
    }
}

// 역시 별도의 추상화 없이 `instanceof` 연산자를 사용해 타입 가드를 제공합니다.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/instanceof
class Cat {
    meow() {}
}
class Dog {
    woof() {}
}
function sounds(ani: Cat | Dog) {
    if (ani instanceof Cat) {
        ani.meow();
    } else {
        ani.woof();
    }
}