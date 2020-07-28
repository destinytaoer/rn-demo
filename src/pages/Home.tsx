import React from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {RootScreenNavigationProp} from '../navigator';

interface Props {
  navigation: RootScreenNavigationProp;
}
const Home = ({navigation}: Props) => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
