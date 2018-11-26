import React from "react";
import moment from 'moment';
import { View, StyleSheet, Text, ScrollView,Image, TouchableOpacity, RefreshControl } from "react-native";
import { NavigationActions } from 'react-navigation';
import px2dp from "../common/px2dp";
import { getStepHistoryList, deleteList } from '../actions/everyDayAction';
import Common from '../common/constants'

const dateFormat = 'YYYY-MM-DD';
const timeFormat= 'HH:mm:ss';
class  StepDataHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: true,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    const { dispatch} = this.props;
    dispatch(getStepHistoryList());
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const { failInfo } = nextProps.user;
    const { list } = nextProps;
    if( failInfo.error === true && failInfo.message === '未登录' ) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: "PasswordLogin" }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    if (list !== undefined) {
      this.setState({
        isRefreshing: false,
      });
    }
  }

  onRefresh = () => {
    const { dispatch, navigation: { state: { params: { type } } } } = this.props;
    const getList = dispatch(getStepHistoryList({ healthType: type }));
    getList.then(() => {
      this.setState({
        isRefreshing: false,
      })
    })
  }

  checkResult = (value, min, max) => {
    if (Number(value) >= Number(min) && Number(value) <= Number(max)) {
      return '正常';
    } else if (Number(value) > Number(max) ) {
      return '超出';
    }
    return '不足';
  }

  handleDelete = (e) => {
    const { dispatch } = this.props;
    this.setState({
      isRefreshing: true,
    })
    const deleted = dispatch(deleteList(e._id)); // eslint-disable-line
    deleted.then(() => {
      this.onRefresh();
    })
  }

  renderItem = (item) => {
    const { content } = JSON.parse(item.content);
    const { navigation: { state: { params: { title } } } } = this.props;
    return (
      <View key={item.ipfsHash} style={{ paddingLeft: px2dp(40), marginRight: px2dp(40) }}>
        <View style={{ flexDirection: 'row', height: px2dp(90), alignItems: 'center' }}>
          <Image source={require('../imgs/TemperatureHistory/mark.png')} />
          <Text style={{ color: '#29d4e8', marginLeft: px2dp(14) }}>{moment(item.createdDate).format(dateFormat)} {title}记录</Text>
        </View>
        <View style={styles.listStyle}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../imgs/TemperatureHistory/direct.png')} />
            <Text style={{ marginLeft: px2dp(15), color: '#666' }}>公里数：{Math.round(content*0.66).toFixed(2)/1000}</Text>
          </View>
          <Text style={{ marginLeft: px2dp(40), color: '#666' }}>
            <Text style={{ marginLeft: px2dp(15), color: '#666' }}>步数：{content}</Text>
          </Text>
          <Text style={{ marginLeft: px2dp(30), color: '#666' }}>
            卡路里：{Math.round(content*0.05).toFixed(2)}
          </Text>
        </View>
      </View>
    )
  }
  render() {
    const { list } = this.props;
    return (
      <View style={{ flex: 1 }}>
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
          {
            list ? list.map(ele => this.renderItem(ele)) :
              <View style={{ alignItems: 'center' }}>
                <Image
                  style={{ marginTop: px2dp(280) }}
                  source={require('../imgs/message/noMessage.png')}
                />
              </View>
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
    height: px2dp(90),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: px2dp(1),
  },
});

export default StepDataHistory;
