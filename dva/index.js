import React from 'react';
import {Provider} from 'react-redux';
import store from './model/index';
import Todo from './Todo';

export default () => {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
};
