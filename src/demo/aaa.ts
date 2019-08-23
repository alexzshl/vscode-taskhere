import { print } from "util";

console.log('test ts\n');

function foo(a: number, b: number) {
    console.log(typeof (a));
    let c = a.toString() + b.toString();
    let d = a - b;
    console.log(c);
    return 12 + 13;
}
foo(12, 13);

const pi: number = 3.14;
let aa:number = 12;
let bb = 13;
let cc= aa + bb + pi;
console.log(pi + ': ' + typeof (pi));

let a = 15;
let s = "alex";
let b = true;
console.log(a + ': ' + typeof(a));
console.log(s + ': ' + typeof (s));
console.log(b + ': ' + typeof (b));

let arr: String[] = [];
arr[0] = 'hello';
arr[1] = 'world';
arr.push('12');
console.log(arr + ': ' + typeof (arr));


let x: [String, Number] = ['alexx', 16];
console.log(x + ': ' + typeof (x));
// x.push(true);

enum Color { Red, Green, Blue }
let c: Color = Color.Blue;
console.log(c);


function hello(): void {
    console.log("hello");
}
console.log(hello());

let u = undefined;

class Student {
    name = 'alex';
    static sex = 'man';
}

console.log(Student);

let aaa = { 'name': 'alex', 'age': 12 };
aaa.name = 'lucy';
aaa['name'] = 'david';
print(aaa.name);
