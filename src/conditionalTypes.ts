type U2 = string | number | boolean;

// type 식별자 = 타입 구현
type TConditionalType1<T> = T extends U2 ? string : never;

// interface 식별자 { 타입 구현 }
interface IConditionalType1<T> {
    name: string,
    age: T extends U2 ? number : never
}


// `T`는 `boolean` 타입으로 제한.
interface IConditionalType2<T extends boolean> {
    name: string,
    age: T extends true ? string : number, // `T`의 타입이 `true`인 경우 `string` 반환, 아닌 경우 `number` 반환.
    isString: T
}

const conditionalStr: IConditionalType2<true> = {
    name: 'Neo',
    age: '12', // String
    isString: true
}
const conditionalNum: IConditionalType2<false> = {
    name: 'Lewis',
    age: 12, // Number
    isString: false
}


type TConditionalType2<T> =
    T extends string ? 'Str' :
    T extends number ? 'Num' :
    T extends boolean ? 'Boo' :
    T extends undefined ? 'Und' :
    T extends null ? 'Nul' :
    'Obj';
