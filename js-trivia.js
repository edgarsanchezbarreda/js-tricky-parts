// 1. The downside of using typeof bar === "object" is that null can also be an object
// To makesure that bar is also not null, simply check that bar is not null -> (bar !== null) && typeof bar === "object"

// 2. What will print?
(function () {
    var a = (b = 3);
})();

console.log('a defined? ' + (typeof a !== 'undefined')); // false
console.log('b defined? ' + (typeof b !== 'undefined')); // true

// The above variable assignment is short hand for b = 3 and var a = b
// This allows b to be globally scoped outside of the function, thus giving us access to it outside of the function's scope

// 3. What will print?
var myObject = {
    foo: 'bar',
    func: function () {
        var self = this;
        console.log('outer func:  this.foo = ' + this.foo);
        console.log('outer func:  self.foo = ' + self.foo);
        (function () {
            console.log('inner func:  this.foo = ' + this.foo);
            console.log('inner func:  self.foo = ' + self.foo);
        })();
    },
};
myObject.func();

// "outer func: this.foo = bar"
// "outer func: this.self = bar"
// "inner func: this.foo = undefined"
// "inner func: this.self = bar"

// This is because in the outer function, but "this" and "self" reference  myObject, which holds the value of far as "bar"
// The inner function refers to the outer function, which has self defined, but cannot refer to whatever the outer function refers to if it is not held in another function like it does for "self"

// 4.What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?
// This is to create a closure around the entire contents of the file, which creates a private namespace and thereby helps avoid potential name clashes between other JS modules and libraries.

// 5. What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?
// "use strict" is a way to voluntarily enforce stricter parsing and error handling of your code at runtime.
// So code errors that would otherwise have been ignored or would have failed silentloy will now generate errors or throw exceptions. This is good practice
//  	- Makes debugging easier
// 		- Prevents accidental global variables by throwing an error when assigning a value to an undeclared variable
// 		- Eliminates "this" coercion - Without strict mode, a reference to this value of a null or undefined is automatically coerced to reference the global "this" like the screen.
// 		- Detects duplicate parameter values and throws error
// 		- Makes eval() safer
// 		- Throws error on invalid usafe of "delete"

// 6.
// Consider the two functions below. Will they both return the same thing? Why or why not?

// function foo1()
// {
//   return {
//       bar: "hello"
//   };
// }

// function foo2()
// {
//   return
//   {
//       bar: "hello"
//   };
// }

// The first function will return the object, while the second will return undefined. This is because the second function has a return statement by itself on its own line, and JS will automatically insert a semicolon there, and any code below it will therefore not run

// 7.
// What will the code below output? Explain your answer.

// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 == 0.3);

// It will likely output false, because numbers in JS are treated with floating point precision (as decimals) and may not always be exactly 0.3 as expected.

// 8.
// In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?

// (function() {
//     console.log(1);
//     setTimeout(function(){console.log(2)}, 1000);
//     setTimeout(function(){console.log(3)}, 0);
//     console.log(4);
// })();

// 1, 4, 3, 2
// 1 and 4 are logged immediately because there is no delay. 3 is logged before 2 because there is a 0 second delay on 3.
// 3 is logged after 4 even though it written before 4 because when setTimeout() is called, it puts the execution of its referenced function into the event queue if the browser is busy, and it waits to be executed as soon as possible, or when 1 and 4 have been logged.

// 9.
// Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.
function isPalindrome(str) {
    str = str.replace(/\W/g, '').toLowerCase();
    return str == str.split('').reverse().join('');
}

// 10.
// Write a sum method which will work properly when invoked using either syntax below.

// console.log(sum(2,3));   // Outputs 5
// console.log(sum(2)(3));  // Outputs 5

function sum(x, y) {
    if (y !== undefined) {
        return x + y;
    } else {
        return function (y) {
            return x + y;
        };
    }
}

// 11.
// Consider the following code snippet:

for (var i = 0; i < 5; i++) {
    var btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Button ' + i));
    btn.addEventListener('click', function () {
        console.log(i);
    });
    document.body.appendChild(btn);
}
// (a) What gets logged to the console when the user clicks on “Button 4” and why?

// (b) Provide one or more alternate implementations that will work as expected.

