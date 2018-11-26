import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import px2dp from "../common/px2dp";
import Common from "../common/constants";
import BackHeader from "../components/BackHeader";

class Rules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderRules = (list = []) => {
    // const thz = this;
    return list.map(item => {
      return (
        <View style={styles.rule__item} key={item.id}>
          <Text style={[styles.textStyle]}>{item.label}</Text>
        </View>
      );
    });
  };

  render() {
    const thz = this;
    const { navigation } = thz.props;
    const { params } = thz.props.navigation.state;
    const title =
      params.type === "scoreRule"
        ? "积分规则"
        : params.type === "stepRule"
          ? "计步规则"
          : "规则";
    return (
      <View style={{ flex: 1 }}>
        <BackHeader
          title={title}
          hasBorder
          backPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView style={styles.boxStyle}>
          <View style={styles.scrollContainer}>
            <View style={styles.rule__wrap}>
              {params.type === "scoreRule"
                ? thz.renderRules(Common.scoreRules)
                : params.type === "stepRule"
                  ? thz.renderRules(stepDataRules)
                  : null}
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
    textAlign: "center",
    color: "#333",
    marginVertical: px2dp(35),
    fontSize: px2dp(36),
    lineHeight: 24,
  },
  rule__wrap: {
    paddingTop: px2dp(30),
    paddingBottom: px2dp(30),
  },
  rule__item: {
    // marginTop: px2dp(10),
  },
  textStyle: {
    color: "#666",
    lineHeight: 30,
    fontSize: px2dp(28),
  },
});

const stepDataRules = [{ id: "scoreRules1", label: "计步规则" }];
export default Rules;
