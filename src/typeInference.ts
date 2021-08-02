// let num = 12;
// num = 'Hello type!'; // TS2322: Type '"Hello type!"' is not assignable to type 'number'.

// 초기화된 변수 `num`
let num = 12;

// 기본값이 설정된 매개 변수 `b`
function add(a: number, b: number = 2): number {
    // 반환 값(`a + b`)이 있는 함수
    return a + b;
}