import React from "react";
import { connect } from "react-redux";
import MyCollection from "../pages/MyCollection";
import BackHeader from "../components/BackHeader";

class MyCollectionContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // console.log("navigation", navigation);
    return {
      header: (
        <BackHeader
          title="收藏列表"
          hasBorder
          backPress={() => {
            navigation.goBack();
          }}
        />
      ),
    };
  };
  render() {
    return <MyCollection {...this.props} />;
  }
}

export default connect(state => {
  const { user, collection } = state;
  return {
    user, 
    collection,
  };
})(MyCollectionContainer);
