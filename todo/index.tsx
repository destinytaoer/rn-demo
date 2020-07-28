import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import reducers from './reducers';
import Todo from './Todo';

const store = createStore(reducers);

const index: FC = () => {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
};

export default index;
