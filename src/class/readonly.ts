class ReadonlyAnimal {
    readonly name: string;
    constructor(n: string) {
        this.name = n;
    }
}
let dog = new ReadonlyAnimal('Charlie');
console.log(dog.name); // Charlie
dog.name = 'Tiger'; // Error - TS2540: Cannot assign to 'name' because it is a read-only property.