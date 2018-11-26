import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  // DeviceEventEmitter,
  // Text,
  // NativeModules,
} from "react-native";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import Swiper from "react-native-swiper";
import store from "./store/store";
import APP from "./containers/app";
import Button from "./components/Button";
import Common from "./common/constants";
import px2dp from "./common/px2dp";

const guide01 = require("./imgs/guide/guide01.png");
const guide02 = require("./imgs/guide/guide02.png");
const guide03 = require("./imgs/guide/guide03.png");
const guide04 = require("./imgs/guide/guide04.png");

const GuideItem = ({ source, button }) => {
  return (
    <View style={[styles.slide]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {}}
        style={styles.slideCont}
      >
        <Image style={styles.slideImg} source={source} resizeMode="stretch" />
      </TouchableOpacity>
      {button ? (
        <View style={[styles.btn_wrap]}>
          <Button
            style={[{ height: px2dp(85), width: px2dp(460) }, button.style]}
            textStyle={{ fontSize: px2dp(30) }}
            onPress={button.onPress}
          >
            立即体验
          </Button>
        </View>
      ) : null}
    </View>
  );
};
export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    // DeviceEventEmitter.addListener("EventName", msg => {
    //   AsyncStorage.setItem("stepNumber", msg.key);
    // });
  }
  componentWillMount() {
    this.checkVersionCode();
  }
  componentDidMount() {
    // const thz = this;
    // MessagePush();
    SplashScreen.hide();
    AsyncStorage.removeItem("jkbAppCode");
    AsyncStorage.setItem("jkbAppCode", "jkb_v_3");
    // 同步步数数据
    // NativeModules.TransMissonMoudle.getTime();
  }

  checkVersionCode = () =>{
    const thz = this;
    AsyncStorage.getItem("jkbAppCode", (error, result) => {
      if (!error) {
        if (!result || result !== "jkb_v_3") {
          thz.setState({
            modalVisible: true,
          });
        }
      }
    });
  }

  /* 关闭导航 */
  shutDownGuide = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    if (this.state.modalVisible) {
      return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
              <Swiper
                style={styles.wrapper}
                showsButtons={false}
                showsPagination
                activeDotColor={Common.colors.themeColor}
                loop={false}
              >
                <GuideItem source={guide01} />
                <GuideItem source={guide02} />
                <GuideItem source={guide03} />
                <GuideItem
                  source={guide04}
                  button={{
                    onPress: this.shutDownGuide.bind(this),
                  }}
                />
              </Swiper>
            </View>
        </View>
      );
    } else {
      return (
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <APP />
          </View>
        </Provider>
      );
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    // position: "absolute",
    // top: 0,
    // left: 0,
    // zIndex: 10000,
  },
  slide: {
    flex: 1,
    width: "100%",
  },
  slideCont: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  slideImg: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  btn_wrap: {
    position: "absolute",
    bottom: px2dp(120),
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
