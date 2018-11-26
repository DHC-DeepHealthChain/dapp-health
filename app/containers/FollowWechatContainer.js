import React from "react";
import { connect } from "react-redux";
import FollowWechat from "../pages/FollowWechat";

class FollowWechatContainer extends React.Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  render() {
    return <FollowWechat {...this.props} />;
  }
}


export default connect(state => {
  const { user, userCenter } = state;
  return {
    user,
    userCenter,
  };
})(FollowWechatContainer);
