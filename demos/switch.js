import React, {useState} from 'react';
import {Switch} from 'react-native';

export default () => {
  const [value, setValue] = useState(false);
  return <Switch value={value} onValueChange={(v) => setValue(v)} />;
};
