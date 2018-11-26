/**
 * Created by lenovo on 2018/1/15.
 */
import React, { Component, PropTypes } from "react";
import { View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
// import * as ScreenUtils from '../../Util/ScreenUtil';
import constants from "../common/constants";
import px2dp from "../common/px2dp";

const { colors } = constants;

export default class LoadingMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: props.isLoading
    };
  }

  // componentWillReceiveProps(nextProps) {
  //     this.setState({
  //         isLoading: nextProps.isLoading
  //     });
  // }

  render() {
    if (this.props.isLoadingState === 1) {
      return (
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            padding: px2dp(30),
          }}
        >
          <ActivityIndicator
            size="small"
            color={colors.themeColor}
            animating
            style={{ width: px2dp(15), height: px2dp(15), marginRight: px2dp(20) }}
          />
          <Text
            style={{
              color: colors.themeColor,
              fontSize: px2dp(24),
              marginLeft: px2dp(15),
            }}
          >
            正在加载...
          </Text>
        </View>
      );
    } else if( this.props.isLoadingState === 2 ) {
      return (
        <Text
          style={{
            color: colors.themeColor,
            fontSize: px2dp(24),
            alignSelf: "center",
            padding: px2dp(30),
          }}
        >
          没有更多了
        </Text>
      );
    } else if( this.props.isLoadingState === 0 ) {
      return (
        <Text
          style={{
            color: colors.themeColor,
            fontSize: px2dp(24),
            alignSelf: "center",
            padding: px2dp(30),
          }}
        >
          暂无信息
        </Text>
      );
    } else if( this.props.isLoadingState === 3 ) {
      return null;
    }
  }
}
