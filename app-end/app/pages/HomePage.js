import React from "react";
import {
  View,
  StyleSheet,
  Text,
  // ScrollView,
  Image,
  TouchableOpacity,
  // RefreshControl,
  // AsyncStorage,
  Linking,
  Clipboard,
  NativeModules,
  DeviceEventEmitter,
} from "react-native";
import Swiper from "react-native-swiper";
// import moment from 'moment';
import { NavigationActions } from "react-navigation";
import Button from "../components/Button";
import AlertModal from "../components/AlertModal";
import BackHeader from "../components/BackHeader";
import px2dp from "../common/px2dp";
import Common from "../common/constants";
import RefreshScrollView from "../components/RefreshScrollView";
import { getArticleList } from "../actions/articleAction";
import { getBannerList, checkIsLatestApp } from "../actions/homePageAction";
import Tools from "../common/tools";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // eslint-disable-line
      isRefreshing: false, // eslint-disable-line
    };
    this.goDetail = this.goDetail.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.getList = this.getList.bind(this);

    DeviceEventEmitter.addListener('EventName',  (msg) => {
      console.log("DeviceEventEmitter收到消息", msg);
    });

  }

  async componentDidMount() {
    const thz = this;

    NativeModules.TransMissonMoudle.getTime();

    const userId = await Tools.getStorage("userId", "text");
    /* 用户id不存在 */
    if (!userId) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "PasswordLogin" })],
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      /* 检查更新 */
      thz.props.dispatch(checkIsLatestApp()).then(() => {
        const { appVersionInfo } = this.props.home;
        // console.log("appVersionInfo", appVersionInfo);
        /* 检查当前是否为最新版本 */
        if (appVersionInfo.version && appVersionInfo.version !== Common.appdes.version) {
          const url = appVersionInfo.path ? appVersionInfo.path : Common.appdes.downloadSite;
          Tools.update(
            `检测到新版本${appVersionInfo.version}`,
            () => {
              Linking.canOpenURL(url)
                .then(supported => {
                  if (!supported) {
                    Tools.alert('不支持跳转功能');
                    Clipboard.setString(url);
                    Tools.showToast('下载链接已复制到剪切板，请至浏览器下载');
                  } else {
                    return Linking.openURL(url);
                  }
                })
                .catch(err => Tools.showToast(err));
            }, () => {});
        }
      });

      thz.getList();
      /* 获取问卷推荐列表数据 首页banner */
      thz.props.dispatch(getBannerList());
    }
  }

  componentWillReceiveProps(nextProps) {
    const { failInfo } = nextProps.user;
    console.log(failInfo);
    if (failInfo.error === true && failInfo.message === "未登录") {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "PasswordLogin" })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }
  /* 获取文章列表数据 */
  getList = () => {
    const thz = this;
    thz.setState({
      isRefreshing: true,
    });
    thz.props.dispatch(getArticleList()).then(() => {
      thz.setState({ isRefreshing: false });
    });
  };

  /* 刷新loading */
  _onRefresh = () => {
    this.getList();
  };

  goDetail(ev, item) {
    const thz = this;
    thz.props.navigation.navigate("ArticleDetail", item);
  }

  /* ITEM */
  renderItem(item) {
    const thz = this;
    const itemContent = JSON.parse(item.content);
    return (
      <TouchableOpacity
        key={item._id} // eslint-disable-line
        activeOpacity={0.8}
        onPress={ev => thz.goDetail(ev, item)}
        style={styles.item_wrap}
      >
        <Image
          source={
            item.listImg
              ? { uri: `data:image/jpeg;base64,${item.listImg}` }
              : require("../imgs/home/recommend_hold.png")
          }
          resizeMode="stretch"
          style={styles.item_img}
        />
        <View style={styles.item_info}>
          <View style={styles.item_title_box}>
            <Text style={styles.item_title}>{itemContent.name}</Text>
          </View>
          <Text style={styles.item_des} numberOfLines={3}>
            {itemContent.content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  /* 容器 */
  renderRefreshProps() {
    const thz = this;
    const props = {
      style: {},
      isRefreshing: thz.state.isRefreshing,
      onRefresh() {
        thz.getList();
      },
    };
    return props;
  }

  render() {
    const thz = this;
    const { navigation, article, home } = thz.props;
    const { list } = article;
    const { bannerList } = home;
    console.log("bannerList", bannerList);
    return (
      <View style={{ flex: 1 }}>
        <BackHeader
          title="健康宝"
          hasBorder
          nextIcon={require("../imgs/everyDay/message.png")}
          nextIconStyle={{
            width: px2dp(35),
            height: px2dp(35),
          }}
          nextPress={() => {
            navigation.navigate("Message");
          }}
        />
        <RefreshScrollView {...thz.renderRefreshProps()}>
          {/* Swiper */}
          <Swiper
            style={styles.wrapper}
            height={px2dp(350)}
            showsButtons={false}
            showsPagination
            activeDotColor={Common.colors.themeColor}
            loop={false}
          >
            {bannerList.map(item => {
              const itemContent = JSON.parse(item.content);
              return (
                <BannerItem
                  key={item._id} // eslint-disable-line
                  onPress={() => {
                    navigation.navigate("Report", {
                      examId: item._id, // eslint-disable-line
                    });
                  }}
                  source={
                    item.listImg
                      ? { uri: `data:image/jpeg;base64,${item.listImg}` }
                      : require("../imgs/home/homebanner_hold.png")
                  }
                  text={itemContent.name}
                />
              );
            })}
          </Swiper>

          {/* main */}
          <View style={styles.main__wrap}>
            <Image
              style={styles.main__bg}
              source={require("../imgs/home/mainBg.png")}
              resizeMode="stretch"
            />
            <View style={styles.main}>
              <Button
                style={[styles.mainBtn, styles.btn__dashed]}
                textStyle={{
                  color: Common.colors.themeColor,
                  fontSize: px2dp(24),
                }}
                onPress={() => {
                  navigation.navigate("Questionnaire");
                }}
              >
                想获得更多奖励？请点击
              </Button>
              <Button
                style={[styles.mainBtn]}
                textStyle={{ fontSize: px2dp(24) }}
                icon={
                  <Image
                    style={styles.btn__icon}
                    source={require("../imgs/home/dateIcon.png")}
                    resizeMode="stretch"
                  />
                }
                onPress={() => {
                  navigation.navigate("Report", {
                    examId: "-1",
                  });
                }}
              >
                立即填写基础问卷奖励200T钻
              </Button>
              <View style={{ marginTop: px2dp(50) }}>
                <Text
                  style={{
                    color: Common.colors.themeColor,
                    fontSize: px2dp(24),
                  }}
                >
                  健康及财富，管理健康数据，还能得奖励！
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.recommend__wrap}>
            <View style={styles.recommend__head}>
              <View style={styles.head__left}>
                <Image
                  style={{
                    width: px2dp(33),
                    height: px2dp(33),
                    marginRight: px2dp(20),
                  }}
                  source={require("../imgs/home/moreRecom.png")}
                  resizeMode="stretch"
                />
                <Text
                  style={{
                    color: "#333",
                    fontSize: px2dp(30),
                    fontWeight: "bold",
                  }}
                >
                  每日推荐
                </Text>
              </View>
              <Text
                onPress={() => {
                  thz.props.navigation.navigate("MoreRecommend");
                }}
                style={{ color: "#c1c1c1", fontSize: px2dp(24) }}
              >
                更多推荐
              </Text>
            </View>
            <View style={styles.list__wrap}>
              {list.slice(0, 3).map(item => {
                return thz.renderItem(item);
              })}
            </View>
          </View>
        </RefreshScrollView>

        {/* 弹窗提示 获取T钻 */}
        <AlertModal visible={thz.state.visible} score={30} />
      </View>
    );
  }
}

/* banner  Item */
const BannerItem = ({ onPress, source, text }) => {
  return (
    <View style={[styles.slide, styles.slide3]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.slideCont}
      >
        <Image style={styles.slideImg} source={source} resizeMode="stretch" />
        {/* {text && <Text style={styles.slideText}>{text}</Text>} */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  wrapper: {},
  slide: {
    flex: 1,
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  slideCont: {
    flex: 1,
    width: px2dp(750),
    height: px2dp(350),
    justifyContent: "center",
    alignItems: "center",
  },
  slideText: {
    color: "#fff",
    fontSize: px2dp(36),
    fontWeight: "bold",
    position: "absolute",
    bottom: px2dp(20),
  },
  main__wrap: {
    paddingVertical: px2dp(30),
  },
  main__bg: {
    width: "100%",
    height: px2dp(240),
    marginTop: px2dp(100),
  },
  main: {
    paddingHorizontal: px2dp(40),
    position: "absolute",
    top: px2dp(30),
    left: px2dp(0),
    width: "100%",
    alignItems: "center",
  },
  mainBtn: {
    flexDirection: "row",
    marginTop: px2dp(30),
    width: px2dp(470),
    height: px2dp(85),
  },
  btn__icon: {
    width: px2dp(42),
    height: px2dp(42),
    marginRight: px2dp(20),
  },
  btn__dashed: {
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderWidth: px2dp(1),
    borderColor: Common.colors.themeColor,
  },

  recommend__wrap: {
    // paddingHorizontal: px2dp(30),
    paddingVertical: px2dp(20),
  },
  recommend__head: {
    paddingHorizontal: px2dp(30),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  head__left: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  list__wrap: {
    // paddingVertical: px2dp(30),
    paddingTop: px2dp(20),
  },
  item_wrap: {
    paddingHorizontal: px2dp(30),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: px2dp(1),
    paddingVertical: px2dp(15),
  },
  item_img: {
    width: px2dp(230),
    height: px2dp(180),
    borderRadius: px2dp(10),
  },
  item_info: {
    flex: 1,
    paddingHorizontal: px2dp(30),
  },
  item_title: {
    fontSize: px2dp(26),
    color: "#333",
    fontWeight: "bold",
  },
  item_des: {
    marginTop: px2dp(20),
    color: "#c1c1c1",
    fontSize: px2dp(24),
    lineHeight: px2dp(40),
  },
  slideImg: {
    width: px2dp(750),
    height: "100%",
  },
});

export default HomePage;
