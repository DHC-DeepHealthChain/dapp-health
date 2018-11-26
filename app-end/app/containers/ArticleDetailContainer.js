import React from "react";
import { connect } from "react-redux";
import ArticleDetail from "../pages/ArticleDetail";
import { Image, StyleSheet } from "react-native";
// import px2dp from "../common/px2dp";
import BackHeader from "../components/BackHeader";

class ArticleDetailContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // console.log("navigation", navigation);
    return {
      header: null,
    };
  };
  render() {
    return <ArticleDetail {...this.props} />;
  }
}

// const styles = StyleSheet.create({
//   tab_item_img: {
//     width: px2dp(34),
//     height: px2dp(41),
//   },
// });

export default connect(state => {
  const { user, article } = state;
  return {
    user, 
    article,
  };
})(ArticleDetailContainer);
