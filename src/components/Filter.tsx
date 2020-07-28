import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  RefForwardingComponent,
  useRef,
} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableHighlight,
  Animated,
} from 'react-native';
import {params} from './App';
import {getRealSize as S} from '@/utils/utils';

interface Props {}
const Filter: RefForwardingComponent<params, Props> = (props, ref) => {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(S(750))).current;

  useImperativeHandle(ref, () => ({
    showModal: () => {
      slideIn();
    },
  }));

  const slideIn = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: S(750),
      duration: 300,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        setVisible(false);
      }
    });
  };

  return (
    <Modal visible={visible} transparent>
      <Animated.View
        style={{...styles.container, transform: [{translateX: slideAnim}]}}>
        <TouchableHighlight
          underlayColor="rgba(0, 0, 0, .2)"
          onPress={() => slideOut()}>
          <View style={styles.empty} />
        </TouchableHighlight>
        <SafeAreaView style={styles.content}>
          <Text>Filter</Text>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },
  empty: {
    width: S(70),
    // height: '100%',
  },
  content: {
    flex: 1,
    // height: '100%',
    backgroundColor: '#fff',
  },
});

export default forwardRef(Filter);
