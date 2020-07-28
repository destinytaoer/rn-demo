import React from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {RootStackParamList, RootScreenNavigationProp} from '../navigator';
import {RouteProp} from '@react-navigation/native';

interface Props {
  route: RouteProp<RootStackParamList, 'Detail'>;
  navigation: RootScreenNavigationProp;
}

const Detail = ({navigation, route}: Props) => {
  return (
    <SafeAreaView>
      <Text>Detail {route.params.id}</Text>
      <Button
        title="返回"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default Detail;
