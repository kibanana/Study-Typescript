type InferType<T> = T extends infer R ? R : null;
// number 타입은 타입 추론 가능
// 타입 변수 R은 InferType<number> 에서 받은 타입 number가 되고 infer 키워드를 통해 타입 추론이 가능한지 확인한다.

const inferVal: InferType<number> = 123;


// TS utility type > Return Type
type ReturnType2<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

function fn(num: number) { // 반환 타입은 string
  return num.toString();
}

const returnVal: ReturnType2<typeof fn> = 'Hello';
