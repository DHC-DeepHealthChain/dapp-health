import React from "react";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from 'react-navigation';
import px2dp from '../common/px2dp';
import Tools from '../common/tools';

class AccountManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout () {
    const { navigation } = this.props;
    await Tools.removeStorage('jwt');
    await Tools.removeStorage('userId');
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: "PasswordLogin" }),
      ],
    });
    navigation.dispatch(resetAction);
  }
  render() {
    const { userInfo, navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.boxStyle}>
          <TouchableOpacity
            style={styles.itemStyle}
            activeOpacity={0.6}
            onPress={() => { navigation.navigate('PersonalInfo'); }}
          >
            {
              userInfo.headImg ?
                <Image
                  style={{ width: px2dp(81), height: px2dp(81), borderRadius: px2dp(81 / 2) }}
                  source={{ uri: `data:image.jpeg;base64,${userInfo.headImg}` }}
                /> : userInfo.sex === 'female' ?
                <Image
                  style={{ width: px2dp(81), height: px2dp(81) }}
                  source={require('../imgs/userCenter/femaleAvatar.png')}
                /> :
                <Image
                  style={{ width: px2dp(81), height: px2dp(81) }}
                  source={require('../imgs/userCenter/maleAvatar.png')}
                />
            }
            <View style={{ marginLeft: px2dp(23) }}>
              <Text style={{ lineHeight: 24 }}>昵称</Text>
              <Text style={{ color: '#999', lineHeight: 24 }}>{userInfo.nickname ? userInfo.nickname : userInfo.mobileNumber}</Text>
            </View>
            <Image style={styles.checkStyle} source={require('../imgs/account/check.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={this.handleLogout}
            style={{ marginTop: px2dp(237), alignItems: 'center' }}
          >
            <Image source={require('../imgs/account/logout.png')} />
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
  itemStyle: {
    height: px2dp(120),
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#eee',
    flexDirection: 'row',
    paddingHorizontal: px2dp(40),
    alignItems: 'center',
  },
  checkStyle: {
    position: 'absolute',
    right: px2dp(36),
  },
});
export default AccountManage;
