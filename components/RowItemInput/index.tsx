import React, { FC, memo, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";

import styles from "./style";

interface IProps extends TextInputProps {
  label?: string;
  extra?: string; // 输入框右边额外的文本
  required?: boolean; // 是否必填
  textAlign?: "left" | "right"; // 文本对齐方式
  viewStyle?: ViewStyle; // 容器样式
  labelViewStyle?: ViewStyle; // label 容器样式
  inputStyle?: TextStyle;
  extraIcon?: boolean;
  onRightPress?: () => void;
  limit?: number;
}
const RowItemInput: FC<IProps> = (props) => {
  const {
    editable = true,
    label = "",
    onChangeText,
    required = false,
    textAlign = "right",
    placeholder = "请填写",
    viewStyle = {},
    labelViewStyle = {},
    inputStyle = {},
    ...rest
  } = props;

  const [value, setValue] = useState("");
  const inputNode = useRef<any>(null);

  const handleChange = (text: string) => {
    if (!("value" in props)) {
      setValue(text);
    }

    onChangeText?.(text);
  };

  const saveInputInstance = (node: any) => {
    inputNode.current = node;
  };

  /**
   * 解决安卓上滑动导致placeholder 消失问题
   */
  const handleScroll = () => {
    if (!value?.trim()) {
      inputNode.current?.clear();
    }
  };

  // 输入框样式
  const inputCls = editable
    ? { ...StyleSheet.flatten(styles.inputText), textAlign, ...inputStyle }
    : {
        ...StyleSheet.flatten(styles.inputText),
        textAlign,
        ...inputStyle,
        ...StyleSheet.flatten(styles.disabled),
      };

  // 整个容器样式
  const itemStyle = {
    ...StyleSheet.flatten(styles.inputItem),
    ...viewStyle,
  };

  const labelViewCls = {
    ...StyleSheet.flatten(styles.labelView),
    ...labelViewStyle,
  };

  return (
    <View style={itemStyle}>
      <View style={labelViewCls}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.inputView}>
        <View style={styles.inputWrap}>
          <TextInput
            {...rest}
            editable={editable}
            ref={saveInputInstance}
            style={inputCls}
            onChangeText={handleChange}
            placeholder={editable ? placeholder : ""}
            onScroll={handleScroll}
            value={value}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(RowItemInput);
