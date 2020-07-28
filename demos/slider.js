import React, {useState, useCallback} from 'react';
import {StyleSheet, Text} from 'react-native';
import Slider from '@react-native-community/slider';

export default () => {
  const [value, setValue] = useState(0);

  const handleChange = useCallback((v) => setValue(v), [setValue]);
  return (
    <>
      <Text>{value}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor="red"
        maximumTrackTintColor="#000000"
        onValueChange={handleChange}
        // inverted
        thumbTintColor="lightblue"
      />
    </>
  );
};

const styles = StyleSheet.create({
  slider: {width: 200, height: 40},
});
