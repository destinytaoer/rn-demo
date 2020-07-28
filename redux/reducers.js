export default function reducers(state = {count: 0}, action) {
  const {type, payload} = action;
  switch (type) {
    case 'INCREMENT':
      return {...state, count: state.count + payload};
    case 'DECREMENT':
      return {...state, count: state.count - payload};
    default:
      return state;
  }
}
