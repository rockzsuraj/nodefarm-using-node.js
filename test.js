// function a(params1) {
//     console.log('a is called ');
//     params1();
// }

// a( () => {console.log('callbacks called');});

// setTimeout(function () {
//     console.log('timeout');
// }, 1000);

// // var firstName = 'Suraj';
// // var lastName = 'Kumar';

// let obj = {
//     firstName : 'John',
//     lastName : 'Doe',
//     printName :  function () {
//        console.log(this.firstName + ' ' + this.lastName);
//     }
// }

// obj.printName();

// let arr = [1,2,3,4,5,6,7,8,9,10];

// const entries =  Object.entries(arr);

// console.log('entries: ' + entries);

// const sum = () => {

// }

// function callbacksFunction(sum) {
// console.log('callbacks function is called');
// sum();
// }

// const mapArr = arr.map(function(e){
//     return e*e;
// })

// console.log('mapArr',mapArr);

// let username = {
//     firstName : 'John',
//     lastName : 'Doe',
// }

// const chai = () => {
//     console.log(this.username);
// }

// function chai2() {
//     console.log(this.username);
// }

// chai();
// chai2();

// 1. No arguments object in arrow functions
// function chai2() {
//     console.log(arguments);
// }
// chai2();
// const chai = () => {
//     console.log(arguments);
// }
// chai();

// 2. Arrow functions do not create their own this binding
// {
//     var firstName2 = 'John2';
// }
// console.log('firstname',firstName2);

// let username = {
//     firstName: 'John',
//     lastName: 'Doe',
//     func1: function () {
//         console.log("func1", this);
//         console.log(this.firstName);
//         function name() {
//             console.log('name is called', this);
//         }
//         name();
//     },
//     func2: () => {

//         console.log("func2", this);
//         console.log(this.firstName2);
//         function name2() {
//             console.log('name2 is called', this);
//         }
//         name2();
//     }
// }

// username.func1();
// username.func2();

// chaiNormal();
// chaiArrow();

//  function chaiNormal () {
//     console.log('chaiNormal');
//  }

// const chaiArrow = () => {
// console.log('chaiArrow');
// }

// console.log(this);

// console.log(chaiVar);
// console.log(chaiConst);
// console.log(chaiLet);

// const chaiConst = 'chaiConst';
// let chaiLet = 'chaiLet';

// var chaiVar = 'chaiVar';

const queryObj = {
  price: { gte: "300" },
  ratingsAverage: { lt: "4.9" },
  sort: "-price",
  limit: 5,
  duration: { gt: 5 },
  fields: "summary, name",
};

const excludeQueries = ["sort", "limit", "page", "fields"];
const replaceKey = ["gte", "gt", "lte", "lt"];
Object.keys(queryObj).forEach((key) => {
  const obj = queryObj[key];
  if (excludeQueries.includes(key)) {
    delete queryObj[key];
  }
  Object.keys(obj).forEach((objKey) => {
    if (replaceKey.includes(objKey)) {
      const operator = `$${objKey}`;
      obj[operator] = parseFloat(obj[objKey]);
      delete obj[objKey];
    }
  });
});

console.log(queryObj);
