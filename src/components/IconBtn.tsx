import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {getRealSize as S} from '@/utils/utils';
import Icon from '@/utils/setIcon';
import {} from 'react-native-gesture-handler';

interface Props {
  text: string;
  icon: string;
  iconSize: number;
  style?: object;
  isActived?: boolean;
  onPress?: () => void;
}
const IconBtn = ({
  text,
  icon,
  iconSize,
  style,
  isActived = false,
  onPress,
}: Props) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="white">
      <View style={[styles.container, style]}>
        <Icon
          style={{
            ...styles.icon,
            ...{color: isActived ? '#F42C2C' : '#222222'},
          }}
          name={icon}
          size={iconSize}
          color={'#999'}
        />
        <Text
          style={{
            ...styles.text,
            ...{color: isActived ? '#F42C2C' : '#222222'},
          }}>
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: S(6),
  },
  text: {
    fontSize: S(20),
  },
});

export default IconBtn;
