import React, {useState, useCallback} from 'react';
import {Button, Text} from 'react-native';

export default () => {
  const [num, setNum] = useState(0);
  const handleClick = useCallback(() => setNum(num + 1), [num, setNum]);
  return (
    <>
      <Text>{num}</Text>
      <Button onPress={handleClick} title="add" />
    </>
  );
};
