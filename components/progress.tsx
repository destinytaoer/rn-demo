import React, {FC, memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface IProps {
  percent: number;
  text: string;
}

const Progress: FC<IProps> = (props) => {
  const {percent, text} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {text}
        {percent}%
      </Text>
      <View style={styles.progress}>
        <View style={[styles.progress, styles.progressInner, {width: 123}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {},
  progress: {
    height: 20,
    borderRadius: 10,
  },
  progressInner: {},
});

export default memo(Progress);
