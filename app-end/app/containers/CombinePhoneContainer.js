import React from "react";
import { connect } from "react-redux";
import CombinePhone from "../pages/CombinePhone";

class CombinePhoneContainer extends React.Component {
  static navigationOptions = () => {
    return {
      headerMode: "none",
      header: null,
    };
  };

  render() {
    return <CombinePhone {...this.props} />;
  }
}

export default connect(state => {
  const { user, register } = state;
  return {
    user,
    register,
  };
})(CombinePhoneContainer);
