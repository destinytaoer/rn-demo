import React, {FC, memo} from 'react';
import {View, StyleSheet} from 'react-native';
import Progress from './progress';
import Roll from './roll';

const Home: FC = () => {
  return (
    <View style={styles.container}>
      {/* <Progress percent={30} text="已抢" /> */}
      <Roll />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Home);
