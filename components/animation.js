function animation(defaultSpeed, cb) {
  let timer;
  let count = 0;
  step(defaultSpeed);

  function step(speed = defaultSpeed) {
    cancel();
    if (count < speed) {
      count++;
      timer = requestAnimationFrame(() => step(speed));
    } else {
      count = 0;
      timer = requestAnimationFrame(() => {
        cb(step, cancel);
      });
    }
  }
  function cancel() {
    cancelAnimationFrame(timer);
  }
}
export default animation;
