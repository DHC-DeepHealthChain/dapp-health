import React from "react";
import { connect } from "react-redux";
import VerificationCodeLogin from "../pages/VerificationCodeLogin";

class VerificationCodeLoginContainer extends React.Component {
  static navigationOptions = () => {
    return {
      headerMode: "none",
      header: null,
    };
  };

  render() {
    return <VerificationCodeLogin {...this.props} />;
  }
}

export default connect(state => {
  const { user, reset } = state;
  return {
    user,
    reset,
  };
})(VerificationCodeLoginContainer);
