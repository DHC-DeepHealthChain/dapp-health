import React from "react";
import { connect } from "react-redux";
import Plan from "../pages/Plan";
import { Image, StyleSheet } from "react-native";
import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class PlanContainer extends React.Component {
  static navigationOptions = {
    header: null,
    title: "计划",
    tabBarIcon: ({ tintColor, focused }) => {
      return (
        <Image
          resizeMode="stretch"
          style={styles.tab_item_img}
          source={focused ? require('../imgs/homeTab/plan.png') : require('../imgs/homeTab/plan-o.png')}
        />
      );
    },
  };

  render() {
    return <Plan {...this.props} />;
  }
}

const styles = StyleSheet.create({
  tab_item_img: {
    width: px2dp(42),
    height: px2dp(38),
  },
});

export default connect(state => {
  const { user, plan } = state;
  return {
    user,
    plan,
  };
})(PlanContainer);
