import { StyleSheet } from "react-native";
import { getRealSize as S } from "@utils/designUtil";
import { MainColor } from "@styles/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: S(30),
  },
  part: {
    paddingVertical: S(30),
    borderBottomColor: MainColor.DIVIDE_LINE_BG,
    borderBottomWidth: S(1),
  },
  row: {
    flexDirection: "row",
  },
  hasMargin: {
    marginBottom: S(24),
  },
  hasMargin32: {
    marginBottom: S(32),
  },
  hasMargin16: {
    marginBottom: S(16),
  },
  between: {
    justifyContent: "space-between",
  },
  end: {
    justifyContent: "flex-end",
  },
  titleWrapper: {
    width: S(286),
    marginRight: S(10),
  },
  descWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  partsName: {
    fontSize: S(28),
    fontFamily: "PingFangSC-Medium",
    color: MainColor.SECONDARY_BLACK,
  },
  count: {
    fontSize: S(28),
    fontFamily: "PingFangSC-Medium",
    color: MainColor.SECONDARY_BLACK,
  },
  price: {
    fontSize: S(28),
    fontFamily: "PingFangSC-Medium",
    color: MainColor.SECONDARY_BLACK,
  },
  stockNo: {
    fontSize: S(24),
    color: MainColor.SECONDARY_GRAY,
  },
  warehouse: {
    fontSize: S(24),
    color: MainColor.SECONDARY_GRAY,
  },
  tax: {
    fontSize: S(24),
    color: MainColor.SECONDARY_GRAY,
  },
  discount: {
    fontSize: S(28),
    color: MainColor.INFO_RED,
  },
});
