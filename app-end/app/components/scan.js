import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Vibration,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from "react-native";

// import {ToastMessage} from '../../utils/toast';
// import Camera from 'react-native-camera';
import ViewFinder from "./viewFinder";
import BackHeader from "../components/BackHeader";
import px2dp from "../common/px2dp";

// import backIcon from '../imgs/common/back.png';//返回按钮
// import scanLine from '../../../assets/img/scan_line.png';//扫描线

const { width, height } = Dimensions.get("window");

export default class Scan extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      transCode: "", // 条码
      openFlash: false,
      active: true,
      flag: true,
      fadeInOpacity: new Animated.Value(0), // 初始值
      isEndAnimation: false, // 结束动画标记
    };
    this._startAnimation = this._startAnimation.bind(this);
    this.transCode = "";
  }

  componentDidMount() {
    this.transCode = "";
    this._startAnimation(false);
  }
  // componentWillUnmount() {
  //     this._startAnimation(true);
  // }

  // 开始动画，循环播放
  _startAnimation(isEnd) {
    Animated.timing(this.state.fadeInOpacity, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start(() => {
      if (isEnd) {
        this.setState({
          isEndAnimation: true,
        });
        return;
      }
      if (!this.state.isEndAnimation) {
        this.state.fadeInOpacity.setValue(0);
        this._startAnimation(false);
      }
    });
    console.log("开始动画");
  }

  barcodeReceived(e) {
    const thz = this;
    if (e.data !== thz.transCode) {
      Vibration.vibrate([0, 500, 200, 500]);
      thz.transCode = e.data; // 放在this上，防止触发多次，setstate有延时
      if (thz.state.flag) {
        thz.changeState(false);
        // 通过条码编号获取数据
      }
      console.log(`transCode=${  thz.transCode}`);
      thz._startAnimation(true);
      thz.props.barcodeReceived && thz.props.barcodeReceived(this.transCode);
    }
  }

  // 返回按钮点击事件
  _goBack() {
    this.setState({
      isEndAnimation: true,
    });
    this.props.navigation.goBack();
  }

  // 开灯关灯
  _changeFlash() {
    this.setState({
      openFlash: !this.state.openFlash,
    });
  }
  /* 我的二维码 */
  _goMyQr() {
    const thz = this;
    thz.props.navigation.navigate("MyQr");
  }

  // 改变请求状态
  changeState(status) {
    this.setState({
      flag: status,
    });
    console.log(`status=${  status}`);
  }

  render() {
    const thz = this;
    const { openFlash, active } = thz.state;

    const propsViewFinder = {
      backgroundColor: "transparent",
      borderWidth: 6,
      borderLength: 40,
      // color: '#e6ae6c',
      color: "#34e889",
      height: 440,
      isLoading: false,
      width: 440,
    };
    return (
      <View style={styles.allContainer}>
        {(() => {
          if (active) {
            return "";
            // <Camera
            //     ref={cam => thz.camera = cam}
            //     style={styles.cameraStyle}
            //     barcodeScannerEnabled={true}
            //     onBarCodeRead={
            //         thz.barcodeReceived.bind(thz)
            //     }
            //     torchMode={openFlash ? 'on' : 'off'}>

            //     <View style={styles.container}>
            //         <View style={styles.titleContainer}>
            //             <View style={styles.leftContainer}>
            //                 <TouchableOpacity activeOpacity={1} onPress={ thz._goBack.bind(thz)}>
            //                     <View>
            //                         <Image style={ styles.backImg } source={ require('../imgs/common/back.png') }/>
            //                     </View>
            //                 </TouchableOpacity>
            //             </View>
            //         </View>
            //     </View>

            //     <View style={styles.centerContainer}/>

            //     {/*<BackHeader
            //         title={'扫码'}
            //         backPress={thz._goBack.bind(thz)}
            //     />*/}

            //     <View style={{flexDirection:'row'}}>
            //         <View style={styles.fillView}/>
            //         <View style={styles.scan}>
            //             <ViewFinder {...propsViewFinder}/>
            //             <Animated.View style={[styles.scanLine, {
            //                 opacity: 1,
            //                 transform:[{
            //                     translateY:this.state.fadeInOpacity.interpolate({
            //                         inputRange:[0, 1],
            //                         outputRange:[0, px2dp(440)]
            //                     })
            //                 }]
            //             }]}>
            //                 <Image style={{width: px2dp(440)}} resizeMode={"stretch"} source={require('../imgs/qr_scan_icon.png')}/>
            //             </Animated.View>
            //         </View>
            //         <View style={styles.fillView}/>
            //     </View>
            //     <View style={styles.bottomContainer}>
            //         <Text
            //             style={[
            //             styles.text,
            //             {
            //                 textAlign: 'center',
            //                 width: px2dp(520),
            //                 marginTop: active ? px2dp(25) : px2dp(285),
            //             },
            //         ]}
            //             numberOfLines={2}
            //         >
            //             将二维码放入框内即可自动扫描。
            //         </Text>
            //         {/*<TouchableOpacity onPress={thz._changeFlash.bind(thz)}>
            //             <View style={styles.flash}>
            //                 <Text style={styles.icon}>&#xe61a;</Text>
            //                 <Text style={styles.text}>
            //                     开灯/关灯
            //                 </Text>
            //             </View>
            //         </TouchableOpacity>*/}
            //         <TouchableOpacity onPress={thz._goMyQr.bind(thz)}>
            //             <View style={styles.flash}>
            //                 <Text style={[styles.text, {fontSize: px2dp(36),color: '#34e889'}]}>
            //                     我的二维码
            //                 </Text>
            //             </View>
            //         </TouchableOpacity>
            //     </View>
            // </Camera>
          }
        })()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
  },

  cameraStyle: {
    alignSelf: "center",
    width,
    height,
    // flex: 1,
  },
  flash: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: px2dp(120),
  },
  flashIcon: {
    fontSize: 1,
    color: "#fff",
  },
  text: {
    fontSize: px2dp(28),
    color: "#fff",
    marginTop: px2dp(10),
  },
  icon: {
    color: "#fff",
    fontSize: px2dp(40),
    fontFamily: "iconfont",
  },
  scanLine: {
    alignSelf: "center",
  },
  centerContainer: {
    ...Platform.select({
      ios: {
        height: px2dp(160),
      },
      android: {
        height: px2dp(120),
      },
    }),
    width,
    backgroundColor: "#000",
    opacity: 0.7,
  },
  bottomContainer: {
    alignItems: "center",
    backgroundColor: "#000",
    alignSelf: "center",
    opacity: 0.7,
    flex: 1,
    width,
  },
  fillView: {
    width: (width - px2dp(440)) / 2,
    height: px2dp(440),
    backgroundColor: "#000",
    opacity: 0.7,
  },
  scan: {
    width: px2dp(440),
    height: px2dp(440),
    alignSelf: "center",
  },

  /* 返回按钮 */
  container: {
    ...Platform.select({
      ios: {
        height: px2dp(128),
      },
      android: {
        height: px2dp(100),
      },
    }),
    backgroundColor: "#000",
    opacity: 0.7,
  },
  titleContainer: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: px2dp(30),
      },
      android: {
        paddingTop: 0,
      },
    }),
    flexDirection: "row",
  },
  leftContainer: {
    flex: 0,
    justifyContent: "center",
  },
  backImg: {
    marginLeft: px2dp(20),
  },
});
