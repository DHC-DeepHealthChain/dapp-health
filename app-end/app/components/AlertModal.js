import React from "react";
import { View, StyleSheet, Text, Image, Modal } from "react-native";
import Button from "./Button";
import px2dp from "../common/px2dp";
import constants from "../common/constants";

const { colors } = constants;

class AlertModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const thz = this;
    const { visible, score, secondTip } = thz.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => {}}
      >
        <View style={[styles.modalContainer]}>
          <View style={styles.main}>
            <View style={styles.body}>
              <Image
                style={{
                  width: px2dp(440),
                  height: px2dp(400),
                }}
                source={require("../imgs/common/alertModal.png")}
                resizeMode="stretch"
              />
              <View style={[styles.des, secondTip ? {paddingTop: px2dp(160)} : {paddingTop: px2dp(190)}]}>
                {score && (
                  <View style={styles.text__wrap}>
                    <Text style={styles.textStyle}>恭喜您获得</Text>
                    <Text
                      style={{
                        color: colors.themeColor,
                        fontSize: px2dp(60),
                        marginLeft: px2dp(10),
                        marginRight: px2dp(10),
                        marginTop: px2dp(-20),
                      }}
                    >
                      {score}
                    </Text>
                    <Text style={styles.textStyle}>T钻</Text>
                  </View>
                )}
                {secondTip && (
                  <View style={styles.text__wrap}>
                    <Text style={styles.textStyle}>{secondTip.headText ? secondTip.headText : '计划完成获得'}</Text>
                    <Text
                      style={{
                        color: colors.themeColor,
                        fontSize: px2dp(60),
                        marginLeft: px2dp(10),
                        marginRight: px2dp(10),
                        marginTop: px2dp(-20),
                      }}
                    >
                      {secondTip.score ? secondTip.score: 0}
                    </Text>
                    <Text style={styles.textStyle}>{secondTip.endText ? secondTip.endText: 'T钻'}</Text>
                  </View>
                )}
              </View>
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
    alignItems: "center",
    padding: px2dp(40),
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  textStyle: {
    color: "#fff",
    fontSize: px2dp(30),
    textAlign: "center",
  },
  main: {
    paddingBottom: px2dp(50),
  },
  body: {},
  des: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text__wrap: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // height: px2dp(440),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AlertModal;
