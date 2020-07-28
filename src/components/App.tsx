/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, createContext} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';

import Header from './Header';
import List from './List';
import Filter from './Filter';

export interface params {
  showModal: () => void;
}

export const context = createContext<params>({showModal: () => {}});

const App = () => {
  const childRef = useRef<params>({
    showModal: () => {},
  });
  console.log(childRef);
  childRef.current.showModal();
  return (
    <SafeAreaView style={styles.container}>
      <context.Provider value={{showModal: () => childRef.current.showModal()}}>
        <Header />
        <List />
        <Filter ref={childRef} />
      </context.Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
