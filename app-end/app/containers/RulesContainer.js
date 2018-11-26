import React from "react";
import { connect } from "react-redux";
import Rules from "../pages/Rules";
// import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class RulesContainer extends React.Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  render() {
    return <Rules {...this.props} />;
  }
}


export default connect(state => {
  const { UserCenter, UtilState } = state;
  return {
    UserCenter,
    UtilState,
  };
})(RulesContainer);
