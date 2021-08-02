// 만약 클래스의 메소드 멤버를 정의하는 경우, 프로토타입(Prototype) 메서드가 아닌 화살표 함수를 사용할 수 있다.

class Person {
    constructor(private name: string) {}
    getName = () => {
        console.log(this.name);
    }
}
const person = new Person('Lucy');
person.getName(); // Lucy

const getName = person.getName;
getName(); // Lucy

function somePersonFn(cb: any) {
    cb();
}
somePersonFn(person.getName); // Lucy