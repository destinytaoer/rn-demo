import React, { Component } from "react";
import {
  TouchableWithoutFeedback,
  View,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./style";

type TDirectionType = "top" | "bottom" | "center";
type TAnimationType = "fade" | "slide" | "none";

interface IProps {
  visible: boolean; // modal 是否开启
  animationType?: TAnimationType; // 动画类型
  requestClose: () => void; // 请求关闭modal
  direction?: TDirectionType;
}

interface IState {}

// 获取样式
function getContainerStyle(direction: TDirectionType) {
  switch (direction) {
    case "top":
      return [styles.container, styles.container__top];
    case "center":
      return [styles.container, styles.container__center];
    default:
      return [styles.container, styles.container__bottom];
  }
}
class KsModal extends Component<IProps, IState> {
  handleSwitchModal = () => {
    this.props.requestClose();
  };
  render() {
    const {
      visible,
      animationType = "fade",
      children,
      direction = "bottom",
    } = this.props;
    const subElement = children as any;
    const child = React.cloneElement(subElement, { key: "$0" });
    const contents = [child, <View style={styles.areaView} key={"$1"} />];
    let content: any = child;
    if (direction === "bottom") {
      content = contents;
    }
    if (direction === "top") {
      content = contents.reverse();
    }
    const containerStyle = getContainerStyle(direction);
    return (
      <Modal
        visible={visible}
        onRequestClose={this.handleSwitchModal}
        animationType={animationType}
        statusBarTranslucent
        hardwareAccelerated
        transparent>
        <TouchableWithoutFeedback onPress={this.handleSwitchModal}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={containerStyle}>
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <SafeAreaView style={{ backgroundColor: "lightblue" }}>
                {content}
              </SafeAreaView>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

export default KsModal;
