import React from "react";
import { connect } from "react-redux";
import { Image, StyleSheet } from "react-native";
import UserCenter from "../pages/UserCenter";
import px2dp from "../common/px2dp";

class UserCenterContainer extends React.Component {
  static navigationOptions = {
    header: null,
    title: "我的",
    tabBarIcon: ({ focused }) => (
      <Image
        resizeMode="stretch"
        style={styles.tab_item_img}
        source={focused ? require('../imgs/homeTab/userCenter.png') : require('../imgs/homeTab/userCenter-o.png')}
      />
    ),
  };
  render() {
    return <UserCenter {...this.props} />;
  }
}
const styles = StyleSheet.create({
  tab_item_img: {
    width: px2dp(38),
    height: px2dp(38),
  },
});
export default connect(state => {
  const { user, userCenter } = state;
  return {
    user,
    userInfo: userCenter.userInfo,
  };
})(UserCenterContainer);
