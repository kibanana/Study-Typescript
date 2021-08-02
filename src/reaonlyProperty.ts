// All readonly properties
// interface IUser {
//   readonly name: string,
//   readonly age: number
// }
// let user: IUser = {
//   name: 'Neo',
//   age: 36
// };
// user.age = 85; // Error
// user.name = 'Evan'; // Error


// Readonly Utility
interface IUser {
  name: string,
  age: number
}
let readonlyUser: Readonly<IUser> = {
  name: 'Neo',
  age: 36
};
// readonlyUser.age = 85; // Error
// readonlyUser.name = 'Evan'; // Error


// Type assertion
let readonlyUser2 = {
  name: 'Neo',
  age: 36
} as const;
// readonlyUser2.age = 85; // Error
// readonlyUser2.name = 'Evan'; // Error