const fp = require('lodash/fp');

class Container {
  static of(value) {
    return new Container(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return Container.of(fn(this._value));
  }
}

class Maybe {
  static of(value) {
    return new Maybe(value);
  }

  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return this.isNothing(this._value)
      ? Maybe.of(null)
      : Maybe.of(fn(this._value));
  }

  isNothing(value) {
    return value === undefined || value === null;
  }
}

// 1.
let maybe = Maybe.of([5, 6, 1]);
let ex1 = (y) => {
  return maybe.map(fp.map(fp.add(y)));
};
console.log(ex1(1));

// 2.
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so']);
let ex2 = (a) => {
  return a.map(fp.first);
};
console.log(ex2(xs));

// 3.
let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x]);
});

let user = {id: 2, name: 'Hello'};
let ex3 = (obj) => {
  return safeProp('name', obj).map(fp.first);
};
console.log(ex3(user));

// 4.
// let ex4 = function (n) {
//   if (n) {
//     return parseInt(n);
//   }
// };
let ex4 = function (n) {
  return Maybe.of(n).map(parseInt);
};

console.log(ex4(10));
