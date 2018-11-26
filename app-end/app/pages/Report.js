import React from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import Loadding from '../components/Loadding';
import { NavigationActions } from 'react-navigation';
import FormRadio from '../components/FormRadio';
import px2dp from "../common/px2dp";
import { getQuestions, submitAnswers, saveList } from '../actions/reportAction';
import Tools from "../common/tools";

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      isSubmiting: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.props.navigation.state;
    if (!params.examId) {
      Tools.showToast('问卷不存在');
    }
    dispatch(getQuestions(params.examId));
  }

  componentWillReceiveProps(nextProps) {
    const { failInfo } = nextProps.user;
    // const { questionList } = nextProps.report;
    if( failInfo.error === true && failInfo.message === '未登录' ) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: "PasswordLogin" }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    // if (questionList && questionList.length !== 0) {
    //   const answerArr = questionList.map((item) => {
    //     return {
    //       questionId: item._id, // eslint-disable-line
    //       answerIds: item.itemList ? [item.itemList[0]._id] : [], // eslint-disable-line
    //     }
    //   });
    //   this.setState({
    //     answerArr,
    //     examId: questionList[0].examId,
    //   })
    // }
  }

  NotNull = (num) => {
    const { answerArr } = this.props.report;
    if (answerArr[num - 1].answerIds[0]) {
      return true
    }
    return false;
  }

  handleNext = () => {
    const { step } = this.state;
    if (!this.NotNull(step)) {
      Tools.showToast('请填写或选择此题的答案');
      return false;
    }
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  }
  handlePrev = () => {
    const { report: { questionList } } = this.props;
    if (questionList.length === 1) {
      Tools.showToast('只有一题哦');
      return false;
    }
    const { step } = this.state;
    if (!this.NotNull(step)) {
      Tools.showToast('请填写或选择此题的答案');
      return false;
    }
    this.setState((prevState) => ({
      step: prevState.step - 1,
    }));
  }
  handleChange = (value, id) => {
    const { answerArr } = this.props.report;
    answerArr[id - 1].answerIds = value;
    this.props.dispatch(saveList(answerArr));
  }

  handleComplete = () => {
    const { step } = this.state;
    const { dispatch, navigation, report } = this.props;
    const { params } = navigation.state;
    if (!this.NotNull(step)) {
      Tools.showToast('请填写或选择此题的答案');
      return false;
    }
    const answer = report.answerArr.map((item) => {
      return {
        questionId: item.questionId,
        answerIds: item.answerIds.join(','),
      }
    });
    this.setState({
      isSubmiting: true,
    });
    const submit = dispatch(submitAnswers({
      answer,
      examId: params.examId,
    }));
    submit.then((res) => {
      this.setState({
        isSubmiting: false,
      });
      if (res.error) {
        return false;
      }
      Tools.showToast('提交成功');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    })
  }
  renderButton = () => {
    const { step } = this.state;
    const { report: { questionList } } = this.props;
    return (
      <View style={{ alignItems: 'center', marginTop: px2dp(200) }}>
        {
          step === 1 && questionList.length !== 1 ?
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.6}
            onPress={this.handleNext}
          >
            <Text style={styles.buttonTextStyle}>下一题</Text>
          </TouchableOpacity> :
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this.handlePrev}
              style={styles.leftButtonStyle}
            >
              <Text style={styles.buttonTextStyle}>上一题</Text>
            </TouchableOpacity>
            <View style={styles.lineStyle} />
            {
              step === questionList.length ?
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={this.handleComplete}
                  style={styles.rightButtonStyle}
                >
                  <Text style={styles.buttonTextStyle}>完成</Text>
                </TouchableOpacity> :
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={this.handleNext}
                  style={styles.rightButtonStyle}
                >
                  <Text style={styles.buttonTextStyle}>下一题</Text>
                </TouchableOpacity>
              }
          </View>
        }
      </View>
    )
  }
  renderItem = (item) => {
    const questionContent = JSON.parse(item.content);
    if (item.orderNum === this.state.step) {
      return (
        <View key={item.orderNum}>
          <Text
            style={styles.textStyle}
          >
            {item.orderNum}. {questionContent.name} {typeObj[questionContent.type]}
          </Text>
          <FormRadio
            radioGroup={item.itemList}
            defaultChecked={this.props.report.answerArr[item.orderNum - 1].answerIds}
            type={questionContent.type}
            questionChange={(value) => this.handleChange(value, item.orderNum)}
          />
          {this.renderButton()}
        </View>
      )
    }
    return null;
  }

  render() {
    const { isSubmiting } = this.state;
    const { report: { questionList, answerArr } } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Loadding visible={isSubmiting} textContent="提交中" />
        {
          answerArr.length !== 0 && questionList && questionList.length !== 0 ?
            <ScrollView style={styles.boxStyle}>
              {
                questionList.map(item => this.renderItem(item))
              }
            </ScrollView> :
            <Loadding visible textContent="加载中..." />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  textStyle: {
    fontSize: 14,
    paddingLeft: px2dp(30),
    marginTop: px2dp(30),
  },
  buttonStyle: {
    height: px2dp(80),
    width: px2dp(600),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: px2dp(40),
    backgroundColor: '#29d4e8',
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 14,
  },
  leftButtonStyle: {
    width: px2dp(300),
    height: px2dp(80),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: px2dp(40),
    borderBottomLeftRadius: px2dp(40),
    backgroundColor: '#29d4e8',
  },
  rightButtonStyle: {
    width: px2dp(300),
    height: px2dp(80),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: px2dp(40),
    borderBottomRightRadius: px2dp(40),
    backgroundColor: '#29d4e8',
  },
  lineStyle: {
    position: 'absolute',
    left: px2dp(296),
    height: px2dp(80),
    width: px2dp(8),
    backgroundColor: '#fff',
  },
  inputStyle: {
    padding: 0,
    paddingVertical: px2dp(5),
    fontSize: px2dp(24),
    width: px2dp(150),
    height: px2dp(40),
    borderWidth: px2dp(1),
    borderColor: '#999',
    marginLeft: px2dp(20),
    marginRight: px2dp(50),
  },
});

const typeObj = {
  RADIO: '(单选)',
  CHECKBOX: '(多选)',
  INPUT: '',
}

export default Report;
