import React from "react";
import { connect } from "react-redux";
import HomePage from "../pages/HomePage";
import { Image, StyleSheet } from "react-native";
import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class HomePageContainer extends React.Component {
  static navigationOptions = {
    header: null,
    title: "首页",
    tabBarIcon: ({ tintColor, focused }) => {
      return (
        <Image
          resizeMode="stretch"
          style={styles.tab_item_img}
          source={focused ? require('../imgs/homeTab/home.png') : require('../imgs/homeTab/home-o.png')}
        />
      );
    },
  };

  render() {
    return <HomePage {...this.props} />;
  }
}

const styles = StyleSheet.create({
  tab_item_img: {
    width: px2dp(42),
    height: px2dp(38),
  },
});

export default connect(state => {
  const { user, article, home } = state;
  return {
    user,
    article,
    home,
  };
})(HomePageContainer);
