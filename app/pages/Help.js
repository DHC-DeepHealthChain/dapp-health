import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Common from "../common/constants";
import px2dp from "../common/px2dp";

const TipsItem = ({ title, content }) => {
  return (
    <View style={styles.help__item}>
      <Text style={[styles.help__title]}>{title}</Text>
      <Text style={[styles.help__content]}>{`      ${content}`}</Text>
    </View>
  );
};

class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderRules = (list = []) => {
    // const thz = this;
    return list.map(item => {
      return (
        <View style={styles.rule__item} key={item.id}>
          <Text style={[styles.help__content]}>{item.label}</Text>
        </View>
      );
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.boxStyle}>
          <View style={styles.scrollContainer}>
            <View style={styles.help__wrap}>
              <TipsItem
                title="一：关于T钻"
                content="“T钻”是健康宝DAPP不可或缺的一环，是DHC平台为保障生态能有效运行而设置的积分系统，在DHC生态中的任何活动，都需要T钻串联起来"
              />
              <TipsItem
                title="二：如何获得T钻"
                content="用户通过注册，填写健康资料、健康问卷，每日签到，制定健身计划，上传医疗影像资料，阅读、分享健康咨询，邀请好友注册等多种方式均可获得T钻"
              />
              <View style={[styles.help__item, styles.itemWithListContainer]}>
                <Text style={styles.help__title}>三：T钻奖励规则</Text>
                {this.renderRules(Common.scoreRules)}
              </View>
              <TipsItem
                title="四：T钻的用处"
                content="后期将开通积分商城功能，用户可使用T钻在健康宝DAPP积分商城中兑换各种虚拟、实物礼品以及各种相关服务，亦可用来在整个DHC生态中进行交换，其重要性不言而喻。"
              />
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
  help__wrap: {
    paddingTop: px2dp(30),
    paddingBottom: px2dp(50),
  },
  help__item: {
    marginTop: px2dp(40),
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

export default Help;
