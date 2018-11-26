import React from "react";
import { View, StyleSheet, Text, ScrollView, Image,
  RefreshControl, TouchableOpacity } from "react-native";
import { NavigationActions } from 'react-navigation';
import px2dp from "../common/px2dp";
import { getMessage, readMessage } from '../actions/messageAction';
import Common from '../common/constants';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: true,
    };
    this.goNext = this.goNext.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getMessage());
  }

  componentWillReceiveProps(nextProps) {
    const { failInfo } = nextProps.user;
    const { messageList } = nextProps.message;
    if( failInfo.error === true && failInfo.message === '未登录' ) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: "PasswordLogin" }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    if (messageList && messageList.lenth !== 0) {
      this.setState({
        isRefreshing: false,
      });
    }
  }

  onRefresh = () => {
    this.setState({
      isRefreshing: true,
    });
    const thz = this;
    const { dispatch } = this.props;
    dispatch(getMessage()).then(() => {
      thz.setState({
        isRefreshing: false,
      })
    });
  }

  goNext = (item) => {
    const { navigation, dispatch } = this.props;
    const { otherId, messageType } = JSON.parse(item.content);
    navigation.navigate('Report', {
      examId: otherId,
    });
    const read = dispatch(readMessage(item._id)); // eslint-disable-line
    read.then(() => {
      this.onRefresh();
      if (messageType === 'REPORT') {
        navigation.navigate('Report', {
          examId: otherId,
        });
      }
    });
  }

  renderMessage = (item) => {
    return (
      <View>
        {
          item.map((ele) => {
            const { content } = JSON.parse(ele.content);
            return (
              <TouchableOpacity
                key={ele._id} // eslint-disable-line
                style={styles.listStyle}
                activeOpacity={0.6}
                onPress={() => { this.goNext(ele) }}
              >
                <View>
                  <Image source={require('../imgs/message/icon.png')} />
                  {
                    !content.isRead ? <View style={styles.pointStyle} /> : null
                  }
                </View>
                <View style={{ marginLeft: px2dp(35) }}>
                  <Text style={{ fontSize: 14, lineHeight: 24 }}>通知！</Text>
                  <Text style={{ color: '#646464', lineHeight: 18, fontSize: 12 }}>{content}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  renderNoMessage = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          style={{ marginTop: px2dp(280) }}
          source={require('../imgs/message/noMessage.png')}
        />
      </View>
    )
  }
  render() {
    const { messageList } = this.props.message;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.boxStyle}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={[Common.colors.themeColor]}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          {
            messageList && messageList.length !== 0 ? this.renderMessage(messageList) : this.renderNoMessage()
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
    height: px2dp(188),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#eee',
  },
  pointStyle: {
    width: px2dp(20),
    height: px2dp(20),
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#f94646',
    borderRadius: px2dp(10),
  },
});


export default Message;
