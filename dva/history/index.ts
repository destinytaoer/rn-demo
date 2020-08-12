import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import Navigator from '@navigator/index';
import store from '@config/dva';
import '@config/http';

export default () => (
  <Provider store={store}>
    <Navigator />
    <StatusBar // 设置 Android 状态栏样式
      backgroundColor="transparent"
      barStyle="dark-content"
      translucent
    />
  </Provider>
);
