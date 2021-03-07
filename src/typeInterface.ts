// Type은 리터럴 타입 값에만 사용하고, Object 형태의 타입을 잡아줄 때에는 Interface를 사용한다.

type Category = 'category A' | 'category B' | 'category C';

enum CATEGORY_TYPE {
    A = 'category A',
    B = 'category B',
    C = 'category C'
}

interface Board {
    title: string;
    category: CATEGORY_TYPE;
    createdAt: Date;
}

const board: Board = {
    title: 'title',
    category: CATEGORY_TYPE.A,
    createdAt: new Date()
}

if (board.category === CATEGORY_TYPE.A) {
    console.log(CATEGORY_TYPE.A)
}