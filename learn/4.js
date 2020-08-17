const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.status = PENDING; // 初始状态为 pending
    this.value = null;
    this.reason = null;
    // 因为同一个 promise 可以多次 then，所以使用数组来维护
    this.successCallbacks = []; // 维护一个成功回调队列
    this.failCallbacks = []; // 维护一个失败回调队列

    this.resolve.bind(this);
    this.reject.bind(this);

    try {
      // 立即执行传入的函数
      // 传入 resolve 和 reject
      executor(this.resolve, this.reject);
    } catch (e) {
      // 执行器执行报错，也会直接失败
      this.reject(e);
    }
  }
  resolve(value) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = FULFILLED; // resolve 的调用改变状态为 fulfilled
        this.value = value; // 保存成功的值
        // 异步的情况下，resolve 时，执行所有成功回调
        this.successCallbacks.forEach((cb) => {
          // 传入成功的值
          cb(value);
        });
      }
    });
  }
  reject(reason) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = REJECTED; // reject 的调用改变状态为 rejected
        this.reason = reason; // 保存失败的原因
        // 异步的情况下，reject 时，执行所有失败回调
        this.failCallbacks.forEach((cb) => {
          // 传入失败原因
          cb(reason);
        });
      }
    });
  }
  then(success, fail) {
    // 如果两个回调都不是函数，则创建一个函数来将值往下传递
    success =
      typeof success === 'function'
        ? success
        : function (value) {
            return value;
          };
    fail =
      typeof fail === 'function'
        ? fail
        : function (reason) {
            throw reason;
          };

    // then 的执行返回新的 promise 实现链式调用
    let promise = new MyPromise((resolve, reject) => {
      // 增加 setTimeout 是为了避免我们执行函数的时候，获取不到外部的 promise，因为此时 promise 还没有被赋值，执行完毕之后才会赋值
      setTimeout(() => {
        // 同步
        if (this.status === FULFILLED) {
          try {
            // 成功时，执行成功回调，并传入保存的成功值
            let x = success(this.value);
            // 使用 resolvePromise 来处理结果，处理 x 是 promise 的情况
            resolvePromise(promise, x, resolve, reject);
          } catch (e) {
            // 执行 success 函数失败时，调用 reject，并传入错误对象
            reject(e);
          }
        } else if (this.status === REJECTED) {
          try {
            // 失败时，执行失败回调，并传入失败的原因
            let x = fail(this.reason);
            // 使用 resolvePromise 来处理结果，处理 x 是 promise 的情况
            resolvePromise(promise, x, resolve, reject);
          } catch (e) {
            // 执行 success 函数失败时，调用 reject，并传入错误对象
            reject(e);
          }
        } else {
          // 执行 then 时，状态还是 pending，说明是异步的
          this.successCallbacks.push((value) => {
            // 需要在回调执行的时候才进行 resolve 或 reject
            // 处理方式与 fulfilled 状态是一致
            try {
              let x = success(value); // success 的执行会传入成功的值
              // 使用 resolvePromise 来处理结果，处理 x 是 promise 的情况
              resolvePromise(promise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
          this.failCallbacks.push((reason) => {
            // 需要在回调执行的时候才进行 resolve 或 reject
            // 处理方式与 rejected 状态是一致
            try {
              let x = fail(reason); // success 的执行会传入成功的值
              // 使用 resolvePromise 来处理结果，处理 x 是 promise 的情况
              resolvePromise(promise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        }
      });
    });
    return promise;
  }
}
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    throw new TypeError('循环引用');
  }

  let called = false; // thenabled 对象不一定含有 status，使用 called 标记来代替
  if (x instanceof MyPromise) {
    // x 是 promise 实例
    if (x.status === PENDING) {
      x.then((y) => {
        resolvePromise(promise, y, resolve, reject);
      }, reject);
    } else {
      // 同步
      x.then(resolve, reject);
    }
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // x 拥有 then 方法
    try {
      if (x.then && typeof x.then === 'function') {
        x.then(
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          (reason) => {
            if (called) return;
            called = true;
            reject(reason);
          },
        );
      } else {
        // 普通值，直接 resolve
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // x 是普通值，直接 resolve
    resolve(x);
  }
}

/* 用于 promises-aplus-tests 的单元测试 */
MyPromise.deferred = MyPromise.defer = function () {
  let df = {};
  df.promise = new MyPromise(function (resolve, reject) {
    df.resolve = resolve;
    df.reject = reject;
  });
  return df;
};

module.exports = MyPromise;
