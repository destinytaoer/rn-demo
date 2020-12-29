import React, { forwardRef, useContext } from "react";
import { View, Text } from "react-native";
import styles from "./style";

interface IOptions {
  id: string;
  desc: string;
}

interface IProps {
  title?: string;
  options?: IOptions[];
  values: any;
}

const FilterButtons = forwardRef<View, IProps>((props, ref) => {
  const { values } = props;

  return (
    <View ref={ref}>
      <Text>FilterButtons</Text>
    </View>
  );
});

export default FilterButtons;
