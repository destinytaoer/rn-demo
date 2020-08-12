let id = 1;
export default {
  namespace: 'home',
  state: {
    todos: [],
  },
  reducers: {
    addTodo(state, {payload}) {
      console.log(state);
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: id++ + '',
            text: payload,
            completed: false,
          },
        ],
      };
    },
    removeTodo(state, {payload}) {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload),
      };
    },
  },
  effects: {},
};
