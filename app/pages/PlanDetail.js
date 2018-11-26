import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  // TouchableOpacity,
} from "react-native";
// import moment from 'moment';
import { NavigationActions } from "react-navigation";
import Button from "../components/Button";
import px2dp from "../common/px2dp";
import Common from "../common/constants";
import { joinPlan, cancelPlan } from "../actions/planAction";
import BackHeader from "../components/BackHeader";
import Loadding from "../components/Loadding";

class PlanDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
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

  /* 参与或取消计划 从自己的计划进来显示为取消计划 */
  handleJoinPlan = () => {
    const thz = this;
    const { params } = thz.props.navigation.state;
    thz.setState({visible: true});
    if (params.from && params.from === "ownPlan") {
      // 取消计划
      thz.props.dispatch(cancelPlan({ id: params._id })).then(value => {
        thz.setState({visible: false});
        if (value === "success") {
          /* 返回之前刷新列表页 */
          params.backCb();
          thz.props.navigation.goBack();
        }
      });
    } else {
      // 参与计划
      thz.props.dispatch(joinPlan({ id: params._id })).then(value => {
        thz.setState({visible: false});
        if (value === "success") {
          /* 返回之前刷新列表页 */
          params.backCb();
          thz.props.navigation.goBack();
        }
      });
    }
  };

  renderContentItem = item => {
    return (
      <View key={item.id} style={styles.item}>
        <View style={styles.item__line} />
        <Text style={[styles.textStyle, { lineHeight: px2dp(40) }]}>
          {item.cont}
        </Text>
      </View>
    );
  };

  render() {
    const thz = this;
    const { params } = thz.props.navigation.state;
    const itemContent = JSON.parse(params.content);
    console.log("params", params);

    return (
      <View style={{ flex: 1 }}>
        <BackHeader
          title={itemContent.name ? itemContent.name : "计划详情"}
          hasBorder
          backPress={() => {
            thz.props.navigation.goBack();
          }}
        />
        <View style={{ flex: 1 }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={require("../imgs/plan/planDetailBg.png")}
            resizeMode="stretch"
          />
          <ScrollView contentContainerStyle={{}} style={styles.boxStyle}>
            <View style={styles.scroll_container}>
              <View style={styles.statistics__wrap}>
                <View style={styles.statistics__left}>
                  <Text style={[styles.textStyle]}>阶段总数</Text>
                  <Text style={[styles.textStyle, { fontSize: px2dp(40) }]}>
                    {1}个
                  </Text>
                </View>
                <View style={styles.statistics__line} />
                <View style={styles.statistics__right}>
                  <Text style={[styles.textStyle]}>累计时间</Text>
                  <Text style={[styles.textStyle, { fontSize: px2dp(40) }]}>
                    {itemContent.cycleDay}天
                  </Text>
                </View>
              </View>
              <View style={styles.des__wrap}>
                <Text style={[styles.textStyle, { fontSize: px2dp(30) }]}>
                  简介
                </Text>
                <Text
                  style={[
                    styles.textStyle,
                    { marginTop: px2dp(20), lineHeight: px2dp(40) },
                  ]}
                >
                  {"  "}
                  {itemContent.introduce}
                </Text>
              </View>
              <View style={styles.content__wrap}>
                <Text style={[styles.textStyle, { fontSize: px2dp(30) }]}>
                  内容
                </Text>
                <View style={styles.content}>
                  <Text style={[styles.textStyle, { fontSize: px2dp(26) }]}>
                    {itemContent.content}
                  </Text>
                </View>
              </View>
              <View style={styles.operate__wrap}>
                {/* <Button
                  style={{
                    width: px2dp(480),
                    height: px2dp(85),
                    backgroundColor: "#fff",
                  }}
                  textStyle={{
                    fontSize: px2dp(26),
                    color: Common.colors.themeColor,
                  }}
                  onPress={thz.handleJoinPlan.bind(thz)}
                >
                  {params.from && params.from === "ownPlan"
                    ? "取消计划"
                    : "参与计划"}
                </Button> */}
                {params.from && params.from === "ownPlan" ? null : (
                  <Button
                    style={{
                      width: px2dp(480),
                      height: px2dp(85),
                      backgroundColor: "#fff",
                    }}
                    textStyle={{
                      fontSize: px2dp(26),
                      color: Common.colors.themeColor,
                    }}
                    onPress={thz.handleJoinPlan.bind(thz)}
                  >
                    参与计划
                  </Button>
                )}
              </View>
            </View>
          </ScrollView>
          <Loadding visible={thz.state.visible} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    // backgroundColor: "#ffffff",
    backgroundColor: "transparent",
  },
  scroll_container: {
    paddingHorizontal: px2dp(70),
    paddingTop: px2dp(70),
    paddingBottom: px2dp(60),
  },
  statistics__wrap: {
    borderStyle: "solid",
    borderColor: "#fff",
    borderBottomWidth: px2dp(2),
    borderTopWidth: px2dp(2),
    paddingVertical: px2dp(30),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  statistics__left: {
    // flex: 1,
  },
  statistics__right: {
    // flex: 1,
  },
  statistics__line: {
    width: px2dp(2),
    height: px2dp(70),
    backgroundColor: "#fff",
    marginLeft: px2dp(40),
    marginRight: px2dp(40),
  },
  textStyle: {
    color: "#fff",
    fontSize: px2dp(24),
  },
  des__wrap: {
    paddingVertical: px2dp(50),
  },
  content: {
    paddingVertical: px2dp(20),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  item__line: {
    width: px2dp(10),
    height: px2dp(2),
    backgroundColor: "#fff",
    marginLeft: px2dp(10),
    marginRight: px2dp(20),
  },
  operate__wrap: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: px2dp(60),
  },
});

export default PlanDetail;
