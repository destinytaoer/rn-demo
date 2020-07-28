import React, {useState, useCallback} from 'react';
import {Text, TextInput} from 'react-native';

export default () => {
  const [text, setText] = useState('');
  const handleChange = useCallback((t) => setText(t), [setText]);
  return (
    <>
      <TextInput onChangeText={handleChange} placeholder="写些啥呢" />
      <Text>{text}</Text>
    </>
  );
};
