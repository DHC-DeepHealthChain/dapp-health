import React from "react";
import {
  View,
  WebView,
  StyleSheet,
  Text,
  // ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
// import moment from 'moment';
import { NavigationActions } from "react-navigation";
import HTMLView from "react-native-htmlview";
import BackHeader from "../components/BackHeader";
// import Button from "../components/Button";
import Loadding from "../components/Loadding";
import RefreshScrollView from "../components/RefreshScrollView";
import px2dp from "../common/px2dp";
// import Common from "../common/constants";
import {
  getArticleDetail,
  clearArticleDetail,
  favorite,
  unFavorite,
  shareArticle,
} from "../actions/articleAction";

import ShareModal from "../components/ShareModal";
import platforms from "../common/platforms";
import SharePlatform from "./../common/SharePlatform";
import ShareUtile from "./../common/ShareUtil";
import Tools from "../common/tools";

const collectionIcon = require("../imgs/common/collection-o.png");
const activeCollectionIcon = require("../imgs/common/collection.png");

class ArticleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // eslint-disable-line
      isRefreshing: false, // eslint-disable-line
      itemArticle: {}, // eslint-disable-line
      itemArticleContent: {}, // eslint-disable-line
    };
    // this.handleFavorite = this.handleFavorite.bind(this);
    // this.handleUnFavorite = this.handleUnFavorite.bind(this);
  }

  componentWillMount() {
    const thz = this;
    thz.props.dispatch(clearArticleDetail());
  }

  componentDidMount() {
    const thz = this;
    thz.getDetail();
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

  getDetail = () => {
    const thz = this;
    const { params } = thz.props.navigation.state;
    thz.setState({ isRefreshing: true });
    thz.props.dispatch(getArticleDetail({ id: params._id })).then(() => {
      thz.setState({ isRefreshing: false });
      const { itemArticle, itemArticleContent } = thz.props.article;
      thz.setState({
        itemArticle,
        itemArticleContent,
      });
    });
  };

  /* 点击收藏 */
  handleFavorite = () => {
    const thz = this;
    const { params } = thz.props.navigation.state;
    thz.setState({ visible: true });
    thz.props
      .dispatch(favorite({ id: params._id, favoriteType: "文章" })) // eslint-disable-line
      .then(value => {
        thz.setState({ visible: false });
        if (value === "success") {
          thz.setState(pre => {
            return {
              ...pre,
              itemArticle: {
                ...pre.itemArticle,
                isFavorite: true,
              },
            };
          });
        }
      });
  };
  /* 取消收藏 */
  handleUnFavorite = () => {
    const thz = this;
    const { params } = thz.props.navigation.state;
    thz.setState({ visible: true });
    thz.props.dispatch(unFavorite({ id: params._id })).then(value => {
      thz.setState({ visible: false });
      if (value === "success") {
        thz.setState(pre => {
          return {
            ...pre,
            itemArticle: {
              ...pre.itemArticle,
              isFavorite: false,
            },
          };
        });
      }
    });
  };

  /* 分享 */
  handleShare = () => {
    const thz = this;
    const { itemArticleContent } = thz.state;
    const { params } = thz.props.navigation.state;
    thz.shareModal.show({ title: "分享", options: platforms }, item => {
      ShareUtile.share(
        itemArticleContent.content,
        "http://dh.life/imgs/download/logo-dbeb1d2d13.png",
        `http://dh.life/DappArticleDetail.html?articleId=${params._id}`,
        itemArticleContent.name,
        SharePlatform[item.key],
        (code, message) => {
          if (code === 200) {
            thz.props.dispatch(shareArticle({ id: params._id })).then(data => {
              console.log("分享成功通知后台", data);
              Tools.showToast(data.message);
            });
          }
          // message: 分享成功、分享失败、取消分享
          // TODO ...
        }
      );
    });
  };

  /* 分享props 控制分享按钮的显示 */
  handleShareProps = () => {
    const thz = this;
    const { itemArticle } = thz.state;
    if (Object.keys(itemArticle).length === 0) {
      return {};
    }
    const props = {
      nextIcon: require("../imgs/common/shareIcon_black.png"),
      nextIconStyle: {
        width: px2dp(35),
        height: px2dp(35),
      },
      nextPress: thz.handleShare.bind(thz),
    };
    return props;
  };

  /* 容器 */
  renderRefreshProps() {
    const thz = this;
    const props = {
      style: {},
      isRefreshing: thz.state.isRefreshing,
      onRefresh() {
        thz.getDetail();
      },
    };
    return props;
  }

  render() {
    const thz = this;
    const { navigation } = thz.props;
    const { itemArticle, itemArticleContent, visible } = thz.state;

    /* 图片 */
    const source = itemArticle.listImg
      ? itemArticle.listImg.includes("http")
        ? { uri: itemArticle.listImg }
        : { uri: `data:image/jpeg;base64,${itemArticle.listImg}` }
      : require("../imgs/home/recommend_hold.png");

    return (
      <View style={{ flex: 1 }}>
        <BackHeader
          title="文章详情"
          hasBorder={false}
          backPress={() => {
            navigation.goBack();
          }}
          {...thz.handleShareProps()}
        />
        <RefreshScrollView {...thz.renderRefreshProps()}>
          <View style={styles.scroll_container}>
            {itemArticle.listImg ? (
              <Image
                style={styles.titleImg}
                source={source}
                resizeMode="stretch"
              />
            ) : null}

            <View style={styles.article__main}>
              <View style={styles.article_head}>
                <Text
                  style={{
                    flex: 1,
                    textAlign: "left",
                    fontSize: px2dp(42),
                    lineHeight: px2dp(70),
                    color: "#333",
                  }}
                >
                  {itemArticleContent.name ? itemArticleContent.name : ""}
                </Text>
                {Object.keys(itemArticle).length > 0 ? (
                  <View style={styles.viewNum}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        if (!itemArticle.isFavorite) {
                          /* 收藏 */
                          thz.handleFavorite();
                        } else {
                          /* 取消收藏 */
                          thz.handleUnFavorite();
                        }
                      }}
                      style={{
                        paddingHorizontal: px2dp(30),
                        paddingVertical: px2dp(20),
                      }}
                    >
                      <Image
                        source={
                          itemArticle.isFavorite
                            ? activeCollectionIcon
                            : collectionIcon
                        }
                        resizeMode="stretch"
                        style={{ width: px2dp(30), height: px2dp(30) }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              {/* 文章内容 */}
              <View style={styles.article_detail}>
                <HTMLView
                  value={`<div>${
                    itemArticleContent.content ? itemArticleContent.content : ""
                  }</div>`}
                  stylesheet={htmlContentStyles}
                />
              </View>
            </View>
          </View>
          {/* loadding */}
          <Loadding visible={visible} />
        </RefreshScrollView>

        {/* ShareModal */}
        <ShareModal
          ref={shareModal => {
            thz.shareModal = shareModal;
          }}
        />
      </View>
    );
  }
}

const htmlContentStyles = StyleSheet.create({
  div: {
    fontSize: px2dp(34),
    lineHeight: px2dp(60),
  },
});

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  titleImg: {
    width: "100%",
    height: px2dp(350),
  },
  article__main: {
    paddingHorizontal: px2dp(30),
    paddingVertical: px2dp(30),
  },
  article_head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  viewNum: {
    width: px2dp(140),
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon: {
    width: px2dp(24),
    height: px2dp(15),
    marginRight: px2dp(20),
  },
  article_detail: {
    paddingTop: px2dp(30),
  },
});

export default ArticleDetail;
