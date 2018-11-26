import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
  NativeModules,
} from "react-native";
import px2dp from "../common/px2dp";
import Common from "../common/constants";
import { submitStepData } from "../actions/everyDayAction";
import Loadding from "../components/Loadding";
import Tools from "../common/tools";

class StepData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepNumber: 0,
      loading: false,
    };
   
  }
  componentDidMount() {
    // 同步步数数据
    const $this = this;
    DeviceEventEmitter.addListener('EventName',  (msg) => {
      $this.setState({
        stepNumber: msg.key,
      });
    });
    NativeModules.TransMissonMoudle.getTime();
  }
  handleSubmit() {
    this.setState({
      loading: true,
    });
    const submit = this.props.dispatch(
      submitStepData({
        step: this.state.stepNumber,
      })
    );
    submit.then(res => {
      this.setState({
        loading: false,
      });
      if (res.error) {
        Tools.showToast("同步失败，请重新同步");
      }else{
        Tools.showToast("同步成功");
      }
    });
  }

  renderItem = item => {
    // const thz = this;
    const unit =
      item.type === "distance"
        ? "公里"
        : item.type === "step"
          ? "步"
          : item.type === "calories"
            ? "卡路里"
            : "";
    return (
      <View style={[styles.stepItem, styles.stepDistance]} key={item.id}>
       <Loadding visible={this.state.loading} textContent="同步中..." />
        <Image
          resizeMode="stretch"
          source={item.icon}
          style={[styles.iconStyle]}
        />
        <Text style={[styles.desTextStyle]}>{item.label}</Text>
        <Text style={[styles.desTextStyle, styles.numTextStyle]}>
          {item.num}
        </Text>
        <Text style={[styles.desTextStyle]}>{unit}</Text>

        {item.type === "calories" ? null : <View style={styles.line} />}
      </View>
    );
  };

  render() {
    const thz = this;
    const list = [
      {
        id: "stepItem1",
        icon: require("../imgs/stepData/distance_icon.png"),
        label: "距离",
        num: `约${Math.round(this.state.stepNumber*0.66).toFixed(2)/1000}`,
        type: "distance",
      },
      {
        id: "stepItem2",
        icon: require("../imgs/stepData/step_icon.png"),
        label: "步数",
        num: this.state.stepNumber,
        type: "step",
      },
      {
        id: "stepItem3",
        icon: require("../imgs/stepData/Calories_icon.png"),
        label: "消耗",
        num: `约${Math.round(this.state.stepNumber*0.05).toFixed(2)}`,
        type: "calories",
      },
    ];
    // const { data, list } = thz.props.score;
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.scrollContainer}>
          <View style={styles.refreshContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.handleSubmit.bind(this)}
              style={[styles.buttonStyle]}
            >
              <ImageBackground
                resizeMode="stretch"
                source={require("../imgs/stepData/refreshBg.png")}
                style={{
                  width: px2dp(360),
                  height: px2dp(300),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: px2dp(42),
                    color: Common.colors.themeColor,
                  }}
                >
                  同步
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: px2dp(36),
                color: Common.colors.themeColor,
                marginTop: px2dp(20),
              }}
            >
              点击同步按钮，立即同步到服务器
            </Text>
          </View>

          <View style={styles.stepDes__wrap}>
            <View style={styles.stepDesContainer}>
              {list.map(item => {
                return thz.renderItem(item);
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  refreshContainer: {
    alignItems: "center",
    borderColor: "#eee",
    borderBottomWidth: px2dp(2),
    borderStyle: "solid",
    paddingTop: px2dp(90),
    paddingBottom: px2dp(40),
  },
  stepDes__wrap: {
    flex: 1,
  },
  stepDesContainer: {
    flexDirection: "row",
    paddingHorizontal: px2dp(20),
    alignItems: "center",
    justifyContent: "center",
    paddingTop: px2dp(60),
    paddingBottom: px2dp(30),
  },
  stepItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    width: px2dp(76),
    height: px2dp(76),
    marginBottom: px2dp(20),
  },
  desTextStyle: {
    fontSize: px2dp(26),
    color: "#666",
  },
  numTextStyle: {
    fontSize: px2dp(46),
    color: Common.colors.themeColor,
    marginVertical: px2dp(30),
  },
  line: {
    width: px2dp(1),
    height: px2dp(88),
    backgroundColor: "#ddd",
    position: "absolute",
    right: 0,
    top: "50%",
    marginTop: px2dp(-44),
  },
  helpContainer: {
    position: 'absolute',
    paddingHorizontal: px2dp(30),
    paddingVertical: px2dp(30),
    right: px2dp(70),
    top: px2dp(50),
  },
});

export default StepData;
