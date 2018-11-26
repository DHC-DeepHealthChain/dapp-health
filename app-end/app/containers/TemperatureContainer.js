import React from "react";
import { connect } from "react-redux";
import Temperature from "../pages/Temperature";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class TemperatureContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <BackHeader
          title="体温数据录入"
          hasBorder
          backPress={() => {
            navigation.goBack()
          }}
          titleRight="历史记录"
          nextPress={() => {
            navigation.navigate('TemperatureHistory')
          }}
        />),
    };
  };

  render() {
    return <Temperature {...this.props} />;
  }
}


export default connect(state => {
  const { UserCenter, UtilState } = state;
  return {
    UserCenter,
    UtilState,
  };
})(TemperatureContainer);
