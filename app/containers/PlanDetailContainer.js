import React from "react";
import { connect } from "react-redux";
import PlanDetail from "../pages/PlanDetail";

class PlanDetailContainer extends React.Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };
  render() {
    return <PlanDetail {...this.props} />;
  }
}

export default connect(state => {
  const { user, plan } = state;
  return {
    user, 
    plan,
  };
})(PlanDetailContainer);
