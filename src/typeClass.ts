interface FullName {
    firstName: string,
    lastName: string
}
interface FullNameConstructor {
    new(firstName: string): FullName; // Construct signature
}


function makeSon(c: FullNameConstructor, firstName: string) {
    return new c(firstName);
}
function getFullName(son: FullName) {
    return `${son.firstName} ${son.lastName}`;
}


// Anderson family
class Anderson implements FullName {
    public lastName: string;
    constructor (public firstName: string) {
        this.lastName = 'Anderson';
        console.log(this.firstName);
    }
}
const tomas = makeSon(Anderson, 'Tomas');
const jack = makeSon(Anderson, 'Jack');
console.log(getFullName(tomas)); // Tomas Anderson
console.log(getFullName(jack)); // Jack Anderson


//   // Smith family?
//   class Smith implements FullName {
//     public lastName: string;
//     constructor (public firstName: string, agentCode: number) {
//       this.lastName = `Smith ${agentCode}`;
//     }
//   }
//   const smith = makeSon(Smith, 7); // Error - TS2345: Argument of type 'typeof Smith' is not assignable to parameter of type 'FullNameConstructor'.
//   getFullName(smith);