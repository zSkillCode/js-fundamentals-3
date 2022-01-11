'use strict';

/*
SCOPES
 */
function calcAge(birthYear) {
    let age = 2037 - birthYear;

    function printAge() {
        const output = `${firstName} You are ${age}, born in ${birthYear}`;
        console.log(output);

        if (birthYear >= 1981 && birthYear <= 1996) {
            const str = `Oh, and you're a millennial, ${firstName}`;
            console.log(str);

            function add(a, b) {
                return a + b;
            }
        }
        //add(2, 5); -> Not working - functon is in a child scope (working when strict mode is turned off)
    }

    printAge();
    return age;
}

const firstName = 'Bob';
calcAge(1991);
// console.log(age); -> Not working - variable is in a child scope

/*
HOISTING
 */
console.log(addDecl(2, 3)); // WORKING
// console.log(addExpr(2, 3)); // NOT WORKING
// console.log(addArr(2, 3)); NOT WORKING

function addDecl(a, b) {
    return a + b;
}

const addExpr = function (a, b) {
    return a + b;
}

const addArr = (a, b) => a + b;

/*
THIS-KEYWORD
 */
console.log(this); // Points to window object

const cAge = function (birthYear) {
    console.log(2037 - birthYear);
    console.log(this);  // Undefined (in strict mode)
}
cAge(2000);

const cAgeArrow = birthYear => {
    console.log(2037 - birthYear);
    console.log(this);  // Points to window object
}
cAgeArrow(2000);

const person = {
    year: 2000,
    calcAge: function () {
        console.log(this); // Points to calling object (in this case person -> person.calcAge() )
        console.log(2037 - this.year);
    }
};
person.calcAge();


const otherPerson = {
    year: 2017
};
otherPerson.calcAge = person.calcAge;
otherPerson.calcAge(); // 2017 -> this points to otherPerson

const func = person.calcAge;
// func(); this = undefined

/*
REGULAR FUNCTIONS VS ARROW FUNCTIONS
 */
const pers = {
    firstName: 'Bob',
    year: 2000,
    calcAge: function () {
        console.log(this);
        console.log(2037 - this.year);
    },

    greet: () => console.log(`Hey ${this.firstName}!`) // this = undefined
};
pers.greet();

/*
ARGUMENTS KEYWORD (only available in regular functions)
 */
const calcSum = function (a, b) {
    console.log(arguments); // Array with all params
    return a + b;
}
calcSum(2, 5);

/*
PRIMITIVE VS REFERENCE TYPES
 */

// Primitive types
let lastName = 'Williams';
let oldName = lastName;
lastName = 'Davis';
console.log(lastName, oldName); // Williams, David

// Reference types
const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log(jessica.lastName, marriedJessica.lastName); // Davis, Davis

// Copying objects
const jessica2 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,

    family: ['Alice', 'Bob']
};

const jessicaCopy = Object.assign({}, jessica2); // Only works on first level
jessicaCopy.lastName = 'Davis';
console.log(jessica2.lastName, jessicaCopy.lastName); // Williams, Davis

jessicaCopy.family.push('Mary', 'John');
console.log(jessica2.family, jessicaCopy.family); // Same result
