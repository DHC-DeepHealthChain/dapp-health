import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import px2dp from "../common/px2dp";

class MyReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.boxStyle}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => { navigation.navigate('Report', {
            examId: '-1',
          }) }}
          style={styles.itemStyle}
        >
          <Image style={{ marginLeft: px2dp(63) }} source={require('../imgs/report/question.png')} />
          <Text style={{ marginLeft: px2dp(44), color: '#333' }}>基础问卷</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  itemStyle: {
    height: px2dp(110),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: px2dp(1),
  },
});
export default MyReport;
