import React from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from "react-native";
import { NavigationActions } from 'react-navigation';
import moment from 'moment';
import Loadding from '../components/Loadding';
import px2dp from "../common/px2dp";
import AlertModal from "../components/AlertModal"; 
import { signIn, getList, getSignInfo } from '../actions/signInAction';
import Tools from "../common/tools";
import Common from '../common/constants'

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: true,
      modalVisible: false,
      loading: false,
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.handleSign = this.handleSign.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getList());
    dispatch(getSignInfo());
  }

  componentWillReceiveProps(nextProps) {
    const { failInfo } = nextProps.user;
    const { list, signInfo } = nextProps.signIn;
    if( failInfo.error === true && failInfo.message === '未登录' ) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: "PasswordLogin" }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    if (list !== null && signInfo !== null) {
      this.setState({
        isRefreshing: false,
      });
    }
  }

  async onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    const thz = this;
    const { dispatch } = this.props;
    await dispatch(getSignInfo());
    await dispatch(getList());
    thz.setState({
      isRefreshing: false,
    });
  }


  checkSign = (list, item) => {
    return list.some(ele => new Date(Number(moment(ele.signTime).format('x'))).getDay() === item.id);
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          modalVisible: false,
        })
      }, 3000);
    });
  }

  handleSign = () => {
    const thz = this;
    const { dispatch, signIn: { signInfo } } = this.props;
    if (signInfo.isSign) {
      Tools.showToast('今日已签到');
      return false;
    }
    this.setState({
      loading: true,
    })
    const sign = dispatch(signIn());
    sign.then(() => {
      thz.onRefresh();
      thz.setState({
        loading: false,
      }, () => {
        /* 签到完成获取积分提示框 */
        // thz.showModal();
        Tools.showToast('签到成功');
      });
    })
  }

  render() {
    const { signIn: { signInfo, list } } = this.props;
    const { modalVisible, loading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Loadding visible={loading} textContent="签到中" />
        <AlertModal visible={modalVisible} score={signInfo && signInfo.score} />
        <ScrollView
          style={styles.boxStyle}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
              tintColor="#ff0000"
              title="加载中..."
              titleColor="#00ff00"
              colors={[Common.colors.themeColor]}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          <View style={styles.buttonBoxStyle}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this.handleSign}
            >
              <Image source={require('../imgs/signIn/signIn.png')} />
            </TouchableOpacity>
            <Text style={styles.textStyle}>本周已签到 {signInfo && signInfo.num} 天</Text>
            <Text style={styles.textStyle}>本次签到可获得 {signInfo && signInfo.score} T钻</Text>
          </View>
          <View style={styles.titleStyle}>
            <Text style={{ fontSize: 14 }}>签到记录</Text>
            <View style={styles.lineStyle} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: px2dp(30) }}>
            {
              list && week.map(item => (
                <View
                  style={{
                    width: px2dp(97),
                    height: px2dp(97),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#999',
                    borderWidth: px2dp(1),
                    borderRadius: px2dp(10),
                    backgroundColor: this.checkSign(list, item) ? '#29d4e8' : '#fff',
                  }}
                key={item.day}>
                  <Text style={{ color: this.checkSign(list, item) ? '#fff' : '#333' }}>{item.day}</Text>
                </View>
              ))
            }
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
  buttonBoxStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: px2dp(400),
    backgroundColor: '#29d4e8',
  },
  textStyle: {
    fontSize: 15,
    color: '#fff',
    marginTop: px2dp(30),
  },
  titleStyle: {
    height: px2dp(75),
    justifyContent: 'center',
    paddingLeft: px2dp(70),
    borderBottomWidth: px2dp(3),
    borderBottomColor: '#eee',
    marginTop: px2dp(25),
  },
  lineStyle: {
    position: 'absolute',
    bottom: px2dp(-3),
    height: px2dp(6),
    width: px2dp(107),
    backgroundColor: '#29d4e8',
    left: px2dp(70),
  },
});

const week = [
  {
    id: 1,
    day: '周一',
    isSign: false,
  },
  {
    id: 2,
    day: '周二',
    isSign: false,
  },
  {
    id: 3,
    day: '周三',
    isSign: false,
  },
  {
    id: 4,
    day: '周四',
    isSign: false,
  },
  {
    id: 5,
    day: '周五',
    isSign: false,
  },
  {
    id: 6,
    day: '周六',
    isSign: false,
  },
  {
    id: 0,
    day: '周日',
    isSign: false,
  },
]

export default SignIn;
