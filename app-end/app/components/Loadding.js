import React, { Component } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import constants from "../common/constants";
import px2dp from "../common/px2dp";
import Spinner from "react-native-loading-spinner-overlay";

const { colors } = constants;

export default class Loadding extends Component {
  static defaultProps = {
    visible: false,
    cancelable: false,
    textContent: "加载中...",
    animation: "none",
    color: constants.colors.themeColor,
    size: "large", // 'normal',
    overlayColor: "rgba(0, 0, 0, 0.25)",
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderDefaultContent = () => {
    return (
      <View style={styles.background}>
        <View style={styles.loadding__wrap}>
          <ActivityIndicator
            color={this.props.color}
            size={this.props.size}
            style={[{}]}
          />
          <View style={styles.textContainer}>
            <Text style={[styles.textContent, this.props.textStyle]}>
              {this.props.textContent}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const thz = this;
    const { visible } = thz.props;
    return (
      <View style={{}}>
        <Spinner visible={visible}>{thz.renderDefaultContent()}</Spinner>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  loadding__wrap: {
    width: px2dp(600),
    paddingVertical: px2dp(50),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: px2dp(5),
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    paddingHorizontal: px2dp(20),
  },
  textContent: {
    fontSize: px2dp(28),
    textAlign: 'left',
  },
});
