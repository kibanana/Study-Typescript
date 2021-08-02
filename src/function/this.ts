const obj = {
    a: 'Hello~',
    b: function () {
      console.log(this.a);
    }
};


// 1. bind 메서드
obj.b(); // Hello~

const bProperty1 = obj.b.bind(obj);
bProperty1(); // Hello~

function someFn1(cb: any) {
    cb();
}
someFn1(obj.b.bind(obj)); // Hello~

setTimeout(obj.b.bind(obj), 100); // Hello~


// 2. 화살표 함수
obj.b(); // Hello~

const bProperty2 = () => obj.b();
bProperty2(); // Hello~

function someFn2(cb: any) {
  cb();
}
someFn2(() => obj.b()); // Hello~

setTimeout(() => obj.b(), 100); // Hello~