// a: Any button that is clicked will log 5 because by the time the loop finishes running, the value of i is 5, and since the value of i was stored via var, it is globally scoped, which means that every button that references i is referencing the value of i at that time.
// The answer to this would be store i with the keyword let, because that means that i would be scoped to the value of the current iteration.
// b:
for (let i = 0; i < 5; i++) {
    var btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Button ' + i));
    btn.addEventListener('click', function () {
        console.log(i);
    });
    document.body.appendChild(btn);
}
// 12.
// var d = {};
// …what is accomplished using the following code?

// [ 'zebra', 'horse' ].forEach(function(k) {
// 	d[k] = undefined;
// });
// The properties are set to the empty object, even though there is no value to each of the keys

// 13.
// What will the code below output to the console and why?

// var arr1 = "john".split('');
// var arr2 = arr1.reverse();
// var arr3 = "jones".split('');
// arr2.push(arr3);
// console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
// console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));

// The logged output will be:

// "array 1: length=5 last=j,o,n,e,s"
// "array 2: length=5 last=j,o,n,e,s"

// This is because whenever calling an array method like reverse() on an array, it not only returns the array reversed, it also reverses the array that the method is being called on. So arr2 is not only a copy of arr1, but it is referencing arr1. So when anything is done to arr2, like pushing values to it, arr1 will also be changed as a result

// 14.
// What will the code below output to the console and why ?

// console.log(1 +  "2" + "2");
// console.log(1 +  +"2" + "2");
// console.log(1 +  -"1" + "2");
// console.log(+"1" +  "1" + "2");
// console.log( "A" - "B" + "2");
// console.log( "A" - "B" + 2);

// '122';
// '32';
// '02';
// '112';
// 'NaN2';
// NaN;

// 15.
// The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?

// var list = readHugeList();

// var nextListItem = function() {
//     var item = list.pop();

//     if (item) {
//         // process the list item...
//         nextListItem();
//     }
// };

var list = readHugeList();

var nextListItem = function () {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout(nextListItem, 0);
    }
};

// The stack overflow is eliminated because the event loop handles the recursion, not the call stack. When nextListItem runs, if item is not null, the timeout function (nextListItem) is pushed to the event queue and the function exits, thereby leaving the call stack clear. When the event queue runs its timed-out event, the next item is processed and a timer is set to again invoke nextListItem. Accordingly, the method is processed from start to finish without a direct recursive call, so the call stack remains clear, regardless of the number of iterations.

// 16.
// What is a “closure” in JavaScript? Provide an example.

// A closure is an inner function that has access to the variables in the outer (enclosing) function’s scope chain. The closure has access to variables in three scopes; specifically: (1) variable in its own scope, (2) variables in the enclosing function’s scope, and (3) global variables.

// EX:
var globalVar = 'xyz';

(function outerFunc(outerArg) {
    var outerVar = 'a';

    (function innerFunc(innerArg) {
        var innerVar = 'b';

        console.log(
            'outerArg = ' +
                outerArg +
                '\n' +
                'innerArg = ' +
                innerArg +
                '\n' +
                'outerVar = ' +
                outerVar +
                '\n' +
                'innerVar = ' +
                innerVar +
                '\n' +
                'globalVar = ' +
                globalVar
        );
    })(456);
})(123);

// 17.
// What would the following lines of code output to the console?

// console.log("0 || 1 = "+(0 || 1));
// console.log("1 || 2 = "+(1 || 2));
// console.log("0 && 1 = "+(0 && 1));
// console.log("1 && 2 = "+(1 && 2));

// 0 || 1 = 1
// 1 || 2 = 1
// 0 && 1 = 0
// 1 && 2 = 2

// In JS, both || and && are logical operators that return the first fully determined "logical value" when evaluated from left to right
// Since 0 is falsy and 1 is truthy, 1 is returned because it is the first value to be determined as true.
// Since 1 is the truthy and it is the first value to be evaluated (because it is on the left), the "or" condition has already been satisfied, and can therefor return 1.
// && works like || but it looks for the first falsy value from left to right.
// Since 0 is evaluated first, and it is falsy, 0 gets returned because it met the condition of "false" already, and does not need to evaluate any other condition
// The opposite is true for 1 && 2, since the first value is truthy, it evaluates the second value, which is also truthy, because both values were returned and it is the last to be returned (I Think???)

