interface IAnimal {
    name: string
}
interface IQuack extends IAnimal {
    quack(): string
}

class Quack implements IQuack { // Error - TS2420: Class 'Cat' incorrectly implements interface 'ICat'. Property 'name' is missing in type 'Cat' but required in type 'ICat'.
    name: string;
    constructor (name: string) {
        this.name = name;
    }
    
    quack() {
        return 'MEOW~';
    }
}

interface IFullName {
    firstName: string,
    lastName: string
}
interface IFullName {
    middleName: string
}

const fullName: IFullName = {
    firstName: 'Tomas',
    middleName: 'Sean',
    lastName: 'Connery'
};