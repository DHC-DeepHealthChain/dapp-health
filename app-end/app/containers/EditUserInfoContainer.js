import React from "react";
import { connect } from "react-redux";
import EditUserInfo from "../pages/EditUserInfo";
// import Tools from '../common/tools'

class EditUserInfoContainer extends React.Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };
  render() {
    return <EditUserInfo {...this.props} />;
  }
}

export default connect(state => {
  const { user, userCenter, personalInfo } = state;
  return {
    user,
    userInfo: userCenter.userInfo,
    personalInfo,
  };
})(EditUserInfoContainer);