// 18.
// What will be the output when the following code is executed? Explain.

// true
// false

// This is because using double equals tries to coerce values before comparing them. So it can change the string "0" to the number 0 instead, and since 0 is falsy, it evaluates it as such.
// Triple equals checks for its value AND typing, which clearly dont equal eachother, and returns false.

// 19.
// What is the output out of the following code? Explain your answer.

// var a={},
//     b={key:'b'},
//     c={key:'c'};

// a[b]=123;
// a[c]=456;

// console.log(a[b]);

// A:
// The output of this code will be 456 (not 123).

// The reason for this is as follows: When setting an object property, JavaScript will implicitly stringify the parameter value. In this case, since b and c are both objects, they will both be converted to "[object Object]". As a result, a[b] anda[c] are both equivalent to a["[object Object]"] and can be used interchangeably. Therefore, setting or referencing a[c] is precisely the same as setting or referencing a[b].

// 20.
// What will the following code output to the console:

console.log(
    (function f(n) {
        return n > 1 ? n * f(n - 1) : n;
    })(10)
);

// The code will output the value of 10 factorial (i.e., 10!, or 3,628,800).

// Here’s why:

// The named function f() calls itself recursively, until it gets down to calling f(1) which simply returns 1. Here, therefore, is what this does:

// f(1): returns n, which is 1
// f(2): returns 2 * f(1), which is 2
// f(3): returns 3 * f(2), which is 6
// f(4): returns 4 * f(3), which is 24
// f(5): returns 5 * f(4), which is 120
// f(6): returns 6 * f(5), which is 720
// f(7): returns 7 * f(6), which is 5040
// f(8): returns 8 * f(7), which is 40320
// f(9): returns 9 * f(8), which is 362880
// f(10): returns 10 * f(9), which is 3628800

// 21.
// Consider the code snippet below. What will the console output be and why?

(function (x) {
    return (function (y) {
        console.log(x);
    })(2);
})(1);

// 1

// This is because closure. The inner function has access to the variables within its own scope, and within the scope of the function that encloses it, which is why it has access to x even though it is not defined within the inner function itself.

// 22.
// What will the following code output to the console and why:

// var hero = {
//     _name: 'John Doe',
//     getSecretIdentity: function (){
//         return this._name;
//     }
// };

// var stoleSecretIdentity = hero.getSecretIdentity;

// console.log(stoleSecretIdentity());
// console.log(hero.getSecretIdentity());
// What is the issue with this code and how can it be fixed.

// undefined
// "John Doe"

// This is because stoleSecretIdentity() is not being called on the hero object, so in this case, "this" is referencing the window object, which does not have a property _name.
// The second console.log does print the name "John Doe" because "this" is referencing the _name property defined in the hero object, which it is being called on.

// One way to fix the stoleSecretIdentity() function is as follows:
// var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);

// 23.
// Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

// The arguments to the function should be:

// a DOM element
// a callback function (that takes a DOM element as its argument)

function Traverse(p_element, p_callback) {
    p_callback(p_element);
    var list = p_element.children;
    for (var i = 0; i < list.length; i++) {
        Traverse(list[i], p_callback); // recursive call
    }
}

// 24.
// Testing your this knowledge in JavaScript: What is the output of the following code?

var length = 10;
function fn() {
    console.log(this.length);
}

var obj = {
    length: 5,
    method: function (fn) {
        fn();
        arguments[0]();
    },
};

obj.method(fn, 1);

// Output:

// 10
// 2
// Why isn’t it 10 and 5?

// In the first place, as fn is passed as a parameter to the function method, the scope (this) of the function fn is window. var length = 10; is declared at the window level. It also can be accessed as window.length or length or this.length (when this === window.)

// method is bound to Object obj, and obj.method is called with parameters fn and 1. Though method is accepting only one parameter, while invoking it has passed two parameters; the first is a function callback and other is just a number.

// When fn() is called inside method, which was passed the function as a parameter at the global level, this.length will have access to var length = 10 (declared globally) not length = 5 as defined in Object obj.

