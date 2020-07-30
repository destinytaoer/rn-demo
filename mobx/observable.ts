import {observable, action, autorun} from 'mobx';

// 对象
let person = observable(
  {
    name: 'aa',
    age: 11,
    showAge: false,

    get labelText() {
      return this.showAge ? `${this.name} - ${this.age}` : this.name;
    },

    setAge(age: number) {
      this.age = age;
    },
  },
  {setAge: action},
);
autorun(() => console.log(person.labelText));
person.name = 'bb';
person.showAge = true;

// 数组
let todos = observable([
  {task: 'a', completed: true},
  {task: 'b', completed: false},
  {task: 'c', completed: true},
]);

autorun(() => {
  console.log(
    todos
      .filter((todo) => !todo.completed)
      .map((todo) => todo.task)
      .join(', '),
  );
});

todos[0].completed = false;
todos[1].task = 'bbb';

// 原始类型
let a = observable.box('1');
autorun(() => console.log(a.get()));

a.set('2');
a.set('3');
