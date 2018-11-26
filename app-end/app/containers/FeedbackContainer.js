import React from "react";
import { connect } from "react-redux";
import Feedback from "../pages/Feedback";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class FeedbackContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <BackHeader
          title="意见反馈"
          hasBorder
          backPress={() => {
            navigation.goBack()
          }}
        />),
    };
  };

  render() {
    return <Feedback {...this.props} />;
  }
}


export default connect(state => {
  const { user, feedback } = state;
  return {
    user,
    feedback,
  };
})(FeedbackContainer);
