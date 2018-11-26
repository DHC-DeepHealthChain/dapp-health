import React from "react";
import { connect } from "react-redux";
import CompletePersonalInfo from "../pages/CompletePersonalInfo";
// import Tools from '../common/tools'

class CompletePersonalInfoContainer extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return <CompletePersonalInfo {...this.props} />;
  }
}

export default connect(state => {
  const { register } = state;
  return {
    register,
  };
})(CompletePersonalInfoContainer);
