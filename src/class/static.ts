class StaticCat {
    static legs: number;
    constructor() {
        StaticCat.legs = 4; // Init static property.
    }
}
console.log(StaticCat.legs); // undefined
new StaticCat();
console.log(StaticCat.legs); // 4

class StaticDog {
    // Init static method.
    static getLegs() {
        return 4;
    }
}
console.log(StaticDog.getLegs()); // 4