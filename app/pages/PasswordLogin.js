import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  // Clipboard,
} from "react-native";
import { NavigationActions } from "react-navigation";
import px2dp from "../common/px2dp";
import ButtonWithBg from "../components/ButtonWithBg";
import Button from "../components/Button";
import Common from "../common/constants";
import Tools from "../common/tools";
import {
  passwordLogin,
  clearFailedInfo,
  thirdLogin,
} from "../actions/userAction";
import Loadding from "../components/Loadding";

import SharePlatform from "./../common/SharePlatform";
import ShareUtile from "./../common/ShareUtil";

class PasswordLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleForget = this.handleForget.bind(this);
    // this.handleThirdLogin = this.handleThirdLogin.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(clearFailedInfo());
  }

  handleForget = () => {
    this.props.navigation.navigate("VerificationCodeLogin");
  };

  handleLogin = () => {
    const thz = this;
    const { phone, password } = thz.state;
    if (!phone) {
      Tools.showToast("请输入手机号");
      return false;
    }
    if (!password) {
      Tools.showToast("请输入密码");
      return false;
    }
    const data = {
      mobileNumber: phone,
      password,
    };
    // console.log(data);
    Keyboard.dismiss();
    /* loading */
    thz.setState({ visible: true });
    thz.props
      .dispatch(passwordLogin(data))
      .then(value => {
        thz.setState({ visible: false });
        if (value === "success") {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "HomePage" })],
          });
          thz.props.navigation.dispatch(resetAction);
        }
      })
      .catch(() => {
        thz.setState({ visible: false });
      });
  };

  /* 第三方登录 */
  handleThirdLogin = item => {
    const thz = this;
    /* loading */
    thz.setState({ visible: true });
    ShareUtile.auth(SharePlatform[item.key], (code, result, message) => {
      // const str = code + JSON.stringify(result) + JSON.stringify(message);
      if (code === 0) {
        const data = {
          openid: result.openid,
          screen_name: result.screen_name,
          iconurl: result.iconurl,
          gender: result.gender,
        };
        Keyboard.dismiss();
        thz.props
          .dispatch(thirdLogin(data))
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
          .catch((mes) => {
            thz.setState({ visible: false });
            thz.props.navigation.navigate("Registe", { type: 'thirdLoginRegister', tips: mes.message, ...data });
          });
      } else {
        thz.setState({ visible: false });
        // Tools.showToast(message);
      }
    });
  };

  render() {
    const thz = this;
    const { navigation } = thz.props;
    return (
      <View style={styles.boxStyle}>
        <Image
          style={{ height: "100%", width: "100%" }}
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
                      this.state.phone = text;
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
                      this.state.password = text;
                    }}
                    placeholderTextColor="#bababa"
                    underlineColorAndroid="transparent"
                    style={styles.inputStyle}
                    placeholder="请输入您的密码"
                    secureTextEntry
                  />
                </View>
                <View style={styles.forget}>
                  <Text
                    style={styles.forget_link}
                    onPress={thz.handleForget.bind(thz)}
                  >
                    忘记密码？
                  </Text>
                </View>
                <View style={styles.btn__group}>
                  <ButtonWithBg onPress={thz.handleLogin.bind(thz)}>
                    登录
                  </ButtonWithBg>
                  <View style={styles.loginIn__wrap}>
                    <Button
                      style={styles.loginIn}
                      textStyle={{ color: Common.colors.themeColor }}
                      onPress={() => {
                        navigation.navigate("Registe");
                      }}
                    >
                      注册
                    </Button>
                  </View>
                </View>
                <View style={styles.thirdPart__wrap}>
                  <View style={styles.part__title}>
                    <View style={styles.lineStyle} />
                    <Text
                      style={{
                        color: "#999",
                        fontSize: px2dp(24),
                        marginLeft: px2dp(20),
                        marginRight: px2dp(20),
                      }}
                    >
                      第三方账号登录
                    </Text>
                    <View style={styles.lineStyle} />
                  </View>
                  {thirds.map(item => {
                    return (
                      <ThirdLoginItem
                        key={item.id}
                        onPress={() => {
                          thz.handleThirdLogin(item);
                        }}
                        icon={item.icon}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Loadding visible={this.state.visible} textContent="登录中..." />
        </View>
      </View>
    );
  }
}

const ThirdLoginItem = ({ ...props }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: px2dp(30),
      }}
    >
      <Image
        style={{
          width: px2dp(70),
          height: px2dp(57),
        }}
        source={props.icon}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );
};

const thirds = [
  {
    id: "third1",
    icon: require("../imgs/login/weixin.png"),
    key: "WECHAT",
  },
];

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
    paddingBottom: px2dp(85),
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

  forget: { marginTop: px2dp(20) },
  forget_link: {
    color: Common.colors.themeColor,
    textAlign: "right",
    fontSize: px2dp(24),
  },

  btn__group: {
    marginTop: px2dp(60),
    paddingHorizontal: px2dp(40),
  },
  loginIn__wrap: {
    paddingHorizontal: px2dp(10),
    marginTop: px2dp(30),
  },
  loginIn: {
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderWidth: px2dp(2),
    borderColor: Common.colors.themeColor,
  },
  thirdPart__wrap: {
    marginTop: px2dp(30),
    paddingHorizontal: px2dp(30),
  },
  part__title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  lineStyle: {
    width: px2dp(120),
    height: px2dp(1),
    backgroundColor: "#999",
  },
});

export default PasswordLogin;
