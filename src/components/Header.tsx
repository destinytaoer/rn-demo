import React, {useContext} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {getRealSize as S} from '../utils/utils';
import IconBtn from './IconBtn';
import Icon from '../utils/setIcon';
import {context} from './App';

const Header = () => {
  const showModal = useContext(context).showModal;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backBtn}>
          <Icon name="back" size={S(39)} />
        </View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>询价单</Text>
        </View>
        <View style={styles.rightBtns}>
          <IconBtn
            style={styles.rightBtn}
            icon="car"
            iconSize={S(32)}
            text="车主报价"
            onPress={() => {}}
          />
          <IconBtn
            style={styles.rightBtn}
            icon="Filter"
            iconSize={S(32)}
            text="追加"
            onPress={() => showModal()}
          />
        </View>
      </View>
      <View style={styles.search}>
        <Icon style={styles.searchIcon} name="search" size={S(28)} />
        <TextInput
          style={styles.searchInput}
          clearButtonMode="while-editing"
          placeholder="搜索"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: S(20),
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: S(25),
    paddingVertical: S(27),
  },
  backBtn: {
    position: 'absolute',
    left: S(30),
    top: S(24),
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: S(34),
  },
  rightBtns: {
    position: 'absolute',
    right: S(20),
    top: S(13),
    flexDirection: 'row',
  },
  rightBtn: {
    alignItems: 'center',
    marginLeft: S(32),
  },
  search: {
    height: S(70),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: S(33),
    marginHorizontal: S(31),
    marginVertical: S(22),
    backgroundColor: 'rgba(243, 243, 243, 1)',
    borderRadius: S(100),
  },
  searchIcon: {
    width: S(28),
    height: S(28),
    marginRight: S(12),
  },
  searchInput: {
    flex: 1,
    height: S(70),
    fontSize: S(26),
    color: '#222',
  },
});

export default Header;
