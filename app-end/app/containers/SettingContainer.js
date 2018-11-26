import React from "react";
import { connect } from "react-redux";
import Setting from "../pages/Setting";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class SettingContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <BackHeader
          title="设置"
          hasBorder
          backPress={() => {
            navigation.goBack()
          }}
        />),
    };
  };

  render() {
    return <Setting {...this.props} />;
  }
}


export default connect(state => {
  const { UserCenter, UtilState } = state;
  return {
    UserCenter,
    UtilState,
  };
})(SettingContainer);
