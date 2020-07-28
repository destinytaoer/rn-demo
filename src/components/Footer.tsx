import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import {getRealSize as S} from '../utils/utils';
import IconBtn from './IconBtn';
import Icon from '../utils/setIcon';
import {
  TabNavigationState,
  NavigationHelpers,
  ParamListBase,
} from '@react-navigation/native';

import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs/lib/typescript/src/types';

interface Props {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  state: TabNavigationState;
}

const Footer = ({navigation, state}: Props) => {
  // const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.footer}>
        <IconBtn
          text="主页"
          icon="homepage"
          iconSize={S(40)}
          onPress={() => navigation.navigate('Home')}
          isActived={state.index === 0}
        />
        <IconBtn
          text="沟通"
          icon="goutong"
          iconSize={S(40)}
          onPress={() => navigation.navigate('Communicate')}
          isActived={state.index === 1}
        />
        <TouchableHighlight
          style={styles.middleBtn}
          onPress={() => navigation.navigate('NewInquiry')}>
          <View>
            <View style={styles.iconWrap}>
              <Icon name="plus" size={S(42)} style={styles.icon} />
            </View>
            <Text style={styles.text}>发布询价</Text>
          </View>
        </TouchableHighlight>
        <IconBtn
          style={styles.active}
          text="询价单"
          icon="money"
          onPress={() => navigation.navigate('Inquiry')}
          iconSize={S(40)}
          isActived={state.index === 2}
        />
        <IconBtn
          text="我的"
          icon="me"
          iconSize={S(40)}
          onPress={() => navigation.navigate('Profile')}
          isActived={state.index === 3}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: S(100),
    paddingBottom: S(10),
    paddingTop: S(17),
  },
  middleBtn: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  iconWrap: {
    position: 'absolute',
    top: S(-102),
    width: S(90),
    height: S(90),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: S(90),
    backgroundColor:
      'linear-gradient(270deg,rgba(255,68,51,1) 0%,rgba(243,39,39,1) 100%)',
  },
  icon: {
    color: '#fff',
  },
  text: {
    marginTop: 'auto',
    color: '#222',
    textAlign: 'center',
    fontSize: S(20),
  },
  active: {
    color: '#F42C2C',
  },
});

export default Footer;
