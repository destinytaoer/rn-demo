import React, {useCallback, useState, memo} from 'react';
import {
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  Platform,
  View,
  StatusBar,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

let DATA = [
  {
    id: '1',
    title: '1',
  },
  {
    id: '2',
    title: '2',
  },
  {
    id: '3',
    title: '3',
  },
  {
    id: '4',
    title: '4',
  },
  {
    id: '5',
    title: '5',
  },
  {
    id: '6',
    title: '6',
  },
  {
    id: '7',
    title: '7',
  },
  {
    id: '8',
    title: '8',
  },
  {
    id: '9',
    title: '9',
  },
  {
    id: '10',
    title: '10',
  },
];

const Item = ({item, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
};

let id = 10;
function getList() {
  console.log('getList');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = [
        {
          id: ++id + '',
          title: id + '',
        },
        {
          id: ++id + '',
          title: id + '',
        },
        {
          id: ++id + '',
          title: id + '',
        },
      ];
      resolve(res);
    }, 1000);
  });
}

const Separator = () => {
  return (
    <View
      style={{
        flex: 1,
        height: 0,
        borderBottomColor: 'red',
        borderBottomWidth: 1,
      }}
    />
  );
};

const Empty = () => {
  return (
    <View
      style={{
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>暂无数据</Text>
    </View>
  );
};
export default memo(() => {
  const [data, setData] = useState(DATA);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const handlePress = () => setSelectedId(item.id);
    return <Item item={item} onPress={handlePress} style={{backgroundColor}} />;
  };

  // 下拉刷新
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(DATA);
      setRefreshing(false);
    }, 1000);
  };

  // 上拉加载
  const onUpload = async () => {
    if (data.length > 30) {
      return;
    }
    console.log('reach');
    let res = await getList();
    setData(data.concat(res));
  };

  const ListFooter = () => {
    return (
      <>
        {data.length > 30 ? (
          <View>
            <Text>没有更多了</Text>
          </View>
        ) : (
          <View>
            <ActivityIndicator />
            <Text>加载中</Text>
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={Empty}
        ListFooterComponent={ListFooter}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReachedThreshold={0.01}
        onEndReached={onUpload}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  separator: {
    marginLeft: 10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
