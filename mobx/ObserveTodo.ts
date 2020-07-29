/**
 * @Author: zhuweilong
 * @Date: 2020-07-29 15:37:59
 * @Last Modified by: zhuweilong
 * @Last Modified time: 2020-07-29 15:38:39
 */

import {observable, computed} from 'mobx';

export interface TodoInterface {
  task: string;
  completed: boolean;
}

class ObservableTodoStore {
  @observable todos: Array<TodoInterface> = [];

  @computed get completedTodosCount() {
    return this.todos.filter((todo) => todo.completed).length;
  }
  @computed get report() {
    if (this.todos.length === 0) {
      return '<none>';
    }
    const nextTodo = this.todos.find((todo) => todo.completed === false);
    return (
      `Next todo: "${nextTodo ? nextTodo.task : '<none>'}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }
  addTodo(task: string) {
    this.todos.push({
      task: task,
      completed: false,
    });
  }
}

export default ObservableTodoStore;
