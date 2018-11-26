import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  //   Platform,
  //   Vibration,
  TouchableOpacity,
  Animated,
  Easing,
  //   Dimensions,
} from "react-native";

import px2dp from "../common/px2dp";

export default class Diamond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeInOpacity: new Animated.Value(0), // 初始值
      slideOut: new Animated.Value(0), // 初始值
      currentToValue: 1,
      isEndAnimation: false, // 结束动画标记
    };
    this.diamondAnimation = this.diamondAnimation.bind(this);
    this.handleOnpress = this.handleOnpress.bind(this);
  }

  componentDidMount() {
    this.diamondAnimation(false);
  }

  componentWillUnmount() {
    this.diamondAnimation(true);
  }

  // 开始动画，循环播放
  diamondAnimation(isEnd) {
    const thz = this;
    Animated.timing(this.state.fadeInOpacity, {
      toValue: thz.state.currentToValue,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      if (isEnd) {
        this.setState({
          isEndAnimation: true,
        });
        return;
      }
      if (!this.state.isEndAnimation) {
        let flag;
        thz.setState(
          pre => {
            flag = pre.currentToValue === 0 ? 1 : 0;
            return {
              ...pre,
              currentToValue: flag,
            };
          },
          () => {
            this.state.fadeInOpacity.setValue(flag === 0 ? 1 : 0);
            this.diamondAnimation(false);
          }
        );
      }
    });
  }

  /* 点击钻石 */
  handleOnpress() {
    const thz = this;
    if( thz.props.preventOut === true ) { return false }
    thz.setState({ isEndAnimation: true });

    Animated.timing(thz.state.slideOut, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      if (thz.props.onPress) {
        thz.props.onPress();
      }
    });
  }

  render() {
    const thz = this;
    const { label, position } = thz.props;

    return (
      <Animated.View
        style={[
          styles.diamondContainer,
          position && {
            top: position.top,
            left: position.left,
          },
          position && styles.diamondAbsolute,
          {
            // opacity: 1,
            transform: [
              {
                translateY: this.state.slideOut.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, px2dp(-1000)],
                }),
              },
            ],
          },
        ]}
      >
        <Animated.View
          style={[
            // styles.diamondContainer,
            {
              // opacity: 1,
              transform: [
                {
                  translateY: this.state.fadeInOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, px2dp(20)],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={thz.handleOnpress}
            style={[styles.diamondStyle]}
          >
            <Image
              style={{
                width: px2dp(80),
                height: px2dp(80),
                marginBottom: px2dp(10),
              }}
              source={require("../imgs/newHome/diamond_ball.png")}
              resizeMode="stretch"
            />
            <Text style={[styles.textStyle, { fontSize: px2dp(22) }]}>
              {label || ""}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: "#fff",
  },
  diamondContainer: {
    padding: px2dp(20),
  },
  diamondAbsolute: {
    position: "absolute",
  },
  diamondStyle: {
    alignItems: "center",
  },
});
