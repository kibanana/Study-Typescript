// Version 4.0.2 기준 예제
// tsc -v : Version 4.1.5

// i. 타입에 대한 이름 지어주기
interface Person1 {
    name: string;
    age: number;
} // interface 정의는 문장으로 안 친다.

type Person2 = {
    name: string;
    age: number;
};

const p1: Person1 = {
    name: 'a',
    age: 10
};

const p2: Person2 = {
    name: 'b',
    age: 20
};

// ii. (제한적으로) 여러 타입에 대한 관계 정의
// Type Alias와 Interface 둘 다 Interface에 대한 extends와 
// Class에 대한 implements 키워드를 사용하여 관계를 정의할 수 있다.
// -> 여기서 'Class에 대한 implements 키워드'라고 해서 'Class에는 extends 키워드를 쓰는 게 아닌가?' 라고 생각했는데, 타입을 상속할 때에는 implements 키워드를 쓴다.

// 객체 타입이나 객체 타입 간의 곱 타입(Intersection Type, 교차타입), 즉 정적으로 모양을 알 수 있는 객체 타입만 동작한다.
// 따라서 합 타입(Union Type, 결합 타입)은 extends와 implements 대신 다른 키워드로 관계를 정의해야 한다.

type TBase = {
    t: number;
};

interface IBase {
    i: number;
}

// extends
interface T extends TBase {}
interface I extends IBase {}

// implements
class TClass implements TBase {
    constructor(public t: number) {}
}

class IClass implements IBase {
    constructor(public i: number) {}
}

// 곱 타입
type TIntersection = TBase & {
    t2: number;
};

interface I1 extends TIntersection {} // 곱 타입은 상속할 수 있다.

class C1 implements TIntersection { // "
    constructor(public t: number, public t2: number) {}
}

interface I2 extends I1 {} // "

class C2 implements I1 { // "
    constructor(public t: number, public t2: number) {}
}

// 합 타입
type TUnion = TBase | {
    u: number;
}

// interface I3 extends TUnion {} // 합 타입은 상속할 수 없다.
// An interface can only extend an object type or intersection of object types with statically known members.

// class C3 implements TUnion {}
// A class can only implement an object type or intersection of object types with statically known members.

// Type Alias와 Interface의 차이점
// Interface는 선언 병합이 가능하지만, Type Alias는 그렇지 않다.

// 그래서 TypeScript 팀은 가능한 Type Alias보단 Interface를 사용하고, 합 타입 혹은 튜플 타입을 반드시 써야 되는 상황이면 Type Alias를 사용하도록 권장함
// - 팀 레벨 혹은 프로젝트 레벨에서 지정한 컨벤션에 따라 일관성 있게 사용하기
// - 외부에 공개할 API는 Interface 사용하기 (선언 병합을 위해)