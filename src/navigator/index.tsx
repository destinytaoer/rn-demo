import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@/pages/Home';
import Detail from '@/pages/Detail';
import Profile from '@/pages/Profile';
import Inquiry from '@/pages/Inquiry';
import Communicate from '@/pages/Communicate';
import NewInquiry from '@/pages/NewInquiry';
import Footer from '@/components/Footer';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export type RootStackParamList = {
  Home: undefined;
  Detail: {id: number};
  NewInquiry: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  Inquiry: undefined;
  Communicate: undefined;
};

export type RootScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();
// const Drawer = createDrawerNavigator();

function HomeTab() {
  return (
    <Tab.Navigator
      initialRouteName="Inquiry"
      tabBar={({navigation, state}) => (
        <Footer navigation={navigation} state={state} />
      )}
      screenOptions={
        {
          // tabBarVisible: false,
        }
      }>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Communicate" component={Communicate} />
      <Tab.Screen name="Inquiry" component={Inquiry} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const Navigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeTab} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="NewInquiry" component={NewInquiry} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigator;
