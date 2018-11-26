import React from "react";
import {View, StyleSheet, Text, Image, ScrollView, TouchableOpacity} from "react-native";
import px2dp from "../common/px2dp";
import constants from "../common/constants";

const {colors} = constants;
class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const thz = this;
    const { onPress, style, textStyle } = thz.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={ onPress }
        style={[styles.buttonStyle, style]}>
        { thz.props.icon ? thz.props.icon : null }
        <Text style={{fontSize: 16, color: "#fff", ...textStyle}}>{ thz.props.children }</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: px2dp(70),
    backgroundColor: colors.themeColor,
    borderRadius: px2dp(10),
    // marginHorizontal: px2dp(20),
  },
});

export default Button;
