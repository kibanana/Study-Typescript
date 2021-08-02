interface UnionGenericType<T extends string | number> {
    name: string,
    value: T
}

const dataA: UnionGenericType<string> = {
    name: 'Data A',
    value: 'Hello world'
};
const dataB: UnionGenericType<number> = {
    name: 'Data B',
    value: 1234
};
// const dataC: UnionGenericType<boolean> = { // TS2344: Type 'boolean' does not satisfy the constraint 'string | number'.
//     name: 'Data C',
//     value: true
// };
// const dataD: UnionGenericType<number[]> = { // TS2344: Type 'number[]' does not satisfy the constraint 'string | number'.
//     name: 'Data D',
//     value: [1, 2, 3, 4]
// };

function merge<T extends object, U extends object>(a: T, b: U) {
    return {
        ...a,
        ...b,
    };
}
const person1 = merge(
    { name: 'A' },
    { age: 20 },
);
// const person2 = merge( // Error
//     { name: 'A' },
//     20,
// );

type U = number | boolean;

// type 식별자 = 타입 구현
type ConstraintsGenericType1<T extends U> = string | T; // T를 U인 number, boolean으로 제한

// interface 식별자 { 타입 구현 }
interface ConstraintsGenericType2<T extends U> {
  name: string,
  age: T
}

const a: ConstraintsGenericType1<number> = 1;
const b: ConstraintsGenericType1<boolean> = 'a';
const c: ConstraintsGenericType1<boolean> = 'b';