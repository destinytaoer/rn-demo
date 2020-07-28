export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

export interface TodoInterface {
  isComplete: boolean;
  text: string;
  id: string;
}
export interface StateInterface {
  todos: Array<TodoInterface>;
}
export interface ActionInterface {
  type: string;
  payload: any;
}

export default {ADD_TODO, REMOVE_TODO, TOGGLE_TODO, UPDATE_TODO};
