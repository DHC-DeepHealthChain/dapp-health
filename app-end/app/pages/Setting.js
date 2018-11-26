import React from "react";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import px2dp from "../common/px2dp";

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNextPage = this.handleNextPage.bind(this);
  }

  handleNextPage = (nextPage) => {
    const { navigation } = this.props;
    navigation.navigate(nextPage);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.boxStyle}>
          {
            list.map((ele) => {
              return (
                <TouchableOpacity
                  key={ele.text}
                  style={styles.listStyle}
                  activeOpacity={0.6}
                  onPress={() => { this.handleNextPage(ele.next) }}
                >
                  <Image
                    resizeMode="contain"
                    source={ele.icon}
                    style={{ width: px2dp(37), marginLeft: px2dp(48), marginRight: px2dp(43) }}
                  />
                  <Text>{ele.text}</Text>
                </TouchableOpacity>
              )
            })
          }
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
  listStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: px2dp(110),
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#eee',
  },
});

const list = [
  {
    icon: require('../imgs/setting/account.png'),
    text: '账号管理',
    next: 'AccountManage',
  },
  {
    icon: require('../imgs/setting/help.png'),
    text: '使用帮助',
    next: 'Help',
  },
  {
    icon: require('../imgs/setting/about.png'),
    text: '关于健康宝',
    next: 'About',
  },
]
export default Setting;
