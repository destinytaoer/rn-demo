import React, {useEffect, useCallback, useState} from 'react';
import {View, Text} from 'react-native';

const Child = function (props) {
  console.log('hello ooo');
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default Child;
