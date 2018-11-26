import React from "react";
import { connect } from "react-redux";
import CollectionDetail from "../pages/CollectionDetail";
import { Image, StyleSheet } from "react-native";
import BackHeader from "../components/BackHeader";

class CollectionDetailContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // console.log("navigation", navigation);
    return {
      header: null,
    };
  };
  render() {
    return <CollectionDetail {...this.props} />;
  }
}
export default connect(state => {
  const { user, collection } = state;
  return {
    user, 
    collection,
  };
})(CollectionDetailContainer);
