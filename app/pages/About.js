import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import px2dp from "../common/px2dp";

const TipsItem = ({ title, content }) => {
  return (
    <View style={styles.help__item}>
      { 
        title && <Text style={[styles.help__title]}>{title}</Text>
      }
      <Text style={[styles.help__content]}>{content}</Text>
    </View>
  );
};

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.boxStyle}>
        <View style={styles.scrollContainer}>
            <View style={styles.help__wrap}>
              <Text style={styles.titleStyle}>关于健康宝内测说明</Text>
              <TipsItem
                content="      十分感谢各位小伙伴对此次内测的关注与积极参与、敬请各位参与者注意，此次测试所得任何数据、dApp内奖励等，仅作为参考，不会被正式记录，将在测试结束后统一进行清除。但为答谢各位小伙伴的参与，【元链-DHC】项目组为各位额外准备了一些小礼物，详细规则、奖励办法等，请参阅以下内容。"
              />
              <View style={[styles.help__item, styles.itemWithListContainer]}>
                <Text style={styles.help__title}>一：参与条件</Text>
                <View style={styles.rule__item}>
                  <Text style={[styles.help__content]}>1、此次dApp健康宝二期Alpha限量测试，前期采用开放注册的方式，后期将根据注册用户人数，开启邀请注册机制。</Text>
                </View>
              </View>
              <View style={[styles.help__item, styles.itemWithListContainer]}>
                <Text style={styles.help__title}>二：奖励规则</Text>
                <View style={styles.rule__item}>
                  <Text style={[styles.help__content]}>1、此次健康宝二期Alpha测试依旧采取奖励池制度，首次将向奖励池内投入1000，000枚DHT。</Text>
                </View>
                <View style={styles.rule__item}>
                  <Text style={[styles.help__content]}>2、将按照数据贡献度【T钻数量】进行奖励发放，计算方法为每一周期内奖励池内DHT总量÷T钻总量进行分配。Ps：详细计算方法请参阅备注【2】。</Text>
                </View>
                <View style={styles.rule__item}>
                  <Text style={[styles.help__content]}>3、健康宝二期Alpha测试，奖励发放渠道仅发放至鼓鼓钱包，请准确填写鼓鼓钱包内盘帐号。Ps：请勿填写充币地址，请填写内盘帐号。</Text>
                </View>
              </View>
              <View style={[styles.help__item, styles.itemWithListContainer]}>
                <Text style={styles.help__title}>三：备注</Text>
                <View style={styles.rule__item}>
                  <Text style={[styles.help__content]}>1、项目组将根据测试进展情况调整此次测试时间、及相关奖励规则。</Text>
                </View>
                <View style={styles.rule__item}>
                  <Text style={[styles.help__content]}>2、如在使用中发现任何问题，请将详细过程使用手机录屏、截图、文字等方式反馈至运营小伙伴手中、或在线通过“意见反馈”的方式进行提交。</Text>
                </View>
                <View style={styles.rule__item}>
                  <Text style={[styles.help__content]}>3、奖励举例说明：此周期【T钻总量】为：1500000，那么就是奖励池内DHT1000000÷1500000=0.666，每1T钻折换成0.666枚DHT，我账户内共有2019T钻，那么就是0.666×2019=1346枚DHT。</Text>
                </View>
              </View>
              <Text style={{fontSize: px2dp(30), textAlign: 'right', marginTop: px2dp(50)}}>【元链-DHC】运营组</Text>
            </View>
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
  scrollContainer: {
    paddingHorizontal: px2dp(40),
  },
  titleStyle: {
    fontSize: px2dp(36),
    textAlign: 'center',
  },
  help__wrap: {
    paddingTop: px2dp(30),
    paddingBottom: px2dp(50),
  },
  help__item: {
    marginTop: px2dp(20),
  },
  help__title: {
    fontSize: px2dp(36),
    color: "#333",
  },
  help__content: {
    marginTop: px2dp(15),
    fontSize: px2dp(28),
    color: "#666",
    lineHeight: px2dp(55),
  },
  itemWithListContainer: {},
});
export default About;
