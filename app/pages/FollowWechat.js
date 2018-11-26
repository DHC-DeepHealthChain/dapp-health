import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  // TextInput,
  // TouchableOpacity,
  // Keyboard,
  Clipboard,
  ImageBackground,
} from "react-native";
// import { NavigationActions } from "react-navigation";
import px2dp from "../common/px2dp";
import Button from "../components/Button";
// import Common from "../common/constants";
import Tools from "../common/tools";
import platforms from "../common/platforms";
import RefreshScrollView from "../components/RefreshScrollView";
import BackHeader from "../components/BackHeader";
import ShareModal from "../components/ShareModal";
import { getInviteCode } from "../actions/userCenterAction";
import Loadding from "../components/Loadding";

import SharePlatform from "./../common/SharePlatform";
import ShareUtile from "./../common/ShareUtil";

class FollowWechat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.getInviteCode();
  }

  async getInviteCode() {
    // eslint-disable-line
    const { dispatch } = this.props;
    dispatch(getInviteCode());
  }

  /* 分享 */
  handleShare = () => {
    const thz = this;
    const { inviteData, userInfo } = thz.props.userCenter;
    console.log("userInfo", userInfo);
    thz.shareModal.show({ title: "分享", options: platforms }, item => {

      const userName = userInfo.realname
        ? userInfo.realname
        : userInfo.nickname
          ? userInfo.nickname
          : "";
      const title = `${userName}${userName ? '的' : ''}邀请码：${inviteData.inviteCode}`;
      const des = `您的好友${userName}邀请您加入健康宝，快来加入吧。`;

      ShareUtile.share(
        des,
        inviteData.appPath,
        `https://dh.life/download.html?inviteCode=${inviteData.inviteCode}`,
        title,
        SharePlatform[item.key],
        (code, message) => {
          console.log(code + message);
          // message: 分享成功、分享失败、取消分享
          // TODO ...
        }
      );
    });
  };

  renderRefreshProps() {
    const thz = this;
    const props = {
      style: { flex: 1, backgroundColor: "transparent" },
      isRefreshing: thz.state.isRefreshing,
      onRefresh() {
        // thz.getList();
      },
    };

    return props;
  }

  render() {
    const thz = this;
    const {
      navigation,
      userCenter: { inviteData },
    } = thz.props;

    return (
      <View style={{ flex: 1 }}>
        <BackHeader
          title="客服微信"
          hasBorder={false}
          backPress={() => {
            navigation.goBack();
          }}
          nextIcon={require("../imgs/common/shareIcon_black.png")}
          nextIconStyle={{
            width: px2dp(35),
            height: px2dp(35),
          }}
          nextPress={thz.handleShare.bind(thz)}
        />
        <View style={{ flex: 1 }}>
          <Image
            style={styles.bgStyle}
            resizeMode="stretch"
            source={require("../imgs/login/login_bg.png")}
          />
          <View style={styles.bgContainer}>
            <RefreshScrollView {...thz.renderRefreshProps()}>
              <View style={styles.scrollContainer}>
                <ImageBackground
                  style={styles.contentWrap}
                  resizeMode="stretch"
                  source={require("../imgs/inviteCode/inviteCodeBg.png")}
                >
                  <Image
                    style={styles.logo__icon}
                    source={require("../imgs/login/logo.png")}
                    resizeMode="stretch"
                  />
                  <Text
                    style={[
                      styles.textStyle,
                      { color: "#333", fontSize: px2dp(28) },
                    ]}
                  >
                    DHC官方客服微信
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color: "#000",
                        fontSize: px2dp(50),
                        marginTop: px2dp(30),
                      },
                    ]}
                  >
                    微信号：dhc20181818
                  </Text>
                  <Button
                    style={{
                      width: px2dp(180),
                      height: px2dp(60),
                      marginTop: px2dp(30),
                    }}
                    onPress={() => {
                      Clipboard.setString("dhc20181818");
                      Tools.showToast("已复制到剪切板");
                    }}
                  >
                    复制
                  </Button>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color: "#666",
                        fontSize: px2dp(24),
                        lineHeight: px2dp(40),
                        paddingHorizontal: px2dp(50),
                        marginTop: px2dp(30),
                        textAlign: "center",
                      },
                    ]}
                  >
                    添加客服，获得500T钻
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color: "#666",
                        fontSize: px2dp(24),
                        lineHeight: px2dp(40),
                        paddingHorizontal: px2dp(50),
                        marginTop: px2dp(10),
                        textAlign: "center",
                      },
                    ]}
                  >
                    悉心解答您的问题，更多活动抢先知道
                  </Text>

                  <Image
                    style={{
                      width: px2dp(200),
                      height: px2dp(200),
                      marginTop: px2dp(50),
                    }}
                    source={require('../imgs/inviteCode/weChatPublicIcon.jpg')}
                    resizeMode="stretch"
                  />
                  <Text
                    style={{
                      color: "#666",
                      fontSize: px2dp(26),
                      marginTop: px2dp(10),
                    }}
                  >
                    扫描或微信内识别二维码添加客服微信
                  </Text>
                </ImageBackground>
              </View>

              {/* loadding */}
              <Loadding visible={thz.state.visible} />
            </RefreshScrollView>
          </View>
        </View>
        {/* ShareModal */}
        <ShareModal
          ref={shareModal => {
            thz.shareModal = shareModal;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
  },
  bgStyle: {
    height: "100%",
    width: "100%",
  },
  bgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

  scrollContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentWrap: {
    width: px2dp(640),
    paddingTop: px2dp(120),
    height: px2dp(870),
    marginTop: px2dp(160),
    alignItems: "center",
    // justifyContent: "center",
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
  textStyle: {},
});

export default FollowWechat;
