// JS Tricky Parts

// JS Must Know

// Array / string / object / methods
// Type checking / comversion
// JS Operators == vs ===

// Asynchronous Code
// Motivation for using async code
// What is async await
// What is AJAX??
// 		- AJAX vs Fetch?? Why use either one?
// Callbacks / promises / async await

// Closures
// MUST KNOW AND BE COMFORTABLE WITH CLOSURES
// 	- The ability for inner function to remember variables defined in outer functions, long after the outer function has returned

// EX:

function idGenerator() {
    let start = 0;
    return function generate() {
        start++;
        return start;
    };
}

const nextId = idGenerator();

// When you call nextId, it basically calls the inner generate function and thus has access to call it.
// However, you do not have direct access to the "start" variable
// So i cant do something like start = 100 outside of the scope of the function

// IIFE - Immediateley Invoked Function Expression

const getArea = function (width, height) {
    return width * height;
};

// This is a function expression

// to immediately inboke a function expression, wrap it in parenthesis, and invoke it right away

// EX:
(function () {
    console.log('just ran!');
})();

// Why would you write an IIFE??

// Because you can basically create private functions and private variables
// You only have access to variables within the IIFE when calling the function and not just straight access to the variables outside of the function without calling on whatever holds the IIFE

// Constructor Functions

function Dog(name, breed, age) {
    this.name = name;
    this.breed = breed;
    this.age = age;
    this.bark = function () {
        return `${this.name} says Woof!`;
    };
}

// We use capital letters to indicate that it is not meant to return anything, rather it serves as a template to create other objects.
// To create those objects, you use the "new" keyword

// EX:
const ringo = new Dog('ringo', 'corgi', 3);

// The new keyword, creates a link between the Dog prototype object, which is all those variables seen above, to whatever the variable or instance you want to create based off the Dog constructor function

Dog.prototype === Object.getPrototypeOf(ringo); // return true

// If you just execute "Dog" without creating an instance of it within a varoiable using the new keyword, the "this" refers to the window

// You can also add methods to the constructor prototype, that is available to all instances of Dog, but not created for each instance of Dog.

Dog.prototype.howl = function () {
    return `${this.name} says AAWWWWOOOOOOOOO!!`;
};

// The benefit of this is to save space in memory and not create so many functions for every instance of the Dog object

// Keep in mind, that this is the same as creating an instance method in a class, so useless??
// It is important to define functions on the prototype object, like done in classes

// Make sure that you are able to discuss prototype fluently
// Make sure you know how to implement inheritance without ES2015 classes

// __________________

// Semicolons

// If you dont add a semi-colon, JS will automatically insert one
// In most cases this is fine, but in certain special cases the semi colon can be troublesome.
// Like when there is a return statement on its own linethere will be a semi-colon added and the code below it will not run

// ____________________________________

// TRIVIA YOU MUST KNOW
// 1. var / let / const?
// 2. "new" keyword
// 3. "this" keyword
// 4. reference types
// 5. immutability
// 6. hoisting
// 7. call / apply / bind ?
// 8. arrow functions / bind
// 9. How does "this" work in an arrow function
// 10. are arrow functions suited for methods on an object? WHy?
// 11. setTimeout where time is at 0? What is the significance?
// 12. for loop with closure
// 13. call stack ***** VERY IMPORTANT

// Loops with closure

// EX:

for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}

// What will happen??
// It will print "5" 5 times, and all at the same time
// WHY??
// Because you are using the "var" keyword, which makes this globally scoped
// "i" is 5 because before the loop checks to see if "i" is less than 5 it increments again.
// And since the global variable i is 5 even after the function has stopped running, 5 will be printed
// How to fix?
// You have to use the "let" variable keyword instead of var.
// What this does is give each iteration its own version of i, instead of accessing the global i variable.
