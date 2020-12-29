import { StyleSheet } from "react-native";
import { getRealSize as S } from "@utils/designUtil";

// 文字大小
export const TextSize = {
  TITLE_LG: S(36), // 大标题
  TTILE_MD: S(30), // 中等标题大小
  TITLE_BASE: S(28), //  标题基本大小
  TITLE_SM: S(26), // 小标题

  TEXT_SMALL: S(24), //  小文字
  TEXT_TINY: S(22), //  超小文字
  TEXT_MICRO: S(20), // 微型字体

  AMOUNT: S(32),
};

// 字重
export const TextWeight: ITextWeight = {
  NORMAL: "400",
  BASE: "500",
  Thin: "100",
  EXTRA_LIGHT: "200", // 其他：Ultra Light
  LIGHT: "300",
  REGULAR: "400",
  MEDIUM: "500",
  SEMI_BOLD: "600", // 其他：Demi Bold
  BOLD: "700",
  EXTRA_BOLD: "800", // Ultra Bold
  BLACK: "900", // 其他：heavy
};
type WeightType =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | undefined;
interface ITextWeight {
  [key: string]: WeightType;
}

export const BorderWidth = {
  THIN: StyleSheet.hairlineWidth,
  NORMAL: StyleSheet.hairlineWidth * 2,
};
