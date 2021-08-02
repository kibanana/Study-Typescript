interface ICat {
    name: string
}

const cat: ICat = {
    name: 'Lucy'
};

function someCatFn(/* this: ICat ,*/ greeting: string) {
    console.log(`${greeting} ${this.name}`); // ok
}
someCatFn.call(cat, 'Hello'); // Hello Lucy