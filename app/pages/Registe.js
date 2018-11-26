import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  CheckBox,
  Keyboard,
  ScrollView,
} from "react-native";
import { NavigationActions } from "react-navigation";
import px2dp from "../common/px2dp";
import ButtonWithBg from "../components/ButtonWithBg";
import Button from "../components/Button";
import Loadding from "../components/Loadding";
import Common from "../common/constants";
import Tools from "../common/tools";
import {
  getCaptcha,
  saveData,
  checkInviteCode,
} from "../actions/registerActions";

class Registe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledCode: false,
      currentTime: 60,
      agreement: true,
      code: null,
      loading: false,
    };
    // this.getCodeTime = 60;
  }

  componentWillReceiveProps(nextProps) {
    const { code } = nextProps.register;
    console.log(code);
    if (code !== null) {
      this.setState({
        code,
      });
    }
  }
  /* 跳转协议详情 */
  handleAgreementDetail = () => {
    this.props.navigation.navigate("Agreement");
  };
  /* check box */
  handleAgreeChange(val) {
    this.setState({
      agreement: val,
    });
  }

  /* 完成 */
  handleSubmit() {
    const thz = this;
    Keyboard.dismiss();
    const {
      mobileNumber,
      password,
      confirmCode,
      agreement,
      code,
      inviteCode,
    } = this.state;
    if (!mobileNumber) {
      Tools.showToast("请输入手机号");
      return false;
    }
    if (!confirmCode) {
      Tools.showToast("请输入验证码");
      return false;
    }
    if (!password) {
      Tools.showToast("请输入密码");
      return false;
    }
    if(!Tools.checkPwd(password)) {
      Tools.showToast("密码格式有误（字母与数字的组合）");
      return false;
    }
    if (code !== Number(confirmCode)) {
      Tools.showToast("验证码错误");
      return false;
    }
    // if (!inviteCode) {
    //   Tools.showToast("请填写邀请码");
    //   return false;
    // }
    if (!agreement) {
      Tools.showToast("请阅读并同意协议");
      return false;
    }
    // console.log(agreement);
    /* 第三方登录  第一次登录 信息 */
    const { params } = thz.props.navigation.state;
    const data = {
      mobileNumber,
      password,
      inviteCode,
      ...params,
    };
    /* 保存数据  跳转至完善个人信息用 */
    thz.props.dispatch(saveData({ data }));
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: "CompletePersonalInfo" }),
      ],
    });
    if (inviteCode) {
      thz.setState({ loading: true });
      thz.props
        .dispatch(checkInviteCode({ inviteCode }))
        .then(() => {
          thz.setState({ loading: false }, () => {
            thz.props.navigation.dispatch(resetAction);
          });
        })
        .catch(() => {
          thz.setState({ loading: false });
        });
    } else {
      thz.props.navigation.dispatch(resetAction);
    }
  }
  /* 已有账号登录 */
  handleLogin() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "PasswordLogin" })],
    });
    this.props.navigation.dispatch(resetAction);
  }
  /* 已有账号绑定 */
  handleCombinePhone() {
    const { params } = this.props.navigation.state;
    this.props.navigation.navigate("CombinePhone", { ...params });
  }

  /* 获取验证码 */
  handleGetCode = () => {
    const { dispatch } = this.props;
    const { mobileNumber } = this.state;
    const thz = this;
    if (!mobileNumber) {
      Tools.showToast("请输入手机号");
      return false;
    }
    if (!Tools.checkPhone(mobileNumber)) {
      Tools.showToast("手机号码格式不正确");
      return false;
    }
    clearInterval(thz.timer);
    if (this.state.disabledCode) return false;
    thz.setState({
      disabledCode: true,
    });
    thz.timer = setInterval(() => {
      thz.setState(pre => {
        if (pre.currentTime === 1) {
          clearInterval(thz.timer);
          return {
            currentTime: 60,
            disabledCode: false,
          };
        }
        return {
          currentTime: pre.currentTime - 1,
        };
      });
    }, 1000);
    const getCapptcha = dispatch(getCaptcha(mobileNumber, "register"));
    getCapptcha.then(res => {
      if (res.error) {
        clearInterval(thz.timer);
        thz.setState({
          disabledCode: false,
        });
      }
    });
  };

  render() {
    const thz = this;
    const { params } = thz.props.navigation.state;
    return (
      <View style={styles.boxStyle}>
        <Image
          style={{ flex: 1 }}
          source={require("../imgs/login/login_bg.png")}
          resizeMode="stretch"
        />
        <View style={styles.login__wrap}>
          <ScrollView
            style={{
              flex: 1,
              // position: "absolute",
              // width: "100%",
              // height: "100%",
            }}
          >
            <View style={styles.scrollContainer}>
              <View style={styles.form__container}>
                <Image
                  style={styles.logo__icon}
                  source={require("../imgs/login/logo.png")}
                  resizeMode="stretch"
                />
                <View style={styles.form__wrap}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: px2dp(40),
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    健康宝
                  </Text>

                  {params &&
                    params.type === "thirdLoginRegister" && (
                      <View style={styles.thirdLoginRegister}>
                        <Text
                          onPress={thz.handleCombinePhone.bind(thz)}
                          style={[
                            styles.bottomTextStyle,
                            { fontSize: px2dp(24) },
                          ]}
                        >
                          如果您的手机号已经注册，请直接绑定！去绑定>>
                        </Text>
                      </View>
                    )}
                  <View style={styles.form}>
                    <View style={styles.form__item}>
                      <Image
                        style={styles.inp__icon}
                        source={require("../imgs/login/username.png")}
                        resizeMode="stretch"
                      />
                      <TextInput
                        onChangeText={text => {
                          this.state.mobileNumber = text;
                        }}
                        placeholderTextColor="#bababa"
                        underlineColorAndroid="transparent"
                        style={styles.inputStyle}
                        placeholder="请输入您的手机号码"
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.form__item}>
                      <Image
                        style={styles.inp__icon}
                        source={require("../imgs/login/password.png")}
                        resizeMode="stretch"
                      />
                      <TextInput
                        onChangeText={text => {
                          this.state.confirmCode = text;
                        }}
                        placeholderTextColor="#bababa"
                        underlineColorAndroid="transparent"
                        style={styles.inputStyle}
                        placeholder="请输入验证码"
                        keyboardType="numeric"
                      />
                      {/* 获取验证码 */}
                      <View style={styles.confirmCode__wrap}>
                        {thz.state.disabledCode ? (
                          <Button
                            style={[
                              styles.confirmCode,
                              styles.confirmCodeDisabled,
                            ]}
                            textStyle={{
                              color: "#999",
                              fontSize: px2dp(24),
                            }}
                            onPress={() => {}}
                          >
                            {`${this.state.currentTime}s后重新获取`}
                          </Button>
                        ) : (
                          <Button
                            style={[
                              styles.confirmCode,
                              styles.confirmCodeActive,
                            ]}
                            textStyle={{
                              color: Common.colors.themeColor,
                              fontSize: px2dp(24),
                            }}
                            onPress={thz.handleGetCode.bind(thz)}
                          >
                            获取验证码
                          </Button>
                        )}
                      </View>
                    </View>
                    <View style={styles.form__item}>
                      <Image
                        style={styles.inp__icon}
                        source={require("../imgs/login/password.png")}
                        resizeMode="stretch"
                      />
                      <TextInput
                        onChangeText={text => {
                          this.state.password = text;
                        }}
                        placeholderTextColor="#bababa"
                        underlineColorAndroid="transparent"
                        style={styles.inputStyle}
                        placeholder="请输入您的密码"
                        secureTextEntry
                      />
                    </View>
                    <View style={styles.form__item}>
                      <Image
                        style={styles.inp__icon}
                        source={require("../imgs/login/password.png")}
                        resizeMode="stretch"
                      />
                      <TextInput
                        onChangeText={text => {
                          this.state.inviteCode = text;
                        }}
                        placeholderTextColor="#bababa"
                        underlineColorAndroid="transparent"
                        style={styles.inputStyle}
                        placeholder="邀请码"
                      />
                    </View>

                    <View style={styles.agreement__wrap}>
                      <CheckBox
                        onValueChange={thz.handleAgreeChange.bind(thz)}
                        value={thz.state.agreement}
                      />
                      <Text style={styles.agreement_text}>
                        阅读并同意
                        <Text
                          style={styles.agreement_link}
                          onPress={thz.handleAgreementDetail.bind(thz)}
                        >
                          《健康宝协议》
                        </Text>
                      </Text>
                    </View>

                    <View style={styles.btn__group}>
                      <ButtonWithBg onPress={thz.handleSubmit.bind(thz)}>
                        完成
                      </ButtonWithBg>
                    </View>

                    <View style={styles.hasRegisted}>
                      {/* <Text style={styles.bottomTextStyle}>已有账号？</Text> */}
                      <Text
                        onPress={thz.handleLogin.bind(thz)}
                        style={styles.bottomTextStyle}
                      >
                        已有账号？ 点击登录
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <Loadding visible={this.state.loading} textContent="登录中..." />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  login__wrap: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    paddingHorizontal: px2dp(50),
    paddingVertical: px2dp(50),
    alignItems: "center",
    justifyContent: "center",
  },
  form__container: {
    width: "100%",
    marginTop: px2dp(50),
  },
  form__wrap: {
    paddingTop: px2dp(140),
    backgroundColor: "#fff",
    paddingBottom: px2dp(70),
  },
  logo__icon: {
    width: px2dp(200),
    height: px2dp(200),
    position: "absolute",
    top: 0,
    left: "50%",
    marginLeft: px2dp(-100),
    marginTop: px2dp(-80),
    overflow: "visible",
    zIndex: 1000,
  },
  form: {
    paddingHorizontal: px2dp(50),
  },
  form__item: {
    // position: "relative",
    height: px2dp(80),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: "#eee",
    borderBottomWidth: px2dp(1),
    marginTop: px2dp(50),
    paddingHorizontal: px2dp(20),
  },
  inputStyle: {
    flex: 1,
    height: px2dp(80),
    paddingVertical: 0,
    paddingHorizontal: px2dp(30),
  },
  inp__icon: {
    width: px2dp(20),
    height: px2dp(30),
  },
  btn__group: {
    marginTop: px2dp(60),
    paddingHorizontal: px2dp(40),
  },
  confirmCode__wrap: {
    width: px2dp(180),
    marginRight: px2dp(-20),
    // paddingHorizontal: px2dp(10),
    // marginTop: px2dp(30),
  },
  confirmCode: {
    height: px2dp(55),
  },
  confirmCodeActive: {
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderWidth: px2dp(1),
    borderColor: Common.colors.themeColor,
  },
  confirmCodeDisabled: {
    backgroundColor: "#bababa",
  },

  agreement__wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: px2dp(40),
  },
  agreement_text: {
    fontSize: px2dp(24),
  },
  agreement_link: {
    color: Common.colors.themeColor,
  },
  hasRegisted: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: px2dp(30),
  },

  thirdLoginRegister: {
    marginTop: px2dp(20),
    paddingHorizontal: px2dp(50),
  },
  bottomTextStyle: {
    color: "#999",
    fontSize: px2dp(24),
    textAlign: "center",
    paddingVertical: px2dp(10),
  },
});

export default Registe;
