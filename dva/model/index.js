import {create} from 'dva-core';
import home from './home';

// init
const app = create();

// models
app.model(home);

// start
app.start();

export default app._store;