// Now, we know that we can access any number of arguments in a JavaScript function using the arguments[] array.

// Hence arguments[0]() is nothing but calling fn(). Inside fn now, the scope of this function becomes the arguments array, and logging the length of arguments[] will return 2.

// Hence the output will be as above.

// 25.
// Consider the following code. What will the output be, and why?

(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1,
            y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();

// 1
// undefined
// 2

// var statements are hoisted (without their value initialization) to the top of the global or function scope it belongs to, even when it’s inside a with or catch block. However, the error’s identifier is only visible inside the catch block. It is equivalent to:

(function () {
    var x, y; // outer and hoisted
    try {
        throw new Error();
    } catch (x /* inner */) {
        x = 1; // inner x, not the outer one
        y = 2; // there is only one y, which is in the outer scope
        console.log(x /* inner */);
    }
    console.log(x);
    console.log(y);
})();

// 26.
// What will be the output of this code?

var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl();

// Neither 21, nor 20, the result is undefined

// It’s because JavaScript initialization is not hoisted.

// (Why doesn’t it show the global value of 21? The reason is that when the function is executed, it checks that there’s a local x variable present but doesn’t yet declare it, so it won’t look for global one.)

// 27.
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, i * 1000);
}
// What will this code print?
// It will print 0 1 2 3 4, because we use let instead of var here. The variable i is only seen in the for loop’s block scope.

// 28.
// What do the following lines output, and why?

console.log(1 < 2 < 3);
console.log(3 > 2 > 1);

// The first statement returns true which is as expected.

// The second returns false because of how the engine works regarding operator associativity for < and >. It compares left to right, so 3 > 2 > 1 JavaScript translates to true > 1. true has value 1, so it then compares 1 > 1, which is false.

// 29.
// How do you add an element at the begining of an array? How do you add one at the end?

var myArray = ['a', 'b', 'c', 'd'];
myArray.push('end');
myArray.unshift('start');
console.log(myArray); // ["start", "a", "b", "c", "d", "end"]

// With ES6, one can use the spread operator:

myArray = ['start', ...myArray];
myArray = [...myArray, 'end'];
// Or, in short:

myArray = ['start', ...myArray, 'end'];

// 30.
// Imagine you have this code:

var a = [1, 2, 3];
// a) Will this result in a crash?

a[10] = 99;
// b) What will this output?

console.log(a[6]);

// a) It will not crash. The JavaScript engine will make array slots 3 through 9 be “empty slots.”

// b) Here, a[6] will output undefined, but the slot still remains empty rather than filled with undefined. This may be an important nuance in some cases. For example, when using map(), empty slots will remain empty in map()’s output, but undefined slots will be remapped using the function passed to it:

var b = [undefined];
b[2] = 1;
console.log(b); // (3) [undefined, empty × 1, 1]
console.log(b.map(e => 7)); // (3) [7,         empty × 1, 7]

// 31.
// What is the value of typeof undefined == typeof NULL?

// Hide answer
// The expression will be evaluated to true, since NULL will be treated as any other undefined variable.

// Note: JavaScript is case-sensitive and here we are using NULL instead of null.

// 32.
// What would following code return?

console.log(typeof typeof 1);

// string

// typeof 1 will return "number" and typeof "number" will return string.

// 33.
// What will be the output of the following code:

for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, i * 1000);
}
// Explain your answer. How could the use of closures help here?

// The code sample shown will not display the values 0, 1, 2, 3, and 4 as might be expected; rather, it will display 5, 5, 5, 5, and 5.

// The reason for this is that each function executed within the loop will be executed after the entire loop has completed and all will therefore reference the last value stored in i, which was 5.

// Closures can be used to prevent this problem by creating a unique scope for each iteration, storing each unique value of the variable within its scope, as follows:

for (var i = 0; i < 5; i++) {
    (function (x) {
        setTimeout(function () {
            console.log(x);
        }, x * 1000);
    })(i);
}
// This will produce the presumably desired result of logging 0, 1, 2, 3, and 4 to the console.

// In an ES2015 context, you can simply use let instead of var in the original code:

for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, i * 1000);
}

// 34.
// What is NaN? What is its type? How can you reliably test if a value is equal to NaN?

