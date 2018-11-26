import React from "react";
import { connect } from "react-redux";
import PersonalInfo from "../pages/PersonalInfo";
import BackHeader from "../components/BackHeader";
// import px2dp from "../common/px2dp";
// import Tools from '../common/tools'

class PersonalInfoContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <BackHeader
          title="个人资料"
          hasBorder
          backPress={() => {
            navigation.navigate('UserCenter')
          }}
        />),
    };
  };

  render() {
    return <PersonalInfo {...this.props} />;
  }
}


export default connect(state => {
  const { user, userCenter, personalInfo } = state;
  return {
    user,
    userInfo: userCenter.userInfo,
    personalInfo,
  };
})(PersonalInfoContainer);
