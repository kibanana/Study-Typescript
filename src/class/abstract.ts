// Abstract Class
abstract class AbstractAnimal1 {
    abstract name: string; // 파생된 클래스에서 구현해야 합니다.
    abstract getName(): string; // 파생된 클래스에서 구현해야 합니다.
}
class Chicken extends AbstractAnimal1 {
    constructor(public name: string) {
        super();
    }
    getName() {
        return this.name;
    }
}
new AbstractAnimal1(); // Error - TS2511: Cannot create an instance of an abstract class.
const chicken = new Chicken('Lucy');
console.log(chicken.getName()); // Lucy

// Interface
interface IAnimal {
    name: string;
    getName(): string;
}
class Dog implements IAnimal {
    constructor(public name: string) {}
    getName() {
        return this.name;
    }
}

abstract class AbstractAnimal2 {
    abstract name: string;
    abstract getName(): string;
    // Abstract class constructor can be made protected.
    protected constructor(public legs: string) {}
    getLegs() {
        return this.legs
    }
}