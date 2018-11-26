import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
  DeviceEventEmitter,
  TouchableOpacity,
  NativeModules,
} from "react-native";
import { NavigationActions } from "react-navigation";
import { submitData } from "../actions/everyDayAction";
import Loadding from "../components/Loadding";
import px2dp from "../common/px2dp";
import Tools from "../common/tools";

class HeaythyIndexDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      refused: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    DeviceEventEmitter.addListener('EventName',  (msg) => {
      console.log("DeviceEventEmitter收到消息", msg);
    });
  }
  
 componentDidMount(){
    NativeModules.TransMissonMoudle.getTime();
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

  checkRange = (value, min, max) => {
    if (Number(value) >= Number(min) && Number(value) <= Number(max)) {
      return true;
    }
    return false;
  };

  handleTextChange = (data, ele) => {
    this.setState({
      [ele.nameEN]: data,
    });
  };
  handleSubmit = () => {
    const thz = this;
    const { dispatch } = this.props;
    const { params } = this.props.navigation.state;
    const {
      list: { children },
    } = params;
    let i = 0;
    const l = children.length;
    for (i; i < l; i++) {  // eslint-disable-line
      if (!thz.state[children[i].nameEN]) {
        continue;  // eslint-disable-line
      }
      const validRes = thz.checkRange(
        thz.state[children[i].nameEN],
        children[i].min,
        children[i].max
      );
      if (!validRes) {
        Tools.showToast("请输入合理范围的值");
        return false;
      }
    }
    const hasNull = children.some(
      item =>
        this.state[item.nameEN] === undefined || this.state[item.nameEN] === ""
    );
    if (hasNull) {
      Tools.showToast("填写数据不完整");
      return false;
    }
    const data = {};
    children.map(ele => {
      data[ele.nameEN] = this.state[ele.nameEN];
      return undefined;
    });
    this.setState({
      loading: true,
    });
    const submit = dispatch(
      submitData({
        healthType: params.type,
        content: data,
      })
    );
    submit.then(res => {
      this.setState({
        loading: false,
      });
      if (res.error) {
        return false;
      }
      setTimeout(() => {
        this.props.navigation.navigate("EveryDay");
      }, 2000);
    });
  };

  renderItem = item => {
    return (
      <View key={item.nameEN} style={styles.inputBoxStyle}>
        <Text style={{ fontSize: 18, marginLeft: px2dp(6) }}>
          {item.childrenName}
        </Text>
        <View
          style={{
            width: px2dp(2),
            height: px2dp(33),
            marginLeft: px2dp(17),
            backgroundColor: "#eee",
          }}
        />
        <TextInput
          onChangeText={data => {
            this.handleTextChange(data, item);
          }}
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          value={this.state[item.nameEN]}
          style={{
            width: px2dp(400),
            height: px2dp(55),
            marginLeft: px2dp(17),
            fontSize: 16,
            padding: 0,
          }}
        />
        <Text style={{ color: "#999", fontSize: 16 }}>{item.unit}</Text>
      </View>
    );
  };

  render() {
    const { loading } = this.state;
    const {
      params: { list },
    } = this.props.navigation.state;
    return (
      <View style={{ flex: 1 }}>
        <Loadding visible={loading} textContent="提交中..." />
        <ScrollView style={styles.boxStyle}>
          {list.children.map(e => this.renderItem(e))}
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this.handleSubmit}
              style={{
                alignItems: "center",
                marginTop: px2dp(174),
                width: px2dp(505),
                height: px2dp(113),
              }}
            >
              <Image source={require("../imgs/temperature/complete.png")} />
            </TouchableOpacity>
          </View>
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
  inputBoxStyle: {
    flexDirection: "row",
    alignItems: "center",
    height: px2dp(75),
    paddingHorizontal: px2dp(40),
    paddingVertical: px2dp(10),
    marginTop: px2dp(40),
    borderBottomColor: "#eee",
    borderBottomWidth: px2dp(1),
  },
});

export default HeaythyIndexDetail;
