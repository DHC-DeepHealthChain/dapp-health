import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Keyboard,
} from "react-native";
// import moment from 'moment';
import { NavigationActions } from "react-navigation";
import BackHeader from "../components/BackHeader";
import Loadding from "../components/Loadding";
import px2dp from "../common/px2dp";
import Tools from "../common/tools";
import { updateInfo } from "../actions/personalInfoAction";
import { updateUserInfo } from "../actions/userCenterAction";

const Input = ({ onChangeText, placeholder, keyboardType, value }) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      placeholderTextColor="#bababa"
      underlineColorAndroid="transparent"
      style={styles.inputStyle}
      placeholder={placeholder}
      keyboardType={keyboardType}
      value={value}
    />
  );
};

class EditUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isComplete: false,
      visible: false,
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    const thz = this;
    const { params } = thz.props.navigation.state;
    const { userInfo } = thz.props;
    if (userInfo[params.key]) {
      thz.setState({
        [params.key]: userInfo[params.key],
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { failInfo } = nextProps.user;
    if (failInfo.error === true && failInfo.message === "未登录") {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "PasswordLogin" })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  /* 提交 */
  async handleSubmit() {
    const thz = this;
    const userId = await Tools.getStorage("userId", "text");
    const { dispatch, userInfo } = this.props;
    const { params } = thz.props.navigation.state;
    const index = params.key;
    if (!thz.state[index]) {
      Tools.showToast(params.placeholder);
      return false;
    }
    if( params.invalid ) {
      const data = params.invalid(thz.state[index]);
      console.log(data);
      if(!data.res) {
        Tools.showToast(data.message);
        return false;
      }
    }
    thz.setState({ visible: true });
    const update = dispatch(
      updateInfo(
        {
          type: index,
          [index]: thz.state[index],
        },
        userId
      )
    );
    update
      .then(() => {
        thz.setState({ visible: false });
        Tools.showToast("更新成功");
        dispatch(
          updateUserInfo({
            userInfo: {
              ...userInfo,
              [index]: thz.state[index],
            },
          })
        );
        Keyboard.dismiss();
        thz.props.navigation.goBack();
        // setTimeout(() => {
        //   Keyboard.dismiss();
        //   thz.props.navigation.goBack();
        // }, 1500);
      })
      .catch(error => {
        Tools.showToast(error);
        thz.setState({ visible: false });
      });
  }

  /* ITEM */
  renderItem = item => {
    return (
      <View key={item.id} style={styles.inpItem__wrap}>
        {item.inputType === "num" ? (
          <Input
            onChangeText={text => {
              this.setState({ [item.key]: text });
              // this.state[item.key] = text;
            }}
            value={this.state[item.key]}
            placeholder={item.placeholder ? item.placeholder : "请输入"}
            keyboardType="numeric"
          />
        ) : item.inputType === "email" ? (
          <Input
            onChangeText={text => {
              this.setState({ [item.key]: text });
              // this.state[item.key] = text;
            }}
            value={this.state[item.key]}
            placeholder={item.placeholder ? item.placeholder : "请输入"}
            keyboardType="email-address"
          />
        ) : (
          <Input
            onChangeText={text => {
              this.setState({ [item.key]: text });
              // this.state[item.key] = text;
            }}
            value={this.state[item.key]}
            placeholder={item.placeholder ? item.placeholder : "请输入"}
          />
        )}
      </View>
    );
  };

  render() {
    const thz = this;
    const { navigation } = thz.props;
    const { params } = navigation.state;
    return (
      <View style={styles.boxStyle}>
        <BackHeader
          title={params.text ? params.text : "编辑资料"}
          backPress={() => {
            navigation.goBack();
          }}
          hasBorder
          nextIcon={require("../imgs/personalInfo/right_icon.png")}
          nextIconStyle={{
            width: px2dp(46),
            height: px2dp(36),
          }}
          nextPress={thz.handleSubmit.bind(thz)}
        />
        <ScrollView style={styles.container}>
          {thz.renderItem(params)}
        </ScrollView>

        <Loadding visible={thz.state.visible} textContent="更新中" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
  },
  inputStyle: {
    flex: 1,
    // height: px2dp(80),
    paddingVertical: 0,
    // paddingHorizontal: px2dp(30),
  },
  inpItem__wrap: {
    paddingHorizontal: px2dp(50),
    // paddingVertical: px2dp(20),
    height: px2dp(110),
    borderStyle: "solid",
    borderBottomWidth: px2dp(1),
    borderColor: "#eee",
    flexDirection: "row",
    // justifyContent: '',
    alignItems: "center",
  },
});
export default EditUserInfo;
