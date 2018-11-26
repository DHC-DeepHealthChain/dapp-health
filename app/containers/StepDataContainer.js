import React from "react";
import { connect } from "react-redux";
import StepData from "../pages/StepData";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class StepDataContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <BackHeader
          title="计步器"
          hasBorder
          backPress={() => {
            navigation.goBack()
          }}
          titleRight="历史记录"
          nextPress={() => {
            navigation.navigate('StepDataHistory', {
              type: 'step',
              title: '运动步数',
            })
          }}
        />),
    };
  };

  render() {
    return <StepData {...this.props} />;
  }
}


export default connect(state => {
  const { user, stepData } = state;
  return {
    user,
    stepData,
  };
})(StepDataContainer);
