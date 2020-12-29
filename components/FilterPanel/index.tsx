import React, { FC, createContext } from "react";
import { View, Text } from "react-native";
import FilterButtons from "./FilterButtons";
import styles from "./style";

interface IProps {
  visible: boolean;
}

interface IContext {
  values: object;
}
export const FilterContext = createContext<IContext>({ values: {} });

const FilterPanel: FC<IProps> = (props) => {
  const { visible } = props;

  if (!visible) return null;

  return (
    <View>
      <Text>FilterPanel</Text>
      <FilterButtons values={{ a: 1 }} />
    </View>
  );
};
FilterPanel.defaultProps = {};

export default FilterPanel;
