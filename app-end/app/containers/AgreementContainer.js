import React from "react";
import { connect } from "react-redux";
import Agreement from "../pages/Agreement";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class AgreementContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <BackHeader
          title="健康宝协议"
          hasBorder
          backPress={() => {
            navigation.goBack()
          }}
        />),
    };
  };

  render() {
    return <Agreement {...this.props} />;
  }
}


export default connect(state => {
  const { UserCenter, UtilState } = state;
  return {
    UserCenter,
    UtilState,
  };
})(AgreementContainer);
