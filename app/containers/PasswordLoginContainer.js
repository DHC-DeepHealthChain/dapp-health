import React from "react";
import { connect } from "react-redux";
import PasswordLogin from "../pages/PasswordLogin";
import { Image, StyleSheet } from "react-native";
import BackHeader from "../components/BackHeader";
import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class PasswordLoginContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerMode: "none",
      header: null,
    };
  };

  render() {
    return <PasswordLogin {...this.props} />;
  }
}

const styles = StyleSheet.create({
  tab_item_img: {
    width: px2dp(34),
    height: px2dp(41),
  },
});
/*
*
 titleRight={'手机登录'}
 nextPress={() => {
 navigation.navigate('PhoneLogin')
 }}
* */
export default connect(state => {
  const { UserCenter, UtilState, user } = state;
  return {
    UserCenter,
    UtilState,
    user,
  };
})(PasswordLoginContainer);
