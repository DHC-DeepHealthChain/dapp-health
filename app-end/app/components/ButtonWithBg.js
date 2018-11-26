import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import px2dp from "../common/px2dp";
import constants from "../common/constants";
// import { relative } from "path";

const { colors } = constants;
class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const thz = this;
    const { onPress, style, textStyle } = thz.props;
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <View style={[styles.buttonStyle, style]}>
          <Image
            style={styles.bg_img}
            resizeMode="stretch"
            source={require("./../imgs/common/btnBg.png")}
          />
          <View style={styles.btn__content}>
            <Text
              style={{
                fontSize: px2dp(32),
                color: "#fff",
                textAlign: "center",
                lineHeight: px2dp(40),
                ...textStyle,
              }}
            >
              {thz.props.children}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: px2dp(100),
    // backgroundColor: colors.themeColor,
    // borderRadius: px2dp(10),
    // marginHorizontal: px2dp(20),
  },
  bg_img: {
    width: "100%",
    height: "100%",
  },
  btn__content: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // textAlignVertical: "center",
    paddingHorizontal: px2dp(10),
    paddingBottom: px2dp(10),
  },
});

export default Button;
