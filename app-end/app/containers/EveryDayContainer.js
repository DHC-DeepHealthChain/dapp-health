import React from "react";
import { connect } from "react-redux";
import { Image, StyleSheet } from "react-native";
import EveryDay from "../pages/EveryDay";
import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class EveryDayContainer extends React.Component {
  static navigationOptions = {
    header: null,
    title: "每一天",
    tabBarIcon: ({ focused }) => {
      return (
        <Image
          resizeMode="stretch"
          style={styles.tab_item_img}
          source={focused ? require('../imgs/homeTab/everyDay.png') : require('../imgs/homeTab/everyDay-o.png')}
        />
      );
    },
  };

  render() {
    return <EveryDay {...this.props} />;
  }
}

const styles = StyleSheet.create({
  tab_item_img: {
    width: px2dp(42),
    height: px2dp(38),
  },
});

export default connect(state => {
  const { everyDay, user } = state;
  return {
    everyDay,
    user,
  };
})(EveryDayContainer);
