class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
class Cow extends Animal {
    getName(): string {
        return `Cow name is ${this.name}.`;
    }
}
let cow: Cow;
cow = new Cow('Lucy');
console.log(cow.getName()); // Cow name is Lucy.