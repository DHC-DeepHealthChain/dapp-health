import React from "react";
import {
  View,
  StyleSheet,
  Text,
  // ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  // RefreshControl,
  // AsyncStorage,
  Linking,
  Clipboard,
  // NativeModules,
  // DeviceEventEmitter,
  Platform,
} from "react-native";
// import Swiper from "react-native-swiper";
// import moment from 'moment';
import { NavigationActions } from "react-navigation";
// import Button from "../components/Button";
import AlertModal from "../components/AlertModal";
// import BackHeader from "../components/BackHeader";
import Loadding from "../components/Loadding";
import Diamond from "../components/Diamond";
import px2dp from "../common/px2dp";
import Common from "../common/constants";
import RefreshScrollView from "../components/RefreshScrollView";
import {
  checkIsLatestApp,
  getDiamondList,
  getRankList,
  updateState,
  receivedDiamond,
} from "../actions/homePageNewAction";
import Tools from "../common/tools";
import { getUserInfo, updateUserInfo } from "../actions/userCenterAction";

/* 名次icon */
const nos = [
  require("../imgs/newHome/no_01.png"), // eslint-disable-line
  require("../imgs/newHome/no_02.png"), // eslint-disable-line
  require("../imgs/newHome/no_03.png"), // eslint-disable-line
];

class HomePageNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // eslint-disable-line
      isRefreshing: false, // eslint-disable-line
      rankSortType: "total", // eslint-disable-line
      loaddingVisible: false, // eslint-disable-line
      receivingDiamong: false, // eslint-disable-line


      member: [], // eslint-disable-line

    };
    // DeviceEventEmitter.addListener("EventName", msg => {
    //   console.log("DeviceEventEmitter收到消息", msg); // eslint-disable-line
    // });

    this.loopList = [];
    this.currentLoopList = []; // eslint-disable-line
  }

  componentWillMount() {

  }
  async componentDidMount() {
    const thz = this;
    // NativeModules.TransMissonMoudle.getTime();

    const userId = await Tools.getStorage("userId", "text");
    /* 用户id不存在 */
    if (!userId) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "PasswordLogin" })],
      });
      this.props.navigation.dispatch(resetAction);
      return;
    } else {
      /* 检查更新 */
      thz.props.dispatch(checkIsLatestApp()).then(() => {
        const { appVersionInfo } = this.props.homeNew;
        // console.log("appVersionInfo", appVersionInfo);
        /* 检查当前是否为最新版本 */
        if (
          appVersionInfo.version &&
          appVersionInfo.version !== Common.appdes.version
        ) {
          const url = appVersionInfo.path
            ? appVersionInfo.path
            : Common.appdes.downloadSite;
          Tools.update(
            `检测到新版本${appVersionInfo.version}`,
            () => {
              Linking.canOpenURL(url)
                .then(supported => {
                  if (!supported) {
                    Tools.alert("不支持跳转功能");
                    Clipboard.setString(url);
                    Tools.showToast("下载链接已复制到剪切板，请至浏览器下载");
                  } else {
                    return Linking.openURL(url);
                  }
                })
                .catch(err => Tools.showToast(err));
            },
            () => {}
          );
        }
      });
    }

    thz.queryDiamondList({ loopList: thz.currentLoopList });
    /* 获取rank  T钻排行 */
    thz.queryRankList({ order: thz.state.rankSortType });
    thz.queryUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    const { failInfo } = nextProps.user;
    // console.log(failInfo);
    if (failInfo.error === true && failInfo.message === "未登录") {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "PasswordLogin" })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  async queryUserInfo() {
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
    dispatch(getUserInfo(userId));
  }

  /* 获取未读积分 钻石 */
  queryDiamondList = (params = {}) => {
    const thz = this;
    thz.setState(
      {
        isRefreshing: true,
      },
      () => {
        this.props
          .dispatch(
            getDiamondList({
              ...params,
            })
          )
          .then(() => {
            thz.setState({
              isRefreshing: false,
            });
          });
      }
    );
  };
  /* 获取排行列表 */
  queryRankList = params => {
    const thz = this;
    thz.setState(
      {
        isRefreshing: true,
      },
      () => {
        this.props
          .dispatch(getRankList({ pageSize: 30, ...params }))
          .then(() => {
            thz.setState({
              isRefreshing: false,
            });
          });
      }
    );
  };

  /* 请求 */
  requestReceivedDiamond = loopList => {
    const thz = this;
    const nLoopList = [...loopList];
    const current = nLoopList.splice(-1)[0];
    if (current) {
      const {
        userCenter: { userInfo },
        homeNew: { diamondList },
      } = thz.props;
      console.log("diamondList", diamondList);
      thz.props
        .dispatch(receivedDiamond({ id: current._id, looked: true }))
        .then(() => {
          thz.requestReceivedDiamond(nLoopList);
        })
        .catch(() => {
          const nList = thz.currentLoopList.filter(item => {
            if (item._id !== current._id) {
              return item;
            }
          });
          thz.currentLoopList = nList;
          thz.props.dispatch(
            updateState({
              diamondList: diamondList.concat(current),
            })
          );
          thz.props.dispatch(
            updateUserInfo({
              userInfo: {
                ...userInfo,
                score:
                  userInfo.score -
                  parseFloat(JSON.parse(current.content).score),
              },
            })
          );
          thz.requestReceivedDiamond(nLoopList);
        });
    } else {
      const {
        homeNew: { diamondList, pagination },
      } = thz.props;
      thz.setState({
        receivingDiamong: false,
      });
      if (diamondList.length === 0) {
        thz.queryDiamondList({ loopList: thz.currentLoopList });
      }
      return false;
    }
  };

  /* 循环请求 */
  loopReceiveDiamond = item => {
    const thz = this;
    clearTimeout(thz.tid);
    thz.loopList.push(item);

    thz.currentLoopList.push(item);

    thz.tid = setTimeout(() => {
      const nList = [...thz.loopList];
      thz.loopList = [];
      thz.requestReceivedDiamond(nList);
    }, 1500);
  };

  /* 点击钻石 */
  handleDiamondPress = (item, index) => {
    const thz = this;
    thz.setState({ receivingDiamong: true });
    const {
      userCenter: { userInfo },
      homeNew: { diamondList },
    } = thz.props;
    const currentScore = userInfo.score;
    const nCurrentScore =
      userInfo.score + parseFloat(JSON.parse(item.content).score);
    const currentDiamondList = [...diamondList];
    const hasReceived = currentDiamondList.splice(index, 1);
    thz.props.dispatch(
      updateState({
        diamondList: currentDiamondList,
      })
    );
    thz.props.dispatch(
      updateUserInfo({
        userInfo: {
          ...userInfo,
          score: nCurrentScore,
        },
      })
    );
    thz.loopReceiveDiamond(item);
  };

  /* 容器 */
  renderRefreshProps() {
    const thz = this;
    const props = {
      style: {},
      showsVerticalScrollIndicator: false,
      isRefreshing: thz.state.isRefreshing,
      onRefresh() {
        if( thz.state.receivingDiamong ) {
          return false;
        }
        thz.queryDiamondList({loopList: thz.currentLoopList});
        thz.queryRankList({ order: thz.state.rankSortType });
        thz.queryUserInfo();
      },
    };
    return props;
  }

  render() {
    const thz = this;
    const {
      navigation,
      homeNew: { rankList, diamondList },
      userCenter: { userInfo },
    } = thz.props;

    return (
      <View style={{ flex: 1 }}>
        <RefreshScrollView {...thz.renderRefreshProps()}>
          <View style={styles.scrollContainer}>
            <ImageBackground
              resizeMode="stretch"
              source={require("../imgs/newHome/headerBg.png")}
              style={[
                styles.mainContainer,
                { paddingTop: Platform.OS === "ios" ? px2dp(120) : px2dp(100) },
              ]}
            >
              <View style={styles.mainHeader}>
                <View style={[styles.headerLeft, styles.flexRowCenter]}>
                  <Image
                    style={{
                      width: px2dp(38),
                      height: px2dp(34),
                      marginRight: px2dp(20),
                    }}
                    resizeMode="stretch"
                    source={require("../imgs/newHome/diamond.png")}
                  />
                  <Text
                    style={[
                      styles.textStyle,
                      { color: Common.colors.themeColor },
                    ]}
                  >
                    T钻 {userInfo.score ? userInfo.score : 0}
                  </Text>
                </View>
                {/* <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {}}
                  style={[styles.headerRight, styles.flexRowCenter]}
                >
                  <Text
                    style={[
                      styles.textStyle,
                      { color: Common.colors.themeColor },
                    ]}
                  >
                    T钻秘籍
                  </Text>
                </TouchableOpacity> */}
              </View>

              {/* 钻石 堆 */}
              <View style={[styles.diamondMain, styles.flexRowCenter, {}]}>
                {diamondList.length !== 0 ? null : (
                  <Diamond label="正在生长中" preventOut />
                )}
                {diamondList.map((item, index) => {
                  return (
                    <Diamond
                      key={item._id} // eslint-disable-line
                      label={JSON.parse(item.content).score}
                      position={item.position}
                      onPress={() => {
                        thz.handleDiamondPress(item, index);
                      }}
                    />
                  );
                })}
              </View>

              <View style={[styles.operateWrap]}>
                {operateList.map(item => {
                  return (
                    <OperateItem
                      key={item.id}
                      {...item}
                      onPress={next => {
                        navigation.navigate(next);
                      }}
                    />
                  );
                })}
              </View>
            </ImageBackground>

            {/* list */}
            <View style={styles.listContainer}>
              <Image
                resizeMode="stretch"
                style={{ width: "100%", height: px2dp(10) }}
                source={require("../imgs/newHome/homeListBgHeader.png")}
              />
              <ImageBackground
                source={require("../imgs/newHome/homeListBgBody.png")}
                resizeMode="stretch"
                style={styles.listBg}
              >
                <View
                  style={[
                    styles.listNav,
                    styles.flexRowCenter,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <View style={[styles.flexRowCenter]}>
                    <View
                      style={{
                        width: px2dp(2),
                        height: px2dp(28),
                        marginRight: px2dp(20),
                        backgroundColor: Common.colors.themeColor,
                      }}
                    />
                    <Text
                      style={{
                        color: Common.colors.themeColor,
                        fontSize: px2dp(28),
                      }}
                    >
                      T钻排行榜
                    </Text>
                  </View>
                  {/* <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      const params = {};
                      thz.setState((pre) => {
                        if(pre.rankSortType === 'today') {
                          params.order = 'total';
                        } else if(pre.rankSortType === 'total') {
                          params.order = 'today';
                        }
                        return {
                          rankSortType: params.order,
                        }
                      }, () => {
                        thz.queryRankList(params);
                      });
                    }}
                    style={[styles.flexRowCenter]}
                  >
                    <Text
                      style={[
                        {
                          color: Common.colors.themeColor,
                          fontSize: px2dp(28),
                        },
                      ]}
                    >
                      {thz.state.rankSortType === "today"
                        ? "按总T钻排序"
                        : thz.state.rankSortType === "total"
                          ? "按今日获取T钻排序"
                          : "T钻排序"}
                    </Text>
                    <Image
                      style={{
                        width: px2dp(12),
                        height: px2dp(22),
                        marginLeft: px2dp(10),
                      }}
                      resizeMode="stretch"
                      source={require("../imgs/newHome/arrow_right.png")}
                    />
                  </TouchableOpacity> */}
                </View>

                <View style={styles.tableContainer}>
                  <View
                    style={[
                      styles.flexRowCenter,
                      styles.tablePadding,
                      styles.tableItem,
                      styles.tableHeader,
                    ]}
                  >
                    <View style={[styles.itemChild, styles.childFirst]}>
                      <Text style={[styles.tableText]}>名次</Text>
                    </View>
                    <View style={[styles.itemChild]}>
                      <Text style={[styles.tableText]}>用户名</Text>
                    </View>
                    <View style={[styles.itemChild, styles.childEnd]}>
                      <Text
                        style={[
                          styles.tableText,
                          {
                            color: Common.colors.themeColor,
                          },
                        ]}
                      >
                        总T钻
                      </Text>
                    </View>
                  </View>

                  {rankList.map(item => {
                    return (
                      <TableItem
                        key={item.index}
                        {...item}
                        rankSortType={thz.state.rankSortType}
                      />
                    );
                  })}
                </View>
              </ImageBackground>
            </View>
          </View>
        </RefreshScrollView>

        <View style={styles.headerWrap}>
          <View style={[styles.header, styles.flexRowCenter]}>
            {Platform.OS === "ios" ? (
              <View style={{ height: px2dp(30), backgroundColor: "#fff" }} />
            ) : null}
            <Text style={{ fontSize: px2dp(30), color: "#fff" }}>健康宝</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate("Message");
              }}
              style={[styles.messageStyle, styles.flexRowCenter]}
            >
              <Image
                style={{ width: px2dp(32), height: px2dp(33) }}
                resizeMode="stretch"
                source={require("../imgs/userCenter/message.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* 弹窗提示 获取T钻 */}
        <AlertModal visible={thz.state.visible} score={30} />

        {/* loadding */}
        <Loadding visible={thz.state.loaddingVisible} />
      </View>
    );
  }
}

const operateList = [
  // {
  //   id: "operate1",
  //   icon: require("../imgs/newHome/getTdiamond.png"),
  //   label: "获取T钻",
  // },
  {
    id: "operate2",
    icon: require("../imgs/newHome/articles.png"),
    label: "资讯挖钻",
    next: "EveryDay",
  },
];
const OperateItem = ({ icon, label, next, onPress }) => {
  const handlePress = () => {
    if (onPress && next) {
      onPress(next);
    }
  };
  return (
    <View style={[styles.operateItem]}>
      <TouchableOpacity activeOpacity={0.7} onPress={handlePress} style={{}}>
        <Image
          style={{ width: px2dp(80), height: px2dp(80) }}
          resizeMode="stretch"
          source={icon}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.textStyle,
          { fontSize: px2dp(28), marginTop: px2dp(15) },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};
const TableItem = ({ ...props }) => {
  return (
    <View style={[styles.flexRowCenter, styles.tablePadding, styles.tableItem]}>
      <View style={[styles.itemChild, styles.childFirst]}>
        {props.index < 4 ? (
          <View style={[styles.img__wrap]}>
            <Image
              style={{
                width: px2dp(24),
                height: px2dp(34),
              }}
              resizeMode="stretch"
              source={nos[props.index - 1]}
            />
          </View>
        ) : (
          <View style={[styles.img__wrap]}>
            <Text
              style={{
                textAlign: "left",
                color: "#333",
              }}
            >
              {props.index}
            </Text>
          </View>
        )}
      </View>
      <View style={[styles.itemChild]}>
        <Text style={[styles.tableText]}>
          {props.username
            ? props.username
            : props.nickname
              ? props.nickname
              : props.mobile
                ? `***${props.mobile.slice(-4)}`
                : ""}
        </Text>
      </View>
      <View style={[styles.itemChild, styles.childEnd]}>
        <Text
          style={[
            styles.tableText,
            {
              color: Common.colors.themeColor,
            },
          ]}
        >
          {props.score}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: "#fff",
  },
  flexRowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  boxStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    // paddingTop: px2dp(100),
  },
  headerWrap: {
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
  header: {
    height: px2dp(100),
    backgroundColor: "transparent",
  },
  messageStyle: {
    paddingHorizontal: px2dp(30),
    height: px2dp(100),
    position: "absolute",
    right: 0,
    top: 0,
  },
  mainContainer: {
    height: px2dp(850),
  },
  mainHeader: {
    paddingVertical: px2dp(10),
    paddingLeft: px2dp(40),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {},
  headerRight: {
    width: px2dp(200),
    height: px2dp(48),
    borderColor: Common.colors.themeColor,
    borderWidth: px2dp(2),
    borderRadius: px2dp(24),
    marginRight: px2dp(-30),
  },
  diamondMain: {
    // flex: 1,
    height: px2dp(470),
  },
  operateWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: px2dp(20),
    paddingBottom: px2dp(80),
  },
  operateItem: {
    alignItems: "center",
    width: px2dp(160),
  },

  listContainer: {
    paddingHorizontal: px2dp(12),
    // paddingBottom: px2dp(30),
    marginTop: px2dp(-60),
  },
  listBg: {
    minHeight: px2dp(400),
    paddingHorizontal: px2dp(14),
    paddingBottom: px2dp(30),
  },
  listNav: {
    paddingHorizontal: px2dp(20),
    height: px2dp(70),
  },
  tablePadding: {
    paddingHorizontal: px2dp(40),
    borderColor: "#eee",
    borderBottomWidth: px2dp(1),
  },
  tableHeader: {
    height: px2dp(80),
  },
  tableItem: {
    height: px2dp(70),
  },
  itemChild: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  childFirst: {
    justifyContent: "flex-start",
  },
  img__wrap: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // width: px2dp(55),
  },
  childEnd: {
    justifyContent: "flex-end",
  },
  tableText: {
    fontSize: px2dp(24),
    color: "#333",
  },
  diamondStyle: {
    alignItems: "center",
  },
});

export default HomePageNew;
