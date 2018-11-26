import React from "react";
import { connect } from "react-redux";
import PlanDetailofOwn from "../pages/PlanDetailofOwn";

class PlanDetailofOwnContainer extends React.Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };
  render() {
    return <PlanDetailofOwn {...this.props} />;
  }
}

export default connect(state => {
  const { user, plan } = state;
  return {
    user, 
    plan,
  };
})(PlanDetailofOwnContainer);
