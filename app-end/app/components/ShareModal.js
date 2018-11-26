/**
 * Created by sybil052 on 2017/6/19.
 */
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  // TouchableHighlight,
  Animated,
  Easing,
  Dimensions,
  // Platform,
  TouchableOpacity,
} from "react-native";
import px2dp from "../common/px2dp";

const { width, height } = Dimensions.get("window");
const contentHeight = px2dp(430);
const [left, top] = [0, 0];

export default class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      title: "",
      hide: true,
      aHeight: contentHeight,
    };
    this.entityList = []; // 数据源
    this.callback = function() {}; // 回调方法
  }

  componentDidMount() {}

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
    this.chooseTimer && clearTimeout(this.chooseTimer);
  }

  // 显示动画
  in() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        easing: Easing.linear, // 一个用于定义曲线的渐变函数
        duration: 200, // 动画持续的时间（单位是毫秒），默认为200。
        toValue: 0.3, // 动画的最终值
      }),
      Animated.timing(this.state.offset, {
        easing: Easing.linear,
        duration: 200,
        toValue: 1,
      }),
    ]).start();
  }

  // 隐藏动画
  out() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        easing: Easing.linear,
        duration: 200,
        toValue: 0,
      }),
      Animated.timing(this.state.offset, {
        easing: Easing.linear,
        duration: 200,
        toValue: 0,
      }),
    ]).start(() => this.setState({ hide: true }));
  }

  // 取消
  cancel() {
    if (!this.state.hide) {
      this.out();
    }
  }

  // 选择
  choose(item) {
    if (!this.state.hide) {
      this.out();
      this.chooseTimer = setTimeout(() => {
        this.callback(item);
      }, 200);
    }
  }

  /**
   * 弹出控件，最多支持3个选项(包括取消)
   * titile: 标题
   * entityList：选择项数据   数组
   * tipTextColor: 字体颜色
   * callback：回调方法
   */
  show(itemData, callback) {
    const title = itemData.title;
    const entityList = itemData.options;
    this.entityList = entityList;
    this.callback = callback;

    console.log(2);

    if (this.state.hide) {
      if (entityList && entityList.length > 0) {
        this.setState(
          {
            title,
            hide: false,
          },
          this.in
        );
      }
    }
  }

  renderItem(item) {
    return (
      <View key={item.id} style={styles.itemStyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.choose.bind(this, item)}
        >
          <Image
            style={[{ width: px2dp(90), height: px2dp(90) }, item.iconStyle]}
            source={item.icon}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <Text
          style={[
            {
              color: "#666",
              fontSize: px2dp(22),
              textAlign: "center",
              marginTop: px2dp(24),
            },
            item.labelStyle,
          ]}
        >
          {item.label}
        </Text>
      </View>
    );
  }

  render() {
    if (this.state.hide) {
      return <View />;
    } else {
      return (
        <View style={styles.container}>
          <Animated.View style={[styles.mask, {

          }]} />

          <Animated.View
            style={[
              {
                width,
                height: this.state.aHeight,
                left,
                alignItems: "center",
                justifyContent: "space-between",
              },
              {
                transform: [
                  {
                    translateY: this.state.offset.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height, height - this.state.aHeight],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.contentContainer}>
              <View style={styles.content}>
                <View style={styles.tipTitleView}>
                  <Text style={styles.tipTitleText}>{this.state.title}</Text>
                </View>
                <View style={styles.listContainer}>
                  {this.entityList.map((item, i) => this.renderItem(item, i))}
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={this.cancel.bind(this)}
              >
                <Text style={styles.buttonText}>取消</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    height,
    left,
    top,
    zIndex: 1000,
  },
  mask: {
    justifyContent: "center",
    backgroundColor: "#000000",
    opacity: 0.3,
    position: "absolute",
    width,
    height,
    left,
    top,
  },
  contentContainer: {
    width,
    height: contentHeight,
    backgroundColor: '#fff',
  },
  // 提示标题
  tipTitleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  // 提示文字
  tipTitleText: {
    color: "#333",
    fontSize: px2dp(26),
  },
  // 取消按钮
  button: {
    height: px2dp(80),
    backgroundColor: "#fff",
    borderTopWidth: px2dp(1),
    borderColor: '#eee',
    borderStyle: 'solid',
    justifyContent: "center",
    alignItems: 'center',
  },
  buttonText: {
    fontSize: px2dp(26),
    color: "#666",
    textAlign: "center",
  },
  content: {
    paddingVertical: px2dp(30),
  },
  listContainer: {
    paddingVertical: px2dp(30),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  itemStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
