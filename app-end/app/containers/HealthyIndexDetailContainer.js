import React from "react";
import { connect } from "react-redux";
import HealthyIndexDetail from "../pages/HealthyIndexDetail";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class HealthyIndexDetailContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state: { params } } = navigation;
    return {
      header: (
        <BackHeader
          title={params.title}
          hasBorder
          backPress={() => {
            navigation.goBack()
          }}
          titleRight="历史记录"
          nextPress={() => {
            navigation.navigate('HealthyIndexHistory', {
              type: params.type,
              title: params.itemName,
              list: params.list,
            })
          }}
        />),
    };
  };

  render() {
    return <HealthyIndexDetail {...this.props} />;
  }
}


export default connect(state => {
  const { user, everyDay } = state;
  return {
    user,
    isSubmit: everyDay.isSubmit,
  };
})(HealthyIndexDetailContainer);
