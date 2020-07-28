import React from 'react';
import {createStore} from 'redux';
import Count from './Count';
import reducers from './reducers';
import {Provider} from 'react-redux';

let store = createStore(reducers);

const App = () => (
  <Provider store={store}>
    <Count />
  </Provider>
);

export default App;
