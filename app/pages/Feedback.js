import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { NavigationActions } from 'react-navigation';
import px2dp from "../common/px2dp";
import Tools from "../common/tools";
import Loadding from "../components/Loadding";
import { submitFeedback } from '../actions/feedbackActions';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { failInfo } = nextProps.user;
    if( failInfo.error === true && failInfo.message === '未登录' ) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: "PasswordLogin" }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  handleChange = (content) => {
    this.setState({ content });
  }


  handleSubmit = () => {
    const { content } = this.state;
    const { dispatch, navigation } = this.props;
    if (!content) {
      Tools.showToast('请填写内容');
      return false;
    }
    this.setState({
      loading: true,
    })
    const submit = dispatch(submitFeedback({ content }));
    submit.then((res) => {
      this.setState({
        loading: false,
      });
      if (res.error) {
        return false;
      }
      Tools.showToast('提交成功');
      navigation.goBack();
    })
  }
  render() {
    const { loading } = this.state;
    return (
      <View style={styles.boxStyle}>
        <TextInput
          style={styles.inputStyle}
          placeholder="请描述您遇到的问题"
          multiline
          onChangeText={this.handleChange}
          underlineColorAndroid="transparent"
        />
        {
          loading ? <Loadding visible textContent="提交中" /> :
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ marginTop: px2dp(382) }}
              onPress={this.handleSubmit}
            >
              <Image source={require('../imgs/feedback/submit.png')} />
            </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: 'center',
  },
  inputStyle: {
    width: px2dp(691),
    height: px2dp(345),
    lineHeight: px2dp(50),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: px2dp(5),
    marginTop: px2dp(40),
    padding: px2dp(26),
    textAlignVertical: 'top',
  },
});
export default Feedback;
