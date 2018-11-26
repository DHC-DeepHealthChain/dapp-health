import React from "react";
import { connect } from "react-redux";
import HealthyIndexHistory from "../pages/HeathyIndexHistory";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class HealthyIndexHistoryContainer extends React.Component {
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
    return <HealthyIndexHistory {...this.props} />;
  }
}


export default connect(state => {
  const { user, everyDay } = state;
  return {
    user,
    list: everyDay.historyList,
  };
})(HealthyIndexHistoryContainer);
