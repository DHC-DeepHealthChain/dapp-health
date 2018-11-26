import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
// import moment from 'moment';
import { NavigationActions } from "react-navigation";
import RefreshScrollView from "../components/RefreshScrollView";
import px2dp from "../common/px2dp";
import { getArticleList } from "../actions/articleAction";
import BackHeader from "../components/BackHeader";
import EmptyHold from "../components/EmptyHold";

const collectionIcon = require("../imgs/common/collection-o.png");
const activeCollectionIcon = require("../imgs/common/collection.png");

class MoreRecommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      loadMore: false,
      list: [],
      emptyHoldVisible: false,
    };
    this.renderRefreshProps = this.renderRefreshProps.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.goDetail = this.goDetail.bind(this);
    this.getList = this.getList.bind(this);
  }

  componentDidMount() {
    this.getList({ page: 1 });
  }

  componentWillReceiveProps(nextProps) {
    const { failInfo } = nextProps.user;
    console.log("failInfo", failInfo);
    if (failInfo.error === true && failInfo.message === "未登录") {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "PasswordLogin" })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }
  /* 获取计划列表数据 */
  getList = (params = {}) => {
    const thz = this;
    thz.setState({ isRefreshing: true });
    if (!(params.page === 1 || !params.page)) {
      thz.refreshView.setLoadMore(1);
    }
    thz.props.dispatch(getArticleList(params)).then(() => {
      const { current, pageSize, total } = thz.props.article.pagination;
      thz.setState({ isRefreshing: false });
      let id = 3;
      if (total === 0) {
        thz.setState({emptyHoldVisible: true});
      }
      if (current * pageSize >= total) {
        id = 2;
      }
      thz.refreshView.setLoadMore(id);
    });
  };

  goDetail(ev, item) {
    const thz = this;
    thz.props.navigation.navigate("ArticleDetail", item);
  }
  renderRefreshProps() {
    const thz = this;
    const { pagination } = thz.props.article;
    const props = {
      style: {},
      isRefreshing: thz.state.isRefreshing,
      onRefresh() {
        thz.setState({
          isRefreshing: true,
        });
        thz.getList({ page: 1 });
      },
      /* 加载更多 */
      showLoadMore: true,
      onLoading: async () => {
        thz.getList({
          page: pagination.current + 1,
        });
      },
    };

    return props;
  }

  /* ITEM */
  renderItem(item) {
    const thz = this;
    const itemContent = JSON.parse(item.content);
    const source = item.listImg
      ? item.listImg.includes("http")
        ? { uri: item.listImg }
        : { uri: `data:image/jpeg;base64,${item.listImg}` }
      : require("../imgs/home/recommend_hold.png");
    return (
      <TouchableOpacity
        key={item._id}
        activeOpacity={0.8}
        onPress={ev => thz.goDetail(ev, item)}
        style={styles.item_wrap}
      >
        <Image source={source} resizeMode="stretch" style={styles.item_img} />
        <View style={styles.item_info}>
          <View style={styles.item_title_box}>
            <Text numberOfLines={1} style={styles.item_title}>
              {itemContent.name}
            </Text>
            {/* <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                thz.setState((pre) => {
                  const nList = pre.list;
                  nList[index].collection = !pre.list[index].collection;
                  return {
                    list: nList, 
                  }
                })
              }}
              style={styles.collection_wrap}
            >
              <Image
                source={item.collection ? activeCollectionIcon : collectionIcon }
                resizeMode="stretch"
                style={{ width: px2dp(25), height: px2dp(25) }}
              />
            </TouchableOpacity> */}
          </View>
          <Text style={styles.item_des} numberOfLines={3}>
            { item.summary ? item.summary : itemContent.content }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const thz = this;
    const { article } = thz.props;
    const { list } = article;
    console.log("articleList", list);

    return (
      <View style={{ flex: 1 }}>
        <BackHeader
          title="资讯"
          hasBorder
          nextIcon={require("../imgs/everyDay/message.png")}
          nextIconStyle={{
            width: px2dp(35),
            height: px2dp(35),
          }}
          nextPress={() => {
            thz.props.navigation.navigate("Message");
          }}
        />
        <RefreshScrollView
          {...thz.renderRefreshProps()}
          ref={refreshView => {
            thz.refreshView = refreshView;
          }}
        >
          <View style={styles.container}>
            <View style={styles.list__wrap}>
              {list.map((item, index) => {
                return thz.renderItem(item, index);
              })}
            </View>
          </View>

          <EmptyHold visible={thz.state.emptyHoldVisible} />
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
    paddingTop: px2dp(20),
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

export default MoreRecommend;
