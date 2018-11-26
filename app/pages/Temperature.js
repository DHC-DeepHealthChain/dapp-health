import React from "react";
import { View, StyleSheet, Text, ScrollView, TextInput,
  Image, TouchableOpacity } from "react-native";
import px2dp from "../common/px2dp";
import Tools from '../common/tools';

class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTextChange = (temperature) => {
    this.setState({
      temperature,
    });
  }
  handleSubmit = () => {
    const { temperature } = this.state;
    if (!temperature) {
      Tools.showToast('请输入体温');
      return false;
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.boxStyle}>
          <View style={styles.inputBoxStyle}>
            <Text style={{ fontSize: 18, marginLeft: px2dp(6) }}>体温</Text>
            <View style={{ width: px2dp(2), height: px2dp(33), marginLeft: px2dp(17), backgroundColor: '#eee' }} />
            <TextInput onChangeText={this.handleTextChange} underlineColorAndroid="transparent" style={{ width: px2dp(520), marginLeft: px2dp(17), fontSize: 16 }} />
            <Text style={{ color: '#999', fontSize: 16 }}>℃</Text>
          </View>
          <View
            style={{ height: px2dp(75), marginLeft: px2dp(32), flexDirection: 'row', alignItems: 'center' }}
          >
            <View style={{ width: px2dp(18), height: px2dp(18), borderRadius: px2dp(9), backgroundColor: '#29d4e8' }} />
            <Text style={{ marginLeft: px2dp(18), color: '#999' }}>默认输入的体温为腋下温度</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={this.handleSubmit}
            style={{ alignItems: 'center', marginTop: px2dp(174) }}
          >
            <Image source={require('../imgs/temperature/complete.png')} />
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    height: px2dp(75),
    marginLeft: px2dp(26),
    marginRight: px2dp(26),
    marginTop: px2dp(40),
    borderBottomColor: '#eee',
    borderBottomWidth: px2dp(1),
  },
});
export default Temperature;
