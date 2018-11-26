import React from "react";
import { connect } from "react-redux";
import Registe from "../pages/Registe";
// import { Image, StyleSheet } from "react-native";
// import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class RegisteContainer extends React.Component {
  static navigationOptions = () => {
    return {
      headerMode: "none",
      header: null,
    };
  };

  render() {
    return <Registe {...this.props} />;
  }
}

export default connect(state => {
  const { user, register } = state;
  return {
    user,
    register,
  };
})(RegisteContainer);
