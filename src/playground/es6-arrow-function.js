const sqare = function(x) {
    return x * x;
}

console.log(sqare(3));

//ES6 Arrow Function

//const squareArrow = (x) => {
//    return x * x;
//};

const squareArrow = (x) => x * x;

console.log(squareArrow(8));

const fullName = "Cedric Laier";

const getFirstName = name => name.split(" ")[0]; 

console.log(getFirstName(fullName));