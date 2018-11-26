import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { NavigationActions } from "react-navigation";
import ImagePicker from "react-native-image-crop-picker";
import Loadding from "../components/Loadding";
import px2dp from "../common/px2dp";
import { getUserInfo } from "../actions/userCenterAction";
import { updateInfo } from "../actions/personalInfoAction";
import Tools from "../common/tools";
import Common from "../common/constants";
import URL from "../common/urls";

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isRefreshing: false,
    };
    this.defaultOption = {
      method: "post",
      credentials: "include",
      mode: "cors",
    };
    this.handleClipAvatar = this.handleClipAvatar.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    // this.getUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    const { failInfo } = nextProps.user;
    if (failInfo.error === true && failInfo.message === "未登录") {
      this.goLogin();
    }
    if (nextProps.userInfo.mobileNumber) {
      this.setState({
        isRefreshing: false,
      });
    }
  }

  onRefresh = () => {
    this.setState({
      isRefreshing: true,
    });
    this.getUserInfo();
  };

  async getUserInfo() {
    // eslint-disable-line
    const { dispatch } = this.props;
    const userId = await Tools.getStorage("userId", "text");
    /* 用户id不存在 */
    if (!userId) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "PasswordLogin" })],
      });
      this.props.navigation.dispatch(resetAction);
      return false;
    }
    const getInfo = dispatch(getUserInfo(userId));
    getInfo.then(() => {
      this.setState({
        isRefreshing: false,
      });
    });
  }

  goLogin = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "PasswordLogin" })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  handleNext = item => {
    // console.log(item);
    const { navigation } = this.props;
    if (item.canNext && item.next) {
      navigation.navigate(item.next, item);
    }
  };

  async uploadFile(data) {
    const thz = this;
    const { dispatch } = this.props;
    const jwt = await Tools.getStorage("jwt", "text");
    const userId = await Tools.getStorage("userId", "text");
    const option = {
      ...this.defaultOption,
      headers: {
        Authorization: `${jwt}`,
      },
      body: data,
    };
    try {
      const resJSON = await fetch(`${URL.UPLOADFILE}`, option);
      const response = await resJSON.json();
      if (response.error) {
        if (response.message === "未登录") {
          thz.goLogin();
        } else {
          Tools.showToast(response.message);
        }
      } else {
        const upload = dispatch(
          updateInfo(
            {
              type: "headImg",
              headImg: response.result.documentHash,
            },
            userId
          )
        );
        upload.then(() => {
          thz.setState({
            loading: false,
          });
          Tools.showToast("修改成功");
          thz.getUserInfo();
        });
      }
    } catch (e) {
      Tools.showToast(e.message);
    }
  }

  /* 头像 */
  async handleClipAvatar() {
    const cropImage = await ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    });
    const data = new FormData();
    data.append("file", {
      uri: cropImage.path,
      type: "multipart/form-data",
      name: "image.png",
    });
    this.setState({
      loading: true,
    });
    this.uploadFile(data);
  }

  render() {
    const { userInfo } = this.props;
    const { loading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Loadding visible={loading} textContent="上传中" />
        <ScrollView
          style={styles.boxStyle}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
              tintColor="#ff0000"
              title="加载中..."
              titleColor="#00ff00"
              colors={[Common.colors.themeColor]}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          <TouchableOpacity
            style={styles.listStyle}
            activeOpacity={0.6}
            onPress={this.handleClipAvatar}
          >
            <Text>头像</Text>
            <View style={styles.commonBox}>
              {userInfo.headImg ? (
                <Image
                  style={styles.avatarStyle}
                  source={{ uri: `data:image/jpeg;base64,${userInfo.headImg}` }}
                  resizeMode="stretch"
                />
              ) : (
                <Image
                  style={styles.avatarStyle}
                  source={require("../imgs/userCenter/maleAvatar.png")}
                  resizeMode="stretch"
                />
              )}
              <Image
                style={{ width: px2dp(10), height: px2dp(20) }}
                resizeMode="stretch"
                source={require("../imgs/personalInfo/next.png")}
              />
            </View>
          </TouchableOpacity>
          {list.map(item => (
            <TouchableOpacity
              key={item.text}
              style={styles.listStyle}
              activeOpacity={0.6}
              onPress={() => {
                this.handleNext(item);
              }}
            >
              <Text>{item.text}</Text>
              <View style={styles.commonBox}>
                {userInfo[item.key] ? (
                  <Text
                    style={{
                      color: "#333",
                      marginRight: px2dp(25),
                      paddingLeft: px2dp(30),
                      // flex: 1,
                    }}
                    numberOfLines={3}
                  >
                    {userInfo[item.key]}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: "#bababa",
                      marginRight: px2dp(25),
                      paddingLeft: px2dp(30),
                      // flex: 1,
                    }}
                  >
                    {item.placeholder}
                  </Text>
                )}
                {item.canNext ? (
                  <Image
                    style={{ width: px2dp(10), height: px2dp(20) }}
                    resizeMode="stretch"
                    source={require("../imgs/personalInfo/next.png")}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  listStyle: {
    height: px2dp(110),
    paddingLeft: px2dp(40),
    paddingRight: px2dp(40),
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: px2dp(1),
    borderBottomColor: "#eee",
    justifyContent: "space-between",
  },
  commonBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  avatarStyle: {
    marginRight: px2dp(25),
    width: px2dp(60),
    height: px2dp(60),
    borderRadius: px2dp(30),
  },
});

const list = [
  {
    id: 1,
    key: "nickname",
    text: "昵称",
    canNext: true,
    next: "EditUserInfo",
    placeholder: "请输入昵称",
    inputType: "text",
  },
  {
    id: 2,
    key: "realname",
    text: "真实姓名",
    canNext: true,
    next: "EditUserInfo",
    placeholder: "请输入真实姓名",
    inputType: "text",
  },
  {
    id: 3,
    key: "mobileNumber",
    text: "手机号",
    canNext: false,
    next: "EditUserInfo",
    placeholder: "请输入手机号",
    inputType: "num",
  },
  {
    id: 4,
    key: "introduce",
    text: "给自己的一句话",
    canNext: true,
    next: "EditUserInfo",
    placeholder: "请输入给自己的一句话",
    inputType: "text",
  },
  {
    id: 5,
    key: "kkCoinAddress",
    text: "鼓鼓钱包用户名",
    canNext: true,
    next: "EditUserInfo",
    placeholder: "请输入鼓鼓钱包用户名",
    inputType: "text",
    invalid: value => {
      const reg = /^[a-z0-9-]*$/;
      const reg1 = /^[a-z]*$/;
      const reg2 = /^[0-9]*$/;
      if( value.startsWith('0x') ) {
        return { res: false, message: "鼓鼓用户名格式不正确（小写字母与数字的组合）" };
      }
      if(reg1.test(value)) {
        return { res: false, message: "鼓鼓用户名格式不正确（小写字母与数字的组合）" };
      }
      if(reg2.test(value)) {
        return { res: false, message: "鼓鼓用户名格式不正确（小写字母与数字的组合）" };
      }
      if (reg.test(value)) {
        return { res: true };
      } else {
        return { res: false, message: "鼓鼓用户名格式不正确（小写字母与数字的组合）" };
      }
    },
  },
];
export default PersonalInfo;
