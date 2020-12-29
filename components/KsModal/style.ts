import { StyleSheet } from "react-native";
// import { Device } from "@src/native";
// import { MainColor } from "@src/styles/theme";

// areaHeight 是用来抵消手机底部或者顶部的空白
// const areaHeight = Device.isIphoneX ? Device.getBottomPadding() : 0;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
  },

  container__top: {
    justifyContent: "flex-start",
  },

  container__center: {
    justifyContent: "center",
  },

  container__bottom: {
    justifyContent: "flex-end",
  },

  areaView: {
    height: 0,
    backgroundColor: "#fff",
  },
});
