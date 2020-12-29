import { StyleSheet } from "react-native";
import { MainColor } from "./theme";

// 容器组件统一样式
export default StyleSheet.create({
  page: {
    flex: 1,
  },
});

export const MainStyle = {
  container: {
    flex: 1,
    backgroundColor: MainColor.GLOBAL_BG,
  },
};
