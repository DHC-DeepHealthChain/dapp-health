import React from "react";
import { connect } from "react-redux";
import AccountManage from "../pages/AccountManage";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class AccountManageContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <BackHeader
          title="账号管理"
          hasBorder
          backPress={() => {
            navigation.goBack()
          }}
        />),
    };
  };

  render() {
    return <AccountManage {...this.props} />;
  }
}


export default connect(state => {
  const { user, userCenter } = state;
  return {
    user,
    userInfo: userCenter.userInfo,
  };
})(AccountManageContainer);
