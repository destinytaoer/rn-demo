import React, {
  FC,
  memo,
  useMemo,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import {IPrize} from './types';
// import LuckDraw from './LuckDraw';
import animation from './animation';

interface IProps {
  prizes: Array<any>; // 奖品列表
  prize: IPrize | null; // 中奖奖品 ID
  renderItem: (item: IPrize) => ReactNode; // 每个奖品的渲染
  rotateTimes?: number; // 旋转次数
  drawRemainCount?: number; // 剩余次数
  drawImg: ImageSourcePropType;
  drawDisbaleImg: ImageSourcePropType;
  onPress?: () => void; // 点击立即抽奖触发
  onWinPrize?: () => void; // 抽奖成功之后触发
}

const LotteryTurntable: FC<IProps> = (props) => {
  const {
    prizes,
    prize,
    drawImg,
    drawDisbaleImg,
    rotateTimes = 4,
    drawRemainCount = 0,
    onPress,
    onWinPrize,
  } = props;

  const [activePrize, setActivePrize] = useState<string>('');

  const isBtnDisabled = drawRemainCount === 0;

  const isDrawing = useRef(false);
  const handlePress = useCallback(() => {
    if (isDrawing.current) {
      return;
    }
    onPress && onPress();
  }, [onPress]);

  const drawLottery = useCallback(() => {
    isDrawing.current = true;
    const index = prizes.findIndex((item) => item.id === prize!.id);
    const len = prizes.length;

    let count = 0;
    let minSpeed = 10;
    let maxSpeed = 4;
    let speed = minSpeed;
    // 达到这个次数时, 加速停止, 每次 speed - 1, 来达到加速效果, 所以使用 speed 来判断加速区间
    const addStop = minSpeed - maxSpeed;
    // 匀速停止
    const uniformStop = (rotateTimes - 1) * len;

    // 总跳动次数
    const total = uniformStop + index;

    setActivePrize('1');

    animation(speed, (next: (speed: number) => void, cancel: () => void) => {
      if (count < addStop) {
        // 加速
        speed--;
        next(speed);
      } else if (count >= addStop && count < uniformStop) {
        // 匀速
        next(speed);
      } else if (count >= uniformStop && count < total) {
        // 减速
        speed += 5;
        next(speed);
      } else {
        // 停止
        isDrawing.current = false;
        // 先转完 延迟100毫秒在弹出弹窗
        cancel();
        onWinPrize && onWinPrize();
        setTimeout(() => {
          setActivePrize('');
        }, 500);
        return;
      }

      count++;
      const activeId = prizes[count % len].id;
      setActivePrize(activeId);
    });
  }, [prize, onWinPrize, prizes, rotateTimes]);

  useEffect(() => {
    if (prize) {
      if (isDrawing.current) {
        return;
      }
      drawLottery();
    }
  }, [prize]);

  const drawButton = useMemo(() => {
    const source = isBtnDisabled ? drawDisbaleImg : drawImg;

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
        <ImageBackground
          style={styles.drawButton}
          source={source}
          resizeMode={'stretch'}>
          <View />
        </ImageBackground>
      </TouchableOpacity>
    );
  }, [drawDisbaleImg, drawImg, isBtnDisabled, handlePress]);

  const renderItem = (item: IPrize = {id: '', source: null}) => {
    const active = activePrize === item.id;
    return (
      <View style={styles.prize}>
        {active ? <View style={styles.mask} /> : null}
        {props.renderItem(item)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {renderItem(prizes[0])}
        {renderItem(prizes[1])}
        {renderItem(prizes[2])}
        {renderItem(prizes[3])}
      </View>
      <View style={styles.row}>
        <View style={styles.specialRow}>
          {renderItem(prizes[11])}
          {renderItem(prizes[10])}
        </View>
        {/* 抽奖按钮 */}
        {drawButton}
        <View style={styles.specialRow}>
          {renderItem(prizes[4])}
          {renderItem(prizes[5])}
        </View>
      </View>
      <View style={styles.row}>
        {renderItem(prizes[9])}
        {renderItem(prizes[8])}
        {renderItem(prizes[7])}
        {renderItem(prizes[6])}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: 140,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  specialRow: {},
  drawButton: {
    width: 130,
    height: 130,
    margin: 5,
    backgroundColor: '#ff0',
    borderRadius: 10,
  },
  prize: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: '#e3f3f3',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgb(255,202, 0)',
    opacity: 0.5,
    zIndex: 1,
  },
});

export default memo(LotteryTurntable);