// Hide answer
// The NaN property represents a value that is “not a number”. This special value results from an operation that could not be performed either because one of the operands was non-numeric (e.g., "abc" / 4), or because the result of the operation is non-numeric.

// While this seems straightforward enough, there are a couple of somewhat surprising characteristics of NaN that can result in hair-pulling bugs if one is not aware of them.

// For one thing, although NaN means “not a number”, its type is, believe it or not, Number:

console.log(typeof NaN === 'number'); // logs "true"
// Additionally, NaN compared to anything – even itself! – is false:

console.log(NaN === NaN); // logs "false"
// A semi-reliable way to test whether a number is equal to NaN is with the built-in function isNaN(), but even using isNaN() is an imperfect solution.

// A better solution would either be to use value !== value, which would only produce true if the value is equal to NaN. Also, ES6 offers a new Number.isNaN() function, which is a different and more reliable than the old global isNaN() function.

35;
// What will the following code output and why?

var b = 1;
function outer() {
    var b = 2;
    function inner() {
        b++;
        var b = 3;
        console.log(b);
    }
    inner();
}
outer();

// Output to the console will be “3”.

// There are three closures in the example, each with it’s own var b declaration. When a variable is invoked closures will be checked in order from local to global until an instance is found. Since the inner closure has a b variable of its own, that is what will be output.

// Furthermore, due to hoisting the code in inner will be interpreted as follows:

function inner() {
    var b; // b is undefined
    b++; // b is NaN
    b = 3; // b is 3
    console.log(b); // output "3"
}

// 36.
// Discuss possible ways to write a function isInteger(x) that determines if x is an integer.

// Hide answer
// This may sound trivial and, in fact, it is trivial with ECMAscript 6 which introduces a new Number.isInteger() function for precisely this purpose. However, prior to ECMAScript 6, this is a bit more complicated, since no equivalent of the Number.isInteger() method is provided.

// The issue is that, in the ECMAScript specification, integers only exist conceptually; i.e., numeric values are always stored as floating point values.

// With that in mind, the simplest and cleanest pre-ECMAScript-6 solution (which is also sufficiently robust to return false even if a non-numeric value such as a string or null is passed to the function) would be the following use of the bitwise XOR operator:

function isInteger(x) {
    return (x ^ 0) === x;
}
// The following solution would also work, although not as elegant as the one above:

function isInteger(x) {
    return typeof x === 'number' && x % 1 === 0;
}
// The following function (or with Math.ceil() or Math.floor() in place of Math.round()) might also seem useful, but the results are not exactly the same as with the above two functions:

function isInteger(x) {
    return Math.round(x) === x;
}
// The difference is, these Math-based solutions return true for Infinity and -Infinity, whereas the others (and notably ES6’s Number.isInteger()) return false.

// Another fairly common incorrect solution is the following:

function isInteger(x) {
    return parseInt(x, 10) === x;
}
// While this parseInt-based approach will work well for many values of x, once x becomes quite large, it will fail to work properly. The problem is that parseInt() coerces its first parameter to a string before parsing digits. Therefore, once the number becomes sufficiently large, its string representation will be presented in exponential form (e.g., 1e+21). Accordingly, parseInt() will then try to parse 1e+21, but will stop parsing when it reaches the e character and will therefore return a value of 1. Observe:

String(1000000000000000000000);
'1e+21' > parseInt(1000000000000000000000, 10);
1 > parseInt(1000000000000000000000, 10) === 1000000000000000000000;
false;

// 37.
// How do you clone an object?

// Hide answer
// var obj = {a: 1 ,b: 2}
// var objclone = Object.assign({},obj);
// Now the value of objclone is {a: 1 ,b: 2} but points to a different object than obj.

// Note the potential pitfall, though: Object.assign() will just do a shallow copy, not a deep copy. This means that nested objects aren’t copied. They still refer to the same nested objects as the original:

let obj = {
    a: 1,
    b: 2,
    c: {
        age: 30,
    },
};

var objclone = Object.assign({}, obj);
console.log('objclone: ', objclone);

obj.c.age = 45;
console.log('After Change - obj: ', obj); // 45 - This also changes
console.log('After Change - objclone: ', objclone); // 45
