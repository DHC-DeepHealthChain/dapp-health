import React from "react";
import { connect } from "react-redux";
import Questionnaire from "../pages/Questionnaire";
import BackHeader from "../components/BackHeader";

class QuestionnaireContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // console.log("navigation", navigation);
    return {
      header: (
        <BackHeader
          title="问卷列表"
          hasBorder
          backPress={() => {
            navigation.goBack();
          }}
        />
      ),
    };
  };
  render() {
    return <Questionnaire {...this.props} />;
  }
}

export default connect(state => {
  const { user, home } = state;
  return {
    user,
    home,
  };
})(QuestionnaireContainer);
