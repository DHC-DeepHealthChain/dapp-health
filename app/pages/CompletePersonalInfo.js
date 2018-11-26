import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
} from "react-native";
// import moment from 'moment';
import { NavigationActions } from "react-navigation";
import BackHeader from "../components/BackHeader";
import Button from "../components/Button";
import Loadding from "../components/Loadding";
import px2dp from "../common/px2dp";
import Tools from "../common/tools";
import Common from "../common/constants";
import DialogSelected from "../components/AlertSelect";
import { registerUser } from "../actions/registerActions";
import { passwordLogin, clearFailedInfo } from "../actions/userAction";

class CompletePersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      loading: false,
      sex: null,
      loaddingContent: "正在注册...",
    };
    this.renderItem = this.renderItem.bind(this);

    this.showAlertSelected = this.showAlertSelected.bind(this);
    this.callbackSelected = this.callbackSelected.bind(this);
    this.hanldeSelect = this.hanldeSelect.bind(this);
  }

  componentWillMount() {
    const thz = this;
    thz.props.dispatch(clearFailedInfo());
    const { data } = thz.props.register;
    // console.log('saveData', data);
    if (data.type && data.type === "thirdLoginRegister" && data.gender) {
      thz.setState({
        sex: { label: data.gender, value: data.gender === '男' ? 'male' : 'female' },
      });
    }
  }

  /* 范围校验 */
  checkRange = (value, min, max) => {
    if (Number(value) >= Number(min) && Number(value) <= Number(max)) {
      return true;
    }
    return false;
  };

  /* 提交 */
  handleSubmit = () => {
    const thz = this;
    const { data } = thz.props.register;
    Keyboard.dismiss();
    // const { params } = thz.props.navigation.state;
    const { sex, height, weight, age, isComplete } = thz.state;
    thz.setState({ loading: true });
    if (!isComplete) {
      return false;
    }
    if (!sex) {
      Tools.showToast("请选择性别");
      return false;
    }
    if (!height) {
      Tools.showToast("请输入身高");
      return false;
    }
    if (!weight) {
      Tools.showToast("请输入体重");
      return false;
    }
    if (!age) {
      Tools.showToast("请输入年龄");
      return false;
    }

    /* 范围校验 */
    if (!this.checkRange(height, 120, 220)) {
      Tools.showToast("请输入合理范围的身高");
      return false;
    }
    if (!this.checkRange(weight, 30, 150)) {
      Tools.showToast("请输入合理范围的体重");
      return false;
    }
    if (!this.checkRange(age, 0, 200)) {
      Tools.showToast("请输入合理范围的年龄");
      return false;
    }
    const registParams = { sex: sex.value, height, weight, age, ...data };
    /* 注册 */
    const register = this.props.dispatch(registerUser(registParams));
    register.then(() => {
      /* 注册成功 登录 第三方还是用户名密码登录 */
      thz.setState({ loaddingContent: '正在登录...' });
      const loginParam = {
        mobileNumber: data.mobileNumber,
        password: data.password,
      };
      if( data.type && data.type === "thirdLoginRegister" && data.openid ) {
        loginParam.openid = data.openid;
      }
      thz.props
        .dispatch(passwordLogin(loginParam))
        .then(value => {
          thz.setState({ loading: false });
          if (value === "success") {
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "HomePage" })],
            });
            thz.props.navigation.dispatch(resetAction);
          }
        })
        .catch(() => {
          thz.setState({ loading: false });
        });
    }).catch(() => {
      thz.setState({ loading: false });
    });
  };

  /* 检验是否全部填写完 */
  checkComplete = () => {
    const thz = this;
    const { sex, height, weight, age } = thz.state;
    if (!sex || !height || !weight || !age) {
      thz.setState({
        isComplete: false,
      });
      return false;
    } else {
      thz.setState({
        isComplete: true,
      });
    }
  };

  /* 显示选择 */
  showAlertSelected(item) {
    const thz = this;
    this.dialog.show(item, "#333333", thz.callbackSelected);
  }
  // 回调
  callbackSelected = (item, itemOption) => {
    const thz = this;
    // console.log(item, itemOption);
    this.setState(
      pre => {
        const o = {
          ...pre,
        };
        o[item.key] = itemOption;
        return o;
      },
      () => {
        thz.checkComplete();
      }
    );
  };
  hanldeSelect = item => {
    const thz = this;
    thz.showAlertSelected(item);
  };

  /* ITEM */
  renderItem = item => {
    const thz = this;

    return (
      <View key={item.id} style={styles.inpItem__wrap}>
        <Image
          style={{ width: px2dp(35), height: px2dp(30) }}
          source={item.icon}
          resizeMode="stretch"
        />
        <Text
          style={{
            fontSize: px2dp(26),
            color: "#333",
            paddingHorizontal: px2dp(30),
          }}
        >
          {item.label}
        </Text>
        {item.type === "select" ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              thz.hanldeSelect(item);
            }}
            style={styles.picker__wrap}
          >
            <Text
              style={[
                thz.state[item.key] ? { color: "#333" } : { color: "#bababa" },
              ]}
            >
              {thz.state[item.key]
                ? thz.state[item.key].label
                : item.placeholder}
            </Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            onChangeText={text => {
              thz.setState({ [item.key]: text });
              thz.checkComplete();
            }}
            value={thz.state[item.key]}
            placeholderTextColor="#bababa"
            underlineColorAndroid="transparent"
            style={styles.inputStyle}
            placeholder={item.placeholder ? item.placeholder : "请输入"}
            keyboardType="numeric"
          />
        )}
      </View>
    );
  };

  render() {
    const thz = this;
    // const { HomeState, NewsPolicy } = this.props;
    // const {newsInfo} = HomeState;
    // const {list} = NewsPolicy;
    const { loading } = this.state;
    return (
      <View style={styles.boxStyle}>
        <Loadding visible={loading} textContent={thz.state.loaddingContent} />
        <BackHeader title="个人资料" hasBorder />
        <ScrollView style={styles.container}>
          {formList.map(item => {
            return thz.renderItem(item);
          })}
          <View style={{ paddingHorizontal: px2dp(50), marginTop: px2dp(55) }}>
            <Text style={{ color: "#999", fontSize: px2dp(24) }}>
              请务必正确填写资料，我们会推送更适合您的健康资讯
            </Text>
          </View>

          <View style={styles.operate__wrap}>
            <Button
              style={[
                styles.btnStyle,
                thz.state.isComplete
                  ? styles.btnActStyle
                  : styles.btnDisabledStyle,
              ]}
              onPress={thz.handleSubmit.bind(thz)}
            >
              完成
            </Button>
          </View>
        </ScrollView>

        <DialogSelected
          ref={dialog => {
            thz.dialog = dialog;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {},
  inputStyle: {
    flex: 1,
    // height: px2dp(80),
    paddingVertical: 0,
    textAlign: "right",
    // paddingHorizontal: px2dp(30),
  },
  picker__wrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  pickerStyle: {
    width: px2dp(200),
    backgroundColor: "skyblue",
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
  operate__wrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: px2dp(200),
  },
  btnStyle: {
    width: px2dp(480),
    height: px2dp(85),
  },
  btnActStyle: {
    backgroundColor: Common.colors.themeColor,
  },
  btnDisabledStyle: {
    backgroundColor: "#999",
  },
});

const formList = [
  {
    id: 1,
    key: "sex",
    label: "性别",
    placeholder: "请选择您的性别",
    type: "select",
    options: [
      {
        label: "男",
        value: "male",
      },
      {
        label: "女",
        value: "female",
      },
    ],
    icon: require("../imgs/completePersonInfo/sex.png"),
  },
  {
    id: 2,
    key: "height",
    label: "您的身高",
    placeholder: "请输入您的身高(CM)",
    icon: require("../imgs/completePersonInfo/height.png"),
  },
  {
    id: 3,
    key: "weight",
    label: "您的体重",
    placeholder: "请输入您的体重(KG)",
    icon: require("../imgs/completePersonInfo/weight.png"),
  },
  {
    id: 4,
    key: "age",
    label: "您的年龄",
    placeholder: "请输入您的年龄(周岁)",
    icon: require("../imgs/completePersonInfo/age.png"),
  },
];

export default CompletePersonalInfo;
