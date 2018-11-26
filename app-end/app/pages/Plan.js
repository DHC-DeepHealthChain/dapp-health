import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
// import moment from 'moment';
import { NavigationActions } from "react-navigation";
import BackHeader from "../components/BackHeader";
// import Button from "../components/Button";
import RefreshScrollView from "../components/RefreshScrollView";
import EmptyHold from "../components/EmptyHold";
import px2dp from "../common/px2dp";
import Tools from "../common/tools";
import { getPlanList } from "../actions/planAction";

// const freeIcon = require("../imgs/plan/plan_free_icon.png");
const inIcon = require("../imgs/plan/plan_in_icon.png");
// const overIcon = require("../imgs/plan/plan_over_icon.png");

class Plan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      emptyHoldVisible: false,
    };
    this.renderRefreshProps = this.renderRefreshProps.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.goDetail = this.goDetail.bind(this);
    this.getList = this.getList.bind(this);
  }

  componentDidMount() {
    this.getList();
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

  /* 获取计划列表数据 */
  getList = () => {
    const thz = this;
    thz.setState({
      isRefreshing: true,
    });
    thz.props.dispatch(getPlanList()).then(() => {
      thz.setState({ isRefreshing: false });

      const { joinList, notJoinList } = thz.props.plan;
      if (joinList.length === 0 && notJoinList.length === 0) {
        thz.setState({emptyHoldVisible: true});
      }
    });
  };

  goDetail(item, type) {
    if (type === "noJoin") {
      this.props.navigation.navigate("PlanDetail", {
        backCb: this.backCb,
        ...item,
      });
    } else {
      this.props.navigation.navigate("PlanDetailofOwn", {
        backCb: this.backCb,
        ...item,
      });
    }
  }

  /* goback callback */
  backCb = () => {
    this.getList();
  };
  /* ITEM */
  renderItem(item, type) {
    const thz = this;
    const content = JSON.parse(item.content) || {};
    // let statusImag;
    // if (type === 'noJoin') {
    //   statusImag = freeIcon;
    // } else {
    //   statusImag = inIcon;
    // }
    return (
      <View key={item._id} style={styles.item__wrap}>
        <Image
          style={styles.item__img}
          source={
            item.listImg
              ? { uri: `data:image/jpeg;base64,${  item.listImg}` }
              : require("../imgs/plan/plan_bg_01.png")
          }
          resizeMode="stretch"
        />
        {/* icon */}
        {type === "join" ? (
          <Image
            style={styles.item__statusIcon}
            source={inIcon}
            resizeMode="stretch"
          />
        ) : null}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            thz.goDetail(item, type);
          }}
          style={styles.item__content}
        >
          <View style={styles.item__des}>
            {type === "noJoin" ? null : (
              <Text
                style={[
                  styles.des__text,
                  { fontSize: px2dp(24), marginTop: px2dp(10) },
                ]}
              >
                根据目标自己制定
              </Text>
            )}
            <Text style={[styles.des__text, { fontSize: px2dp(38) }]}>
              {content.name}
            </Text>
            <Text
              style={[
                styles.des__text,
                { fontSize: px2dp(26), marginTop: px2dp(20) },
              ]}
            >
              {item.joinNum}人参加
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
    const { navigation } = thz.props;
    const { plan } = this.props;
    console.log("plan", plan);
    const { joinList, notJoinList } = plan;
    return (
      <View style={{ flex: 1 }}>
        <BackHeader
          title="健康计划"
          hasBorder
          nextIcon={require("../imgs/everyDay/message.png")}
          nextIconStyle={{
            width: px2dp(32),
            height: px2dp(33),
            marginLeft: px2dp(40),
          }}
          nextPress={() => {
            navigation.navigate("Message");
          }}
        />
        <RefreshScrollView {...thz.renderRefreshProps()}>
          <View style={styles.container}>
            {joinList.length > 0 &&
              joinList.map(item => {
                return thz.renderItem(item, "join");
              })}

            {joinList.length !== 0 && notJoinList.length !== 0 ? (
              <View style={styles.line__wrap}>
                <View style={styles.line} />
                <Text style={{ color: "#999", fontSize: px2dp(24) }}>
                  其他计划
                </Text>
                <View style={styles.line} />
              </View>
            ) : null}

            {notJoinList.length > 0 &&
              notJoinList.map(item => {
                return thz.renderItem(item, "noJoin");
              })}
          </View>

          <EmptyHold visible={thz.state.emptyHoldVisible} />
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
  container: {
    paddingHorizontal: px2dp(25),
    paddingBottom: px2dp(20),
  },
  item__wrap: {
    marginTop: px2dp(40),
    // paddingVertical: px2dp(20),
  },
  item__img: {
    width: px2dp(700),
    height: px2dp(342),
  },
  item__statusIcon: {
    width: px2dp(100),
    height: px2dp(100),
    position: "absolute",
    left: 0,
    top: 0,
  },
  item__content: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  item__des: {
    paddingLeft: px2dp(50),
  },
  des__text: {
    color: "#fff",
  },

  /* line */
  line__wrap: {
    // paddingVertical: px2dp(20),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: px2dp(40),
  },
  line: {
    width: px2dp(15),
    height: px2dp(3),
    backgroundColor: "#999",
    marginLeft: px2dp(15),
    marginRight: px2dp(15),
  },
});

const joinList = [
  {
    id: 1,
    title: "健康饮食计划",
    bgimg: require("../imgs/plan/plan_bg_01.png"),
    joins: 100,
  },
];
const noJoinList = [
  {
    id: 1,
    title: "冠心病护理计划",
    status: 2,
    bgimg: require("../imgs/plan/plan_bg_02.png"),
    level: 1,
    time: "2周",
    joins: 100,
  },
  {
    id: 2,
    title: "糖尿病护理计划",
    status: 3,
    bgimg: require("../imgs/plan/plan_bg_03.png"),
    level: 1,
    time: "2周",
    joins: 1000,
  },
];

export default Plan;
