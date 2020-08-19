import React, {FC, useRef, useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';

const data = [
  '恭喜 xxx 获得 xxx 1',
  '恭喜 xxx 获得 xxx 2',
  '恭喜 xxx 获得 xxx 3',
  '恭喜 xxx 获得 xxx 4',
];

interface IProps {
  rollLength?: number;
  itemHeight?: number;
}

const Roll: FC<IProps> = (props) => {
  const {rollLength = 3, itemHeight = 30} = props;

  const rollAnimRef = useRef(new Animated.Value(0));
  const [viewData, setViewData] = useState(data);

  // useEffect(() => {
  //   return () => rollAnim.stopAnimation();
  // }, [rollAnim]);

  useEffect(() => {
    const roll = (index: number, total: number) => {
      let len = index + 1;
      let animation = Animated.timing(rollAnimRef.current, {
        toValue: -itemHeight * len, // 变化值
        duration: 500, // 动画时间
        delay: 1000, // 延时时间
        easing: Easing.linear, // 缓动函数
        useNativeDriver: true,
      });
      animation.start(({finished}) => {
        // finished 表示动画是否完成
        // 动画被 stop 或者动画完成触发这个回调
        if (finished) {
          if (len >= total) {
            rollAnimRef.current.setValue(0);
            roll(0, total);
          } else {
            // 循环动画
            roll(len, total);
          }
        }
      });
      // 将这个动画对象返回，用于停止动画
      return animation;
    };
    let animation: Animated.CompositeAnimation;
    if (data.length > rollLength) {
      // 如果满足了动画条件，则数据后面补上可视区数量的数据，方便滚动
      setViewData(data.concat(data.slice(0, rollLength)));
      animation = roll(0, data.length);
    } else {
      setViewData(data);
    }
    return () => {
      animation.stop();
    };
  }, [itemHeight, rollLength]);

  const renderItem = (item: string, index: number) => {
    return (
      <View style={styles.itemWrapper} key={index}>
        <Text style={styles.text}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, {maxHeight: itemHeight * rollLength}]}>
      <Animated.View
        style={{
          transform: [{translateY: rollAnimRef.current}],
        }}>
        {viewData.map((item, index) => renderItem(item, index))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'red',
  },
  itemWrapper: {
    justifyContent: 'center',
    height: 30,
  },
  text: {
    fontSize: 16,
  },
  highlightText: {},
});

export default Roll;
