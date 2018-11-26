import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
// import moment from 'moment';
import { NavigationActions } from "react-navigation";
import RefreshScrollView from "../components/RefreshScrollView";
import px2dp from "../common/px2dp";
import { getQuestionList } from "../actions/homePageAction";

class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      loadMore: false,
    };
    this.renderRefreshProps = this.renderRefreshProps.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.goDetail = this.goDetail.bind(this);
  }

  componentDidMount() {
    const thz = this;
    thz.getList();
  }

  componentWillReceiveProps(nextProps) {
    const { failInfo } = nextProps.user;
    if (failInfo.error === true && failInfo.message === "未登录") {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "PasswordLogin" })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  getList = () => {
    const thz = this;
    /* 获取问卷列表 */
    thz.setState({isRefreshing: true});
    thz.props.dispatch(getQuestionList())
    .then(() => {
      thz.setState({isRefreshing: false});
    })
  };

  /* 详情 */
  goDetail(item) {
    const thz = this;
    thz.props.navigation.navigate("Report", {
      examId: item._id, // eslint-disable-line
    });
  }

  renderRefreshProps() {
    const thz = this;
    const props = {
      style: {},
      isRefreshing: thz.state.isRefreshing,
      loadMore: thz.state.loadMore,
      onRefresh() {
        thz.setState({isRefreshing: true});
        thz.getList();
      },
      onLoading() {
        // const { pageSize, current, total } = thz.state.pagination;
        // const param = {};
        // if (current * pageSize < total || current * pageSize == total) {
        //   thz.setState({ loadMore: true });
        //   param.page = current + 1;
        // thz._getList(param);
        // }
      },
    };

    return props;
  }

  /* ITEM */
  renderItem( item ) {
    const thz = this;
    const itemContent = JSON.parse(item.content);
    return (
      <TouchableOpacity
        key={item._id}
        activeOpacity={0.8}
        onPress={() => {thz.goDetail(item)}}
        style={styles.item_wrap}
      >
        <Image
          source={
            item.listImg
              ? { uri: `data:image/jpeg;base64,${item.listImg}` }
              : require("../imgs/home/recommend_hold.png")
          }
          resizeMode="stretch"
          style={styles.item_img}
        />
        <View style={styles.item_info}>
          <View style={styles.item_title_box}>
            <Text numberOfLines={1} style={styles.item_title}>
              {itemContent.name}
            </Text>
          </View>
          <Text style={styles.item_des}>{itemContent.introduce}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const thz = this;
    const { home } = this.props;
    const { questionList } = home;
    console.log('questionList', questionList);
    return (
      <View style={{ flex: 1 }}>
        <RefreshScrollView {...thz.renderRefreshProps()}>
          <View style={styles.container}>
            <View style={styles.list__wrap}>
              {questionList.map((item, index) => {
                return thz.renderItem(item, index);
              })}
            </View>
          </View>
        </RefreshScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    // paddingHorizontal: px2dp(25),
    paddingBottom: px2dp(20),
  },

  item_wrap: {
    paddingHorizontal: px2dp(30),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: px2dp(1),
    paddingVertical: px2dp(15),
  },
  item_img: {
    width: px2dp(230),
    height: px2dp(180),
    borderRadius: px2dp(10),
  },
  item_info: {
    flex: 1,
    paddingLeft: px2dp(30),
  },
  item_title_box: {
    flexDirection: "row",
    alignItems: "center",
  },
  collection_wrap: {
    paddingHorizontal: px2dp(20),
    paddingVertical: px2dp(20),
  },
  item_title: {
    flex: 1,
    fontSize: px2dp(26),
    color: "#333",
    fontWeight: "bold",
  },
  item_des: {
    marginTop: px2dp(20),
    color: "#c1c1c1",
    fontSize: px2dp(24),
    lineHeight: px2dp(40),
  },
});

export default Questionnaire;
