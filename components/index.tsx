import React, { FC, memo, useState } from "react";
import { View, Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import Progress from './progress';
// import Roll from './roll';
import Modal from "./KsModal";
import RowItemInput from "./RowItemInput";

const Home: FC = () => {
  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(false);
  };

  const show = () => {
    setVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="haha" onPress={show} />
      <Modal direction="bottom" visible={visible} requestClose={hide}>
        <View style={styles.container}>
          <RowItemInput keyboardType="numeric" />
          <RowItemInput keyboardType="numeric" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    height: 200,
    backgroundColor: "red",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default memo(Home);
