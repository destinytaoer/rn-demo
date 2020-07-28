import React, {useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Animated,
  PanResponder,
  StyleSheet,
} from 'react-native';

const PanResponderDemo = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          ...{transform: [{translateX: pan.x}, {translateY: pan.y}]},
        }}
        {...panResponder.panHandlers}>
        <View style={styles.box} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'blue',
    width: 90,
    height: 90,
  },
});

export default PanResponderDemo;
