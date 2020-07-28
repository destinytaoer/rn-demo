import types, {StateInterface, ActionInterface} from './types';
import {genId} from './utils';

const initalState: StateInterface = {
  todos: [],
};

function reducers(
  state = initalState,
  action: ActionInterface,
): StateInterface {
  const {type, payload} = action;
  console.log(state);
  switch (type) {
    case types.ADD_TODO:
      return {
        todos: [
          ...state.todos,
          {isComplete: false, text: payload, id: genId()},
        ],
      };
    case types.REMOVE_TODO:
      return {
        todos: state.todos.filter((item) => {
          return item.id !== payload;
        }),
      };
    case types.UPDATE_TODO:
      return {
        todos: state.todos.map((item) => {
          if (item.id === payload.id) {
            item.text = payload.text;
          }
          return item;
        }),
      };
    case types.TOGGLE_TODO:
      return {
        todos: state.todos.map((item) => {
          if (item.id === payload) {
            item.isComplete = !item.isComplete;
          }
          return item;
        }),
      };
    default:
      return state;
  }
}

export default reducers;
