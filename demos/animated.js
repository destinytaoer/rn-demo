import React, {useRef} from 'react';
import {Animated, View, Button, Text, StyleSheet} from 'react-native';

export default () => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.fadingContainer,
          opacity: fadeAnim,
          transform: [{translateX: slideAnim}],
        }}>
        <Text>Hello World</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="slideIn" onPress={slideIn} />
        <Button title="slideOut" onPress={slideOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fadingContainer: {
    position: 'relative',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 16,
  },
});
