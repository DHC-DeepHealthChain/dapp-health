import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
import px2dp from "../common/px2dp";
import { getScoreList, clearScore } from "../actions/scoreAction";
import RefreshScrollView from "../components/RefreshScrollView";

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }
  componentWillMount() {
    const thz = this;
    thz.props.dispatch(clearScore());
  }
  componentDidMount() {
    const thz = this;
    // thz.getStatisticsScore();
    thz.getList({ page: 1 });
  }

  /* 获取T钻 */
  // getStatisticsScore = () => {
  //   const thz = this;
  //   thz.setState({isRefreshing: true});
  //   thz.props.dispatch(getStatistics())
  //   .then(() => {
  //     thz.setState({isRefreshing: false});
  //   })
  // }
  /* 获取T钻log */
  getList = (params = {}) => {
    const thz = this;
    thz.setState({ isRefreshing: true });
    thz.refreshView.setLoadMore(1);
    thz.props.dispatch(getScoreList(params)).then(() => {
      const { current, pageSize, total } = thz.props.score.pagination;
      thz.setState({ isRefreshing: false });
      let id = 3;
      if (total === 0) {
        id = 0;
      }
      if (current * pageSize >= total) {
        id = 2;
      }
      thz.refreshView.setLoadMore(id);
    });
  };

  /* 获取T钻方式 */
  renderScoreType = type => {
    if (!type) {
      return "";
    }
    const scoreTypes = {
      Invite: "邀请一个人",
      Register: "注册",
      Sign: "每日签到",
      SignWeek: "周签到",
      ComplateUserInfo: "完善个人资料",
      Exam: "完善一个问卷",
      Step3000: "步数3000",
      Step7000: "步数7000",
      ReadArticle: "阅读健康咨询",
      ShareArticle: "每日首次分享生活健康文章至微信朋友圈",
      TakeFeedback: "采纳反馈意见",
      Plan: "完成整个计划",
      PlanItem: "完成计划项",
      UploadMedia: "上传影像",
      AttachWeChatPlatform: "扫二维码关注公众号",
      HealthIndicator: "健康指标",
    };
    if (scoreTypes[type] === undefined) {
      return "";
    }
    return scoreTypes[type];
  };

  /* 容器 */
  renderRefreshProps() {
    const thz = this;
    const { pagination } = thz.props.score;
    const props = {
      style: {},
      isRefreshing: thz.state.isRefreshing,
      onRefresh() {
        // thz.getStatisticsScore();
        thz.getList({ page: 1 });
      },

      /* 加载更多 */
      showLoadMore: true,
      onLoading: async () => {
        thz.getList({
          page: pagination.current + 1,
        });
      },
    };
    return props;
  }

  render() {
    const thz = this;
    const {
      score: { list },
      userCenter: { userInfo },
    } = thz.props;
    return (
      <View style={{ flex: 1 }}>
        <RefreshScrollView
          {...thz.renderRefreshProps()}
          ref={refreshView => {
            thz.refreshView = refreshView;
          }}
        >
          <View style={{ alignItems: "center", marginTop: px2dp(15) }}>
            <ImageBackground
              style={{
                width: px2dp(647),
                height: px2dp(327),
                justifyContent: "center",
                alignItems: "center",
              }}
              source={require("../imgs/score/cardBg.png")}
            >
              <Text
                style={{
                  position: "absolute",
                  left: px2dp(49),
                  top: px2dp(63),
                  color: "#fff",
                }}
              >
                当前T钻为:{" "}
              </Text>
              <ImageBackground
                style={{
                  width: px2dp(247),
                  height: px2dp(239),
                  justifyContent: "center",
                  alignItems: "center",
                }}
                source={require("../imgs/score/scoreBg.png")}
              >
                <Text style={{ fontSize: 32, color: "#fff" }}>
                  {userInfo.score && userInfo.score}
                </Text>
              </ImageBackground>
            </ImageBackground>
          </View>
          <View style={styles.titleStyle}>
            <Text style={{ fontSize: 14 }}>T钻明细</Text>
            <View style={styles.lineStyle} />
          </View>
          <View style={{ paddingLeft: px2dp(40), paddingRight: px2dp(40) }}>
            {list &&
              list.map(item => (
                <View
                  key={item._id}
                  style={{
                    borderBottomColor: "#eee",
                    borderBottomWidth: px2dp(1),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: px2dp(84),
                  }}
                >
                  <Text style={{ color: "#333" }}>
                    {thz.renderScoreType(JSON.parse(item.content).scoreType)}
                  </Text>
                  <Text
                    style={{
                      color: "#c0c0c0",
                      fontSize: 10,
                      position: "absolute",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {item.time}
                  </Text>
                  <Text style={{ color: "#05b092" }}>
                    {JSON.parse(item.content).score}
                  </Text>
                </View>
              ))}
          </View>
        </RefreshScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  titleStyle: {
    height: px2dp(75),
    justifyContent: "center",
    paddingLeft: px2dp(70),
    borderBottomWidth: px2dp(3),
    borderBottomColor: "#eee",
    marginTop: px2dp(50),
  },
  lineStyle: {
    position: "absolute",
    bottom: px2dp(-3),
    height: px2dp(6),
    width: px2dp(107),
    backgroundColor: "#29d4e8",
    left: px2dp(70),
  },
});

const list = [
  {
    source: "签到",
    time: "2018-03-26 10:25:30",
    score: "+100 T钻",
  },
  {
    source: "签到",
    time: "2018-03-26 10:25:31",
    score: "+50 T钻",
  },
  {
    source: "分享文章",
    time: "2018-03-26 10:25:32",
    score: "+10 T钻",
  },
  {
    source: "绑定医生",
    time: "2018-03-26 10:25:33",
    score: "+100 T钻",
  },
  {
    source: "完善信息",
    time: "2018-03-26 10:25:34",
    score: "+10 T钻",
  },
];
export default Score;
