import React from "react";
import { connect } from "react-redux";
import Report from "../pages/Report";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class ReportContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <BackHeader
          title="问卷调查"
          hasBorder
          backPress={() => {
            navigation.goBack()
          }}
        />),
    };
  };

  render() {
    return <Report {...this.props} />;
  }
}


export default connect(state => {
  const { user, report } = state;
  return {
    user,
    report,
  };
})(ReportContainer);
