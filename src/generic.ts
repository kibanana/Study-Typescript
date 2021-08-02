// only number type
function toArrayNumber(a: number, b: number): number[] {
    return [a, b];
}
toArrayNumber(1, 2);
//   toArray('1', '2'); // Error - TS2345: Argument of type '"1"' is not assignable to parameter of type 'number'.

// union type
function toArrayUnion(a: number | string, b: number | string): (number | string)[] {
    return [a, b];
}
toArrayUnion(1, 2); // Only Number
toArrayUnion('1', '2'); // Only String
toArrayUnion(1, '2'); // Number & String

// generic -> <T> -> T는 타입 변수(Type variable)로, 사용자가 제공한 타입으로 변환될 식별자
function toArray<T>(a: T, b: T): T[] {
    return [a, b];
}

toArray<number>(1, 2);
toArray<string>('1', '2');
toArray<string | number>(1, '2');
// toArray<number>(1, '2'); // Error

function toArrayInference<T>(a: T, b: T): T[] {
    return [a, b];
}

toArrayInference(1, 2);
toArrayInference('1', '2');
// toArrayInference(1, '2'); // Error