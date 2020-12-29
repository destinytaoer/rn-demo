import { StyleSheet } from "react-native";

export default StyleSheet.create({
  inputItem: {
    height: 100,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
  },

  labelView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },

  labelIcon: {
    width: 17,
    height: 20,
    marginRight: 5,
  },

  // label 文本
  labelText: {
    fontSize: 20,
    color: "#000",
  },

  // 输入框主体
  inputView: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  inputWrap: {
    flex: 1,
  },

  // 输入框样式
  inputText: {
    padding: 0,
    paddingHorizontal: 10,
    fontSize: 20,
    color: "#000",
  },

  // 额外文本区域
  extraView: {
    minWidth: 35,
    marginLeft: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  // 文本禁用样式
  disabled: {
    color: "#eee",
  },
});
