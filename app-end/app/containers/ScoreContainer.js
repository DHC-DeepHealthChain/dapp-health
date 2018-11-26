import React from "react";
import { connect } from "react-redux";
import Score from "../pages/Score";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class ScoreContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <BackHeader
          title="我的T钻"
          hasBorder
          backPress={() => {
            navigation.goBack()
          }}
          titleRight="T钻规则"
          nextPress={() => {
            navigation.navigate('Rules', { type: 'scoreRule' })
          }}
        />),
    };
  };

  render() {
    return <Score {...this.props} />;
  }
}


export default connect(state => {
  const { user, score, userCenter } = state;
  return {
    user,
    score,
    userCenter,
  };
})(ScoreContainer);
