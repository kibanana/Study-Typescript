interface IItem1 {
    [itemIndex: number]: string // Index signature
}
let item1: IItem1 = ['a', 'b', 'c']; // Indexable type
console.log(item1[0]); // 'a' is string.
console.log(item1[1]); // 'b' is string.
// console.log(item1['0']); // Error - TS7015: Element implicitly has an 'any' type because index expression is not of type 'number'.

interface IItem2 {
    [itemIndex: number]: string | boolean | number[]
}
let item2: IItem2 = ['Hello', false, [1, 2, 3]];
console.log(item2[0]); // Hello
console.log(item2[1]); // false
console.log(item2[2]); // [1, 2, 3]

interface IIndexableUser {
    [userProp: string]: string | boolean
}
let indexableUser: IIndexableUser = {
    name: 'Neo',
    email: 'thesecon@gmail.com',
    isValid: true,
    0: false
};
console.log(indexableUser['name']); // 'Neo' is string.
console.log(indexableUser['email']); // 'thesecon@gmail.com' is string.
console.log(indexableUser['isValid']); // true is boolean.
console.log(indexableUser[0]); // false is boolean
console.log(indexableUser[1]); // undefined
console.log(indexableUser['0']); // false is boolean

interface IIndexableUser2 {
    [userProp: string]: string | number
    name: string,
    age: number
}
let indexableUser2: IIndexableUser2 = {
    name: 'Neo',
    age: 123,
    email: 'thesecon@gmail.com',
    // isAdult: true // Error - TS2322: Type 'true' is not assignable to type 'string | number'.
};
console.log(indexableUser2['name']); // 'Neo'
console.log(indexableUser2['age']); // 123
console.log(indexableUser2['email']); // thesecon@gmail.com

interface ICountries1 {
    KR: '대한민국',
    US: '미국',
    CP: '중국'
}
let country1: keyof ICountries1; // 'KR' | 'US' | 'CP'
country1 = 'KR'; // ok
// country1 = 'RU'; // Error - TS2322: Type '"RU"' is not assignable to type '"KR" | "US" | "CP"'.

interface ICountries2 {
    KR: '대한민국',
    US: '미국',
    CP: '중국'
}
let country2: ICountries2[keyof ICountries2]; // ICountries['KR' | 'US' | 'CP']
country2 = '대한민국';
// country2 = '러시아'; // Error - TS2322: Type '"러시아"' is not assignable to type '"대한민국" | "미국" | "중국"'.