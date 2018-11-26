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

class InviteCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false, // eslint-disable-line
    };
  }

  componentDidMount() {
    this.getInviteCode();
  }

  getInviteCode = () => {
    const thz = this;
    const { dispatch } = this.props;
    thz.setState({isRefreshing: true});
    dispatch(getInviteCode()).then(() =>{
      thz.setState({isRefreshing: false});
    });
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
      const title = `${userName}${userName ? "的" : ""}邀请码：${
        inviteData.inviteCode
      }`;
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

  /* 分享props 控制分享按钮的显示 */
  handleShareProps = () => {
    const thz = this;
    const { inviteData } = thz.props.userCenter;
    if (Object.keys(inviteData).length === 0) {
      return {};
    }
    const props = {
      nextIcon: require("../imgs/common/shareIcon_black.png"),
      nextIconStyle: {
        width: px2dp(35),
        height: px2dp(35),
      },
      nextPress: thz.handleShare.bind(thz),
    };
    return props;
  }


  renderRefreshProps() {
    const thz = this;
    const props = {
      style: { flex: 1, backgroundColor: "transparent" },
      isRefreshing: thz.state.isRefreshing,
      onRefresh() {
        thz.getInviteCode();
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
          title="邀请码"
          hasBorder={false}
          backPress={() => {
            navigation.goBack();
          }}
          { ...thz.handleShareProps() }
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
                    您的邀请码
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color: "#000",
                        fontSize: px2dp(100),
                        marginTop: px2dp(20),
                      },
                    ]}
                  >
                    {inviteData.inviteCode ? inviteData.inviteCode : ""}
                  </Text>
                  <Button
                    style={{
                      width: px2dp(180),
                      height: px2dp(60),
                      marginTop: px2dp(20),
                    }}
                    onPress={() => {
                      Clipboard.setString(inviteData.inviteCode);
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
                        fontSize: px2dp(22),
                        lineHeight: px2dp(40),
                        paddingHorizontal: px2dp(50),
                        marginTop: px2dp(20),
                        textAlign: "center",
                      },
                    ]}
                  >
                    每邀请一位好友下载并注册，你和好友都将获得T钻奖励，首次可邀请{
                      inviteData.useNum
                    }人，后期将根据注册情况进行调整
                  </Text>

                  <Image
                    style={{
                      width: px2dp(200),
                      height: px2dp(200),
                      marginTop: px2dp(50),
                    }}
                    source={{ uri: inviteData.appPath }}
                    resizeMode="stretch"
                  />
                  <Text
                    style={{
                      color: "#666",
                      fontSize: px2dp(26),
                      marginTop: px2dp(10),
                    }}
                  >
                    扫码下载健康宝
                  </Text>
                  <Text
                    style={{
                      color: "#666",
                      fontSize: px2dp(22),
                      marginTop: px2dp(15),
                    }}
                  >
                    管理健康数据，还能得奖励
                  </Text>
                </ImageBackground>
              </View>

              {/* loadding */}
              {/* <Loadding visible={thz.state.visible} /> */}
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

export default InviteCode;
