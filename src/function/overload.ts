function add(a: string, b: string): string; // 함수 선언
function add(a: number, b: number): number; // 함수 선언
function add(a: string, b: number): string; // 함수 선언
function add(a: any, b: any): any { // 함수 구현
  return console.log(a + b);
}

add('hello ', 'world~');
add(1, 2);
add('hello ', 2);


interface IUser {
    name: string,
    age: number,
    getData(x: string): string[];
    getData(x: number): string;
}

let user: IUser = {
    name: 'Neo',
    age: 36,
    getData: (data: any) => {
        if (typeof data === 'string') {
            return data.split('');
        } else {
            return data.toString();
        }
    }
};
  
user.getData('Hello'); // ['h', 'e', 'l', 'l', 'o']
user.getData(123); // '123'


/** Provides special properties (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating <div> elements. */
interface HTMLDivElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}