const fp = require('lodash/fp');

const cars = [
  {name: 'a', horsepower: 100, dollar_value: 13200, in_stock: false},
  {name: 'b', horsepower: 200, dollar_value: 13200, in_stock: false},
  {name: 'c', horsepower: 300, dollar_value: 13200, in_stock: true},
  {name: 'd', horsepower: 400, dollar_value: 13200, in_stock: false},
  {name: 'e', horsepower: 500, dollar_value: 13200, in_stock: true},
];

// let isLastInStock = function (cars) {
//   let last_car = fp.last(cars);
//   return fp.prop('in_stock', last_car);
// };

// 1.
let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last);

console.log(isLastInStock(cars));

// 2.
let firstCarName = fp.flowRight(fp.prop('name'), fp.first);

console.log(firstCarName(cars));

// 3.
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length;
};
// let averageDollarValue = function (cars) {
//   let dollar_values = fp.map(function (car) {
//     return car.dollar_value;
//   }, cars);

//   return _average(dollar_values);
// };
let averageDollarValue = fp.flowRight(
  _average,
  fp.map((car) => car.dollar_value),
);
console.log(averageDollarValue(cars));

// 4.
let _underscore = fp.replace(/\W+/g, '_');
let sanitizeNames = fp.map(fp.flowRight(_underscore, fp.lowerCase));

console.log(sanitizeNames(['Hello World']));
