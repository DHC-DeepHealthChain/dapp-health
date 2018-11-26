import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  // CheckBox,
  Keyboard,
} from "react-native";
import { NavigationActions } from "react-navigation";
import px2dp from "../common/px2dp";
import ButtonWithBg from "../components/ButtonWithBg";
import Button from "../components/Button";
import Loadding from "../components/Loadding";
import Common from "../common/constants";
import Tools from "../common/tools";
import { getCaptcha, combinePhone } from "../actions/registerActions";
import { passwordLogin, clearFailedInfo, thirdLogin  } from "../actions/userAction";

class CombinePhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledCode: false,
      currentTime: 60,
      code: null,
      loading: false,
      loaddingContent: "正在绑定...",
    };
  }

  componentWillMount() {
    this.props.dispatch(clearFailedInfo());
  }
  componentWillReceiveProps(nextProps) {
    const { code } = nextProps.register;
    if (code !== null) {
      this.setState({
        code,
      });
    }
  }
  /* 完成 */
  handleSubmit() {
    const thz = this;
    Keyboard.dismiss();
    thz.setState({ loading: true });
    const { mobileNumber, confirmCode, code } = this.state;
    const { params } = thz.props.navigation.state;
    if (!mobileNumber) {
      Tools.showToast("请输入手机号");
      return false;
    }
    if (!confirmCode) {
      Tools.showToast("请输入验证码");
      return false;
    }
    if (code !== Number(confirmCode)) {
      Tools.showToast("验证码错误");
      return false;
    }

    const data = {
      mobile: mobileNumber,
      openid: params.openid,
    };

    thz.props
      .dispatch(combinePhone(data))
      .then(() => {
        /* 绑定成功 登录 */
        thz.setState({ loaddingContent: "正在登录..." });
        const loginParam = {
          openid: params.openid,
        };
        thz.props
          .dispatch(thirdLogin(loginParam))
          .then(value => {
            thz.setState({ visible: false });
            if (value === "success") {
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: "HomePage" }),
                ],
              });
              thz.props.navigation.dispatch(resetAction);
            }
          })
          .catch(() => {
            thz.setState({ loading: false });
          });
      })
      .catch(() => {
        thz.setState({ loading: false });
      });
  }

  /* 已有账号登录 */
  handleGoLogin() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "PasswordLogin" })],
    });
    this.props.navigation.dispatch(resetAction);
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
    const getCapptcha = dispatch(getCaptcha(mobileNumber, 'reset'));
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
    return (
      <View style={styles.boxStyle}>
        <Image
          style={{ flex: 1 }}
          source={require("../imgs/login/login_bg.png")}
          resizeMode="stretch"
        />
        <View style={styles.login__wrap}>
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
                        style={[styles.confirmCode, styles.confirmCodeDisabled]}
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
                        style={[styles.confirmCode, styles.confirmCodeActive]}
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
                <View style={styles.btn__group}>
                  <ButtonWithBg onPress={thz.handleSubmit.bind(thz)}>
                    绑定
                  </ButtonWithBg>
                </View>
                <View style={styles.hasRegisted}>
                  {/* <Text style={styles.bottomTextStyle}>已有账号？</Text> */}
                  <Text
                    onPress={thz.handleGoLogin.bind(thz)}
                    style={styles.bottomTextStyle}
                  >
                    已有账号？ 点击登录
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Loadding
          visible={this.state.loading}
          textContent={thz.state.loaddingContent}
        />
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
    width: "100%",
    height: "100%",
    paddingHorizontal: px2dp(50),
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
    marginLeft: -px2dp(100),
    marginTop: -px2dp(80),
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

  bottomTextStyle: {
    color: "#999",
    fontSize: px2dp(24),
    textAlign: "center",
    paddingVertical: px2dp(10),
    marginHorizontal: px2dp(20),
  },
});

export default CombinePhone;
