import {
  ADD_TODO,
  REMOVE_TODO,
  TodoInterface,
  UPDATE_TODO,
  TOGGLE_TODO,
} from './types';

export function addTodo(text: string) {
  return {
    type: ADD_TODO,
    payload: text,
  };
}

export function removeTodo(id: string) {
  return {
    type: REMOVE_TODO,
    payload: id,
  };
}

export function updateTodo(todo: TodoInterface) {
  return {
    type: UPDATE_TODO,
    payload: todo,
  };
}

export function toggleTodo(id: string) {
  return {
    type: TOGGLE_TODO,
    payload: id,
  };
}
