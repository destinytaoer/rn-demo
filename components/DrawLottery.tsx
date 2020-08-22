import React, {FC, memo, useState, useEffect, useCallback} from 'react';
import {View, Text, ImageBackground, Image, StyleSheet} from 'react-native';
import LotteryTurntable from './LotteryTurntable';
import {IPrize} from './types';

const itemImg = require('./assets/draw-un-selected.png');
const prizesData: IPrize[] = [
  {id: '1', source: itemImg},
  {id: '2', source: itemImg},
  {id: '3', source: itemImg},
  {id: '4', source: itemImg},
  {id: '5', source: itemImg},
  {id: '6', source: itemImg},
  {id: '7', source: itemImg},
  {id: '8', source: itemImg},
  {id: '9', source: itemImg},
  {id: '10', source: itemImg},
  {id: '11', source: itemImg},
  {id: '12', source: itemImg},
];
let count = 4;
const getPrizes = () => {
  return new Promise<IPrize[]>((resolve) => {
    setTimeout(() => {
      resolve(prizesData);
    }, 1000);
  });
};

const getWinPrize = () => {
  return new Promise<IPrize>((resolve) => {
    setTimeout(() => {
      count--;
      resolve({
        id: '6',
        source: null,
      });
    }, 1000);
  });
};

const getDrawRemainCount = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(count);
    }, 1000);
  });
};

const DrawLottery: FC = () => {
  const [prize, setPrize] = useState<IPrize | null>(null);
  const [prizes, setPrizes] = useState<IPrize[]>([]);
  const [remainCount, setRemainCount] = useState(0);

  useEffect(() => {
    async function getData() {
      const drawPrizes = await getPrizes();
      const drawRemainCount = await getDrawRemainCount();

      setPrizes(drawPrizes);
      setRemainCount(drawRemainCount);
    }
    getData();
  }, []);

  const renderItem = (item: IPrize) => {
    return (
      <>{item.source && <Image source={item.source} style={styles.prize} />}</>
    );
  };

  const handlePress = useCallback(async () => {
    const result = await getWinPrize();
    const drawRemainCount = await getDrawRemainCount();
    setPrize(result);
    setRemainCount(drawRemainCount);
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require('./assets/draw-lottery-bg.png')}
      resizeMode="stretch">
      <Text>hello</Text>
      <LotteryTurntable
        prizes={prizes}
        prize={prize}
        drawImg={require('./assets/draw-active.png')}
        drawDisbaleImg={require('./assets/draw-disable.png')}
        drawRemainCount={remainCount}
        renderItem={renderItem}
        onPress={handlePress}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 30,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  prize: {
    width: 60,
    height: 60,
  },
});

export default memo(DrawLottery);
