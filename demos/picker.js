import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';

export default () => {
  const [value, setValue] = useState('aa');
  console.log(value);
  return (
    <Picker
      selectedValue={value}
      style={styles.picker}
      onValueChange={(v) => {
        setValue(v);
      }}>
      <Picker.Item label="aa" value="aa" />
      <Picker.Item label="bb" value="bb" />
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {height: 50, width: 100},
});
