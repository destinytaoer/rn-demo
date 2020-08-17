let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello');
  }, 10);
});
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(' lagou');
  }, 10);
});
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(' I LOVE U');
  }, 10);
});

Promise.all([p1, p2, p3]).then(([a, b, c]) => {
  console.log(a + b + c);
});
