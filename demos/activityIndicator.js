import React from 'react';
import {ActivityIndicator} from 'react-native';

export default () => {
  return (
    <ActivityIndicator
      size="large"
      color="red"
      animating={false}
      // hidesWhenStopped={false}
    />
  );
};
