import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
// import moment from 'moment';
import { NavigationActions } from "react-navigation";
// import BackHeader from "../components/BackHeader";
import RefreshScrollView from "../components/RefreshScrollView";
import Loadding from "../components/Loadding";
import EmptyHold from "../components/EmptyHold";
import px2dp from "../common/px2dp";
import { getMyCollection } from "../actions/collectionAction";
import { unFavorite } from "../actions/articleAction";

// const collectionIcon = require("../imgs/common/collection-o.png");
const activeCollectionIcon = require("../imgs/common/collection.png");

class MyCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isRefreshing: false,
      emptyHoldVisible: false,
      list: [],
    };
    this.renderRefreshProps = this.renderRefreshProps.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.goDetail = this.goDetail.bind(this);
    this.getList = this.getList.bind(this);
  }

  componentDidMount() {
    this.getList();
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

  /* 获取列表数据 */
  getList = () => {
    const thz = this;
    thz.setState({
      isRefreshing: true,
    });
    thz.props
      .dispatch(getMyCollection({ favoriteType: "文章" }))
      .then(value => {
        if (value === "success") {
          const nList = thz.props.collection.list;
          thz.setState({
            isRefreshing: false,
            list: nList,
          });
          if (nList.length === 0) {
            thz.setState({emptyHoldVisible: true});
          } else {
            thz.setState({emptyHoldVisible: false});
          }
        }
      });
  };

  goDetail(ev, item) {
    const thz = this;
    thz.props.navigation.navigate("CollectionDetail", {
      gbBack: thz.gbBack,
      ...item,
    });
  }

  /* 回调  详情取消收藏 刷新列表 */
  gbBack = () => {
    const thz = this;
    thz.getList();
  };

  /* 取消收藏 */
  handleUnFavorite = (item, index) => {
    const thz = this;
    thz.setState({ visible: true });
    thz.props.dispatch(unFavorite({ id: item.otherId })).then(value => {
      thz.setState({ visible: false });
      if (value === "success") {
        thz.setState(pre => {
          const nList = pre.list;
          nList.splice(index, 1);
          if (nList.length === 0) {
            return {
              ...pre,
              list: nList,
              emptyHoldVisible: true,
            }
          }
          return {
            ...pre,
            list: nList,
          };
        });
      }
    });
  };

  renderRefreshProps() {
    const thz = this;
    const props = {
      style: {},
      isRefreshing: thz.state.isRefreshing,
      onRefresh() {
        thz.getList();
      },
    };

    return props;
  }

  /* ITEM */
  renderItem(item, index) {
    const thz = this;
    const itemContent = item.content ? JSON.parse(item.content) : {};
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
        <Image
          source={source}
          resizeMode="stretch"
          style={styles.item_img}
        />
        <View style={styles.item_info}>
          <View style={styles.item_title_box}>
            <Text numberOfLines={1} style={styles.item_title}>
              {item.name}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                thz.handleUnFavorite(item, index);
              }}
              style={styles.collection_wrap}
            >
              <Image
                source={activeCollectionIcon}
                resizeMode="stretch"
                style={{ width: px2dp(25), height: px2dp(25) }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.item_des} numberOfLines={3}>{item.summary ? item.summary : item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const thz = this;
    const { list } = thz.state;

    return (
      <View style={{ flex: 1 }}>
        <RefreshScrollView {...thz.renderRefreshProps()}>
          <View style={styles.container}>
            <View style={styles.list__wrap}>
              {list.map((item, index) => {
                return thz.renderItem(item, index);
              })}
            </View>
          </View>
          {/* loadding */}
          <Loadding visible={thz.state.visible} />

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

export default MyCollection;
