import React from "react";
import { connect } from "react-redux";
import InviteCode from "../pages/InviteCode";
// import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class InviteCodeContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  render() {
    return <InviteCode {...this.props} />;
  }
}


export default connect(state => {
  const { user, userCenter } = state;
  return {
    user,
    userCenter,
  };
})(InviteCodeContainer);
