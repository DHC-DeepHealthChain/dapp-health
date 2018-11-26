import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { NavigationActions } from 'react-navigation';
import BackHeader from "../components/BackHeader";
import px2dp from '../common/px2dp';
import Tools from "../common/tools";
import { getUserInfo } from '../actions/userCenterAction';

class UserCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllPublic: false,
    };
    this.signIn = this.signIn.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    // this.getUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    const { failInfo } = nextProps.user;
    if( failInfo.error === true && failInfo.message === '未登录' ) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: "PasswordLogin" }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  async getUserInfo() { // eslint-disable-line
    const { dispatch } = this.props;
    const userId = await Tools.getStorage('userId', 'text');
    /* 用户id不存在 */
    if( !userId ) { 
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: "PasswordLogin" }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
      return false;
     }
    dispatch(getUserInfo(userId));
  }

  signIn = () => {
    const { navigation } = this.props;
    navigation.navigate('SignIn');
  }

  handleNext = (nextPage) => {
    const { navigation } = this.props;
    navigation.navigate(nextPage);
  }

  

  handlePublic = () => {
    const { userInfo } = this.props;
    if( this.state.showAllPublic === true && userInfo.publicKey ) {
      Clipboard.setString(userInfo.publicKey);
      Tools.showToast('已复制到剪切板');
      // this.setState({ showAllPublic: false});
    }else if( this.state.showAllPublic === false ) {
      this.setState({ showAllPublic: true});
    }
  }
  /* 公钥地址 */
  renderPublic = () => {
    const thz = this;
    const { userInfo } = thz.props;
    if( thz.state.showAllPublic && userInfo.publicKey ) {
      return userInfo.publicKey;
    } else if( !thz.state.showAllPublic ) {
      return `${userInfo.publicKey.slice(0, 8)}...${userInfo.publicKey.slice(-8)}`;
    }
  }

  renderInfo = () => {
    const { userInfo } = this.props;
    return(
      <View style={{ alignItems: 'center' }}>
        <ImageBackground
          style={{ width: px2dp(724), height: px2dp(331), alignItems: 'center', marginTop: px2dp(-45) }}
          source={require('../imgs/userCenter/infoBg.png')}
          resizeMode="stretch"
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.avatarStyle__wrap}
            onPress={() => { this.props.navigation.navigate('PersonalInfo') }}
          >
            {
              userInfo.headImg ?
                <Image style={styles.avatarStyle} source={{ uri: `data:image/jpeg;base64,${userInfo.headImg}` }} /> :
                userInfo.sex === 'female' ? <Image
                  style={styles.avatarStyle}
                  source={require('../imgs/userCenter/femaleAvatar.png')}
                /> :
                <Image
                  style={styles.avatarStyle}
                  source={require('../imgs/userCenter/maleAvatar.png')}
                />
            }
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginTop: px2dp(35), alignItems: 'center' }}>
            <Text style={{ fontSize: 15, marginRight: px2dp(5) }}>{userInfo.nickname ? userInfo.nickname : userInfo.mobileNumber}</Text>
            {
              userInfo.sex === 'female' ?
              <Image source={require('../imgs/userCenter/female.png')} /> : userInfo.sex === 'male' ?
              <Image source={require('../imgs/userCenter/male.png')} /> : null
            }
          </View>
          {/* 公钥 */}
          <View style={{ flexDirection: 'row', marginTop: px2dp(25), paddingHorizontal: px2dp(60) }}>
            <Text style={[styles.publicTextStyle]}>DHT地址：</Text>
            <Text onPress={this.handlePublic.bind(this)} style={[styles.publicTextStyle, { color: '#999', flex: 1, paddingRight: px2dp(20) }]}>{this.renderPublic()}</Text>
            <Text onPress={() => {
              if( userInfo.publicKey ) {
                Clipboard.setString(userInfo.publicKey);
                Tools.showToast('已复制到剪切板');
              }
            }} style={[styles.publicTextStyle]}>点击复制</Text>
          </View>
          <View style={styles.signInStyle}>
            <TouchableOpacity activeOpacity={0.6} onPress={this.signIn}>
              <Image
                style={{ width: px2dp(111), height: px2dp(76) }}
                source={require('../imgs/userCenter/signIn.png')}
              />
            </TouchableOpacity>
            <Image
              style={{ width: px2dp(52), height: px2dp(52), alignSelf: 'flex-end' }}
              source={require('../imgs/userCenter/gift.png')}
            />
          </View>
        </ImageBackground>
      </View>
    )
  }

  renderItem = (icon, text, next, noBorder) => {
    let borderStyle = {};
    if (!noBorder) {
      borderStyle = {
        borderBottomColor: '#eee',
        borderBottomWidth: px2dp(2),
      }
    }
    return(
      <TouchableOpacity
        activeOpacity={0.6}
        key={text}
        style={[styles.itemStyle, borderStyle]}
        onPress={() => { this.handleNext(next) }}
      >
        <Image resizeMode="contain" style={{ marginLeft: px2dp(10), width: px2dp(36) }} source={icon} />
        <Text style={{ color: '#333', marginLeft: px2dp(48) }}>{text}</Text>
      </TouchableOpacity>
    )
  }   

  render() {
    const { navigation, userInfo } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <BackHeader
          title="个人中心"
          nextIcon={require('../imgs/everyDay/message.png')}
          nextIconStyle={{ width: px2dp(32), height: px2dp(33), marginLeft: px2dp(40) }}
          nextPress={() => {
            navigation.navigate('Message');
          }}
        />
        <ScrollView style={styles.boxStyle}>
          <Image source={require('../imgs/userCenter/topBg.png')} style={{ width: px2dp(750), height: px2dp(322) }} />
          { userInfo.username && this.renderInfo()}
          <View style={{ alignItems: 'center' }}>
            <ImageBackground
              source={require('../imgs/userCenter/middleBg.png')}
              resizeMode="stretch"
              style={{ width: px2dp(725), height: px2dp(440), paddingTop: px2dp(15) }}
            >
              {
                middleMenu.map(ele => this.renderItem(ele.icon, ele.text, ele.nextPage, ele.noBorder))
              }
            </ImageBackground>
            <ImageBackground
              source={require('../imgs/userCenter/bottomBg.png')}
              resizeMode="stretch"
              style={{ width: px2dp(725), height: px2dp(340), paddingTop: px2dp(15) }}
            >
              {
                bottomMenu.map(ele => this.renderItem(ele.icon, ele.text, ele.nextPage, ele.noBorder))
              }
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#fff",
  },
  avatarStyle__wrap: {
    width: px2dp(215),
    height: px2dp(215),
    borderRadius: px2dp(215 /2),
    marginTop: px2dp(-215/2 + 10),
  },
  avatarStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: px2dp(215 /2),
    left: 0,
    top: 0,
  },
  signInStyle: {
    position: 'absolute',
    top: px2dp(-102),
    right: px2dp(30),
    flexDirection: 'row',
    height: px2dp(112),
  },
  itemStyle: {
    flexDirection: 'row',
    height: px2dp(100),
    alignItems: 'center',
    marginLeft: px2dp(24),
    marginRight: px2dp(24),
  },
  publicTextStyle: {
    padding: 0,
    fontSize: px2dp(26),
  },
});

const middleMenu = [
  {
    icon: require('../imgs/userCenter/question.png'),
    text: '我的问卷',
    nextPage: 'MyReport',
  },
  {
    icon: require('../imgs/userCenter/collection.png'),
    text: '我的收藏',
    nextPage: 'MyCollection',
  },
  {
    icon: require('../imgs/userCenter/score.png'),
    text: '我的T钻',
    nextPage: 'Score',
  },
  {
    icon: require('../imgs/userCenter/myInvite_icon.png'),
    text: '我的邀请码',
    nextPage: 'InviteCode',
    noBorder: true,
  },
  // {
  //   icon: require('../imgs/userCenter/step_icon.png'),
  //   text: '我的运动',
  //   nextPage: 'StepData',
  //   noBorder: true,
  // },
];

const bottomMenu = [
  {
    icon: require('../imgs/userCenter/weChatIcon.png'),
    text: '客服微信',
    nextPage: 'FollowWechat',
  },
  {
    icon: require('../imgs/userCenter/issue.png'),
    text: '意见反馈',
    nextPage: 'Feedback',
  },
  {
    icon: require('../imgs/userCenter/setting.png'),
    text: '设置',
    nextPage: 'Setting',
    noBorder: true,
  },
]

export default UserCenter;
