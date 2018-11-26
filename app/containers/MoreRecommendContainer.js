import React from "react";
import { connect } from "react-redux";
import { Image, StyleSheet } from "react-native";
import MoreRecommend from "../pages/MoreRecommend";
import px2dp from "../common/px2dp";
// import BackHeader from "../components/BackHeader";

class MoreRecommendContainer extends React.Component {
  static navigationOptions = () => {
    // console.log("navigation", navigation);
    return {
      header: null,
      title: "资讯",
      tabBarIcon: ({ focused }) => {
        return (
          <Image
            resizeMode="stretch"
            style={styles.tab_item_img}
            source={
              focused
                ? require("../imgs/homeTab/articleIcon.png")
                : require("../imgs/homeTab/articleIcon-o.png")
            }
          />
        );
      },
    };
  };
  render() {
    return <MoreRecommend {...this.props} />;
  }
}


const styles = StyleSheet.create({
  tab_item_img: {
    width: px2dp(42),
    height: px2dp(38),
  },
});

export default connect(state => {
  const { user, article } = state;
  return {
    user,
    article,
  };
})(MoreRecommendContainer);
