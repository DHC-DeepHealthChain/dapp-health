import React from "react";
import { connect } from "react-redux";
import Message from "../pages/Message";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class MessageContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <BackHeader
          title="我的消息"
          hasBorder
          backPress={() => {
            navigation.goBack()
          }}
        />),
    };
  };

  render() {
    return <Message {...this.props} />;
  }
}


export default connect(state => {
  const { user, message } = state;
  return {
    user,
    message,
  };
})(MessageContainer);
