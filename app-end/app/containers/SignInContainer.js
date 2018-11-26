import React from "react";
import { connect } from "react-redux";
import SignIn from "../pages/SignIn";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class SignInContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <BackHeader
          title="每日签到"
          hasBorder
          backPress={() => {
            navigation.goBack()
          }}
        />),
    };
  };

  render() {
    return <SignIn {...this.props} />;
  }
}


export default connect(state => {
  const { user, signIn } = state;
  return {
    user,
    signIn,
  };
})(SignInContainer);
