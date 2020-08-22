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
import LuckDraw from './LuckDraw';

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
    rotateTimes = 3,
    drawRemainCount = 0,
    onPress,
    onWinPrize,
  } = props;

  const [activePrize, setActivePrize] = useState('1');

  const isBtnDisabled = drawRemainCount === 0;

  const isDrawing = useRef(false);
  const handlePress = useCallback(() => {
    if (isDrawing.current) {
      return;
    }
    onPress && onPress();
  }, [onPress]);

  const drawLottery = useCallback(() => {
    // const rotateDir = [
    //   {index: 0, next: 1},
    //   {index: 1, next: 2},
    //   {index: 2, next: 3},
    //   {index: 3, next: 4},
    //   {index: 4, next: 5},
    //   {index: 5, next: 6},
    //   {index: 6, next: 7},
    //   {index: 7, next: 8},
    //   {index: 8, next: 9},
    //   {index: 9, next: 10},
    //   {index: 10, next: 11},
    //   {index: 11, next: 0},
    // ];

    // 初始化抽奖, 3代表圈数， 8代表速度，也代表时间片的个数
    // const luckDrawFn = new LuckDraw(prizes, rotateDir, 3, 8);

    // 中奖id，请求服务端接口拿到

    // luckDrawFn.run(
    //   prize!.id, //中奖id
    //   (params: IPrize) => {
    //     // 停留在当前格子的回调函数
    //     // 拿到当前 active 状态的 id
    //     setActivePrize(params.id);
    //     console.log('xxx');
    //   },
    //   (params: IPrize) => {
    //     // 最终停止的回调函数
    //     //最后转盘停止的地方，可以弹出奖励弹框或其他操作
    //     setActivePrize(params.id);
    //   },
    // );
    isDrawing.current = true;
    let rotated = 0;
    let activeNumber = 0;
    let activeId: string;
    const prizesNumber = prizes.length;
    let timer: number;
    timer = requestAnimationFrame(step);
    // 通过定时器 嵌套控制旋转的速度
    // 没有库存的情况需要跳过
    function step() {
      if (rotated > rotateTimes - 1) {
        clearInterval(interval);
        interval = setInterval(() => {
          if (rotated > rotateTimes) {
            isDrawing.current = false;
            clearInterval(interval);
            return;
          }
          if (activeNumber >= prizesNumber - 1) {
            rotated += 1;
            activeNumber = 0;
            activeId = prizes[activeNumber].id;
          } else {
            activeNumber += 1;
            activeId = prizes[activeNumber].id;
          }
          setActivePrize(activeId);
          if (prize!.id === activeId) {
            isDrawing.current = false;
            clearInterval(interval);
            // 先转完 延迟100毫秒在弹出弹窗
            setTimeout(() => {
              onWinPrize && onWinPrize();
            }, 500);
          }
        }, 200);
        return;
      }
      if (activeNumber >= prizesNumber - 1) {
        rotated += 1;
        activeNumber = 0;
        activeId = prizes[activeNumber].id;
      } else {
        activeNumber += 1;
        activeId = prizes[activeNumber].id;
      }
      console.log(activeId, activeNumber);
      setActivePrize(activeId);
    }
  }, [prize, onWinPrize, prizes, rotateTimes]);

  useEffect(() => {
    if (prize) {
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
    // backgroundColor: '#ff0',
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
    // backgroundColor: '#e3f3f3',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    zIndex: 1,
  },
});

export default memo(LotteryTurntable);
