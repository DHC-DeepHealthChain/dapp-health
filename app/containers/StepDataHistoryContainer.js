import React from "react";
import { connect } from "react-redux";
import StepDataHistory from "../pages/StepDataHistory";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class StepDataHistoryContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state: { params } } = navigation;
    return {
      header: (
        <BackHeader
          title={`${params.title}历史记录`}
          hasBorder
          backPress={() => {
            navigation.goBack()
          }}
        />),
    };
  };

  render() {
    return <StepDataHistory {...this.props} />;
  }
}


export default connect(state => {
  const { user, stepData } = state;
  return {
    user,
    list:stepData.list,
  };
})(StepDataHistoryContainer);
