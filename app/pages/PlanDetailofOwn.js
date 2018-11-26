import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  // TouchableOpacity,
  RefreshControl,
} from "react-native";
// import moment from 'moment';
import { NavigationActions } from "react-navigation";
import Button from "../components/Button";
import px2dp from "../common/px2dp";
import Common from "../common/constants";
import Tools from "../common/tools";
import BackHeader from "../components/BackHeader";
import RefreshScrollView from "../components/RefreshScrollView";
import AlertModal from "../components/AlertModal";
import Loadding from "../components/Loadding";
import {
  cancelPlan,
  getOwnPlanDetail,
  finishPlan,
} from "../actions/planAction";

class PlanDetailofOwn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planDetail: {},
      planDetailContent: {},
      ownPlanFinishData: {},
      isRefreshing: false,
      finish: false,
      scoreVisible: false,
      visible: false,
    };
  }

  componentDidMount() {
    const thz = this;
    thz.getDetail();
  }
  componentWillReceiveProps(nextProps) {
    const { failInfo } = nextProps.user;
    if (failInfo.error === true && failInfo.message === "未登录") {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "PasswordLogin" })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  /* 刷新 */
  onRefresh = () => {
    const thz = this;
    thz.getDetail();
  };
  /* 获取参与计划详情 */
  getDetail = () => {
    const thz = this;
    const { params } = thz.props.navigation.state;
    thz.setState({ isRefreshing: true });
    thz.props.dispatch(getOwnPlanDetail({ id: params._id })).then(value => {
      thz.setState({ isRefreshing: false });
      if (value === "success") {
        const { planDetail, planDetailContent } = thz.props.plan;
        if( planDetail.allFinish === true ) {
          Tools.showToast('该计划已全部完成！');
        }
        thz.setState({
          planDetail,
          planDetailContent,
          finish: planDetail.finish,
          allFinish: planDetail.allFinish,
        });
      }
    });
  };

  /* 取消计划 */
  handleCancelPlan = () => {
    const thz = this;
    const { params } = thz.props.navigation.state;
    thz.setState({ visible: true });
    thz.props.dispatch(cancelPlan({ id: params._id })).then(value => {
      thz.setState({ visible: false });
      if (value === "success") {
        // alert('取消成功');
        params.backCb();
        thz.props.navigation.goBack();
      }
    });
  };
  /* 完成 （当天）计划 */
  handleFinishPlan = () => {
    const thz = this;
    /* 判断当前计划是否为已完成状态 如果是不执行结束 */
    if (thz.state.finish || thz.state.allFinish) return false;
    thz.setState({ visible: true });
    const { params } = thz.props.navigation.state;
    thz.props.dispatch(finishPlan({ id: params._id })).then(value => {
      thz.setState({ visible: false });
      if (value === "success") {
        const { ownPlanFinishData } = thz.props.plan;
        thz.setState({
          finish: true,
          /* 显示获得T钻modal */
          // scoreVisible: true,
          ownPlanFinishData,
        });
        // clearTimeout(thz.timer);
        // thz.timer = setTimeout(() => {
        //   thz.setState({ scoreVisible: false });
        // }, 2000);
      }
    });
  };

  /* 容器 */
  renderRefreshProps() {
    const thz = this;
    const props = {
      style: {},
      isRefreshing: thz.state.isRefreshing,
      onRefresh() {
        thz.getDetail();
      },
    };
    return props;
  }

  render() {
    const thz = this;
    const {
      planDetail,
      planDetailContent,
      finish,
      allFinish,
      ownPlanFinishData,
    } = thz.state;
    const { params } = thz.props.navigation.state;
    return (
      <View style={{ flex: 1 }}>
        <BackHeader
          title={planDetailContent.title ? planDetailContent.title : "计划进度"}
          hasBorder
          backPress={() => {
            thz.props.navigation.goBack();
          }}
          // nextIcon={require('../imgs/common/shareIcon_black.png')}
          // nextIconStyle={{width: px2dp(30), height: px2dp(34)}}
          // nextHandle={() => {}}
        />
        <RefreshScrollView {...thz.renderRefreshProps()}>
          {!(
            Object.keys(planDetail).length === 0 ||
            Object.keys(planDetailContent).length === 0
          ) ? (
            <View style={styles.scroll_container}>
              <View style={styles.title__wrap}>
                <View style={styles.title__left}>
                  <Text style={styles.textStyle}>
                    第{planDetailContent.step}天
                  </Text>
                  <View style={styles.verticalLine} />
                  <Text style={styles.textStyle}>
                    {planDetailContent.title}
                  </Text>
                </View>
                <Button
                  onPress={thz.handleCancelPlan.bind(thz)}
                  style={{
                    width: px2dp(130),
                    height: px2dp(45),
                    backgroundColor: "#999",
                  }}
                  textStyle={{
                    fontSize: px2dp(24),
                  }}
                >
                  取消计划
                </Button>
              </View>

              <View style={styles.img__wrap}>
                <Image
                  style={{
                    height: px2dp(440),
                    width: px2dp(690),
                    borderRadius: px2dp(20),
                  }}
                  source={require("../imgs/plan/planDetailHolde.png")}
                  resizeMode="stretch"
                />
              </View>
              <View style={styles.content__wrap}>
                <Text
                  style={[
                    styles.textStyle,
                    { fontSize: px2dp(24), lineHeight: px2dp(42) },
                  ]}
                >
                  {planDetailContent.content}
                </Text>
              </View>
              <View style={styles.operate__wrap}>
                <Button
                  onPress={() => {
                    thz.props.navigation.navigate("PlanDetail", {
                      from: "ownPlan",
                      ...params,
                    });
                  }}
                  style={{
                    flex: 3,
                    height: px2dp(85),
                    backgroundColor: "#fff",
                    borderWidth: px2dp(1),
                    borderColor: "#999",
                  }}
                  textStyle={{
                    fontSize: px2dp(30),
                    color: "#999",
                  }}
                >
                  查看计划简介
                </Button>
                <Button
                  onPress={thz.handleFinishPlan.bind(thz)}
                  style={[
                    styles.btnStyle,
                    ( !finish && !allFinish ) ? styles.btnActStyle : styles.btnDisabledStyle,
                  ]}
                  textStyle={{
                    fontSize: px2dp(30),
                  }}
                >
                  我完成啦
                </Button>
              </View>
            </View>
          ) : null}

          {/* 弹窗提示 获取T钻 */}
          <AlertModal
            visible={thz.state.scoreVisible}
            score={ownPlanFinishData.itemScore}
            secondTip={
              ownPlanFinishData.planScore
                ? { score: ownPlanFinishData.itemScore }
                : null
            }
          />
          <Loadding visible={thz.state.visible} />
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
  scroll_container: {
    paddingHorizontal: px2dp(30),
  },
  title__wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: px2dp(30),
  },
  title__left: {
    flexDirection: "row",
    // justifyContent: 'start',
    alignItems: "center",
  },
  textStyle: {
    fontSize: px2dp(36),
    color: "#333",
  },
  verticalLine: {
    width: px2dp(2),
    height: px2dp(36),
    backgroundColor: "#333",
    marginLeft: px2dp(15),
    marginRight: px2dp(15),
  },
  content__wrap: {
    paddingVertical: px2dp(30),
  },
  operate__wrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: px2dp(50),
  },
  btnStyle: {
    flex: 5,
    height: px2dp(85),
    marginLeft: px2dp(25),
  },
  btnActStyle: {
    backgroundColor: Common.colors.themeColor,
  },
  btnDisabledStyle: {
    backgroundColor: "#999",
  },
});

export default PlanDetailofOwn;
