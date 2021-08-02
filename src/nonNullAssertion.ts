// Error - TS2533: Object is possibly 'null' or 'undefined'.
// function fnA(x: number | null | undefined) {
//     return x.toFixed(2);
// }

// if statement
function fnD(x: number | null | undefined) {
    if (x) {
        return x.toFixed(2);
    }
}

// Type assertion
function fnB(x: number | null | undefined) {
    return (x as number).toFixed(2);
}
function fnC(x: number | null | undefined) {
    return (<number>x).toFixed(2);
}

// Non-null assertion operator -> if statement, Type assertion보다 간단한 방법
function fnE(x: number | null | undefined) {
    return x!.toFixed(2);
}