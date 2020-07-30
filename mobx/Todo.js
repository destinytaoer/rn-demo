// ES5 写法
import {decorate, observable, computed, autorun, action} from 'mobx';
class TodoStore {
  constructor() {
    this.todos = [];
    autorun(() => console.log(this.report)); // 每次状态发生变化会自动执行 autorun 中的函数
  }

  get completedTodosCount() {
    return this.todos.filter((todo) => todo.completed).length;
  }

  get report() {
    if (this.todos.length === 0) {
      return '<none>';
    }
    const nextTodo = this.todos.find((todo) => todo.completed === false);
    return (
      `Next todo: "${nextTodo ? nextTodo.task : '<none>'}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  addTodo(task) {
    this.todos.push({
      task,
      completed: false,
      assignee: null,
    });
  }
}
decorate(TodoStore, {
  todos: observable,
  completedTodosCount: computed,
  report: computed,
  addTodo: action,
});
export default TodoStore;
