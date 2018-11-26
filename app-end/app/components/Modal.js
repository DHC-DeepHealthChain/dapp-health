import React from "react";
import { View, StyleSheet, Text, Image, Modal } from "react-native";
import Button from "./Button";
import px2dp from "../common/px2dp";
import constants from "../common/constants";

const { colors } = constants;

class MyModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const thz = this;
    const { visible, onOk, okText, onCancel, cancelText, style } = thz.props;
    return (
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={() => {
          onCancel && onCancel();
        }}
      >
        <View style={[styles.modalContainer]}>
          <View style={[styles.modalInnerContainer, style]}>
            {thz.props.children}
            <View style={styles.btnGroup}>
              {!cancelText ? null : (
                <Button
                  textStyle={{ color: "#959595" }}
                  style={[styles.btnStyle, styles.cancelBtn]}
                  onPress={() => {
                    onCancel && onCancel();
                  }}
                >
                  {cancelText || "Cancel"}
                </Button>
              )}
              <Button
                style={{ marginLeft: px2dp(30), width: px2dp(300) }}
                onPress={() => {
                  onOk && onOk();
                }}
              >
                {okText || "OK"}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: px2dp(40),
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  modalInnerContainer: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: px2dp(40),
  },
  btnStyle: {
    width: px2dp(260),
  },
  btnGroup: {
    flexDirection: "row",
    marginTop: px2dp(50),
  },
  cancelBtn: {
    backgroundColor: "#fff",
    borderWidth: px2dp(2),
    borderColor: "#ddd",
  },
});

export default MyModal;
