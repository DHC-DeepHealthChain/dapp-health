import React from "react";
import { connect } from "react-redux";
import MyReport from "../pages/MyReport";
import BackHeader from "../components/BackHeader";

class MyReportContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // console.log("navigation", navigation);
    return {
      header: (
        <BackHeader
          title="我的问卷"
          hasBorder
          backPress={() => {
            navigation.goBack();
          }}
        />
      ),
    };
  };
  render() {
    return <MyReport {...this.props} />;
  }
}

export default connect(state => {
  const { user } = state;
  return {
    user, 
  };
})(MyReportContainer);
