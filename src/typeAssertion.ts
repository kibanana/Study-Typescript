function someAssertionFunc(val: string | number, isNumber: boolean) {
    // some logics
    if (isNumber) {
        // 1. 변수 as 타입
        (val as number).toFixed(2);
        // Or
        // 2. <타입>변수
        // (<number>val).toFixed(2);
    }
}