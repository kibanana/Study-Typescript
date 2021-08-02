type MyType = string;
type YourType = string | number | boolean;
type TUser = {
    name: string,
    age: number,
    isValid: boolean
} | [string, number, boolean];

let userA: TUser = {
    name: 'Neo',
    age: 85,
    isValid: true
};
let userB: TUser = ['Evan', 36, false];

function someFunc(arg: MyType): YourType {
    switch (arg) {
        case 's':
            return arg.toString(); // string
        case 'n':
            return parseInt(arg); // number
        default:
            return true; // boolean
    }
}