import React from "react";
import { connect } from "react-redux";
import About from "../pages/About";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class AboutContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <BackHeader
          title="关于健康宝"
          hasBorder
          backPress={() => {
            navigation.goBack()
          }}
        />),
    };
  };

  render() {
    return <About {...this.props} />;
  }
}


export default connect(state => {
  const { UserCenter, UtilState } = state;
  return {
    UserCenter,
    UtilState,
  };
})(AboutContainer);
