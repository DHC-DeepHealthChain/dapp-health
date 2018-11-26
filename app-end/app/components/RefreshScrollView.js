import React from "react";
import {
  // View,
  StyleSheet,
  // Text,
  // Image,
  // TouchableOpacity,
  ScrollView,
  // TouchableHighlight,
  RefreshControl,
} from "react-native";
// import { connect } from "react-redux";
// import Tools from "../common/tools";
// import px2dp from "../common/px2dp";
import LoadingMore from "../components/loadingMore";
import Common from "../common/constants";

class RefreshScrollView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingState: 3,
    };
    this.renderLoadMore = this.renderLoadMore.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.setLoadMore = this.setLoadMore.bind(this);
  }
  componentDidMount() {
    // const thz = this;
  }
  
  /* 下拉刷新 */
  onRefresh() {
    const thz = this;
    if (thz.props.onRefresh) {
      thz.props.onRefresh();
    }
  }

  /* 滚动监听  处理函数 */
  onScroll(e) {
    const thz = this;
    const { isLoadingState } = thz.state;
    if( isLoadingState === 1 || isLoadingState === 2 || isLoadingState === 0 ) {
      return;
    } 
    if(!thz.props.showLoadMore) { return; }
    const event = e.nativeEvent;
    const scrollTop = event.contentOffset.y;
    const containerHeight = event.layoutMeasurement.height;
    const contentHeight = event.contentSize.height;
    if (scrollTop + containerHeight >= contentHeight - 20) {
      thz.props.onLoading();
    }
  }

  setLoadMore (status) {
    this.setState({
      isLoadingState: status,
    })
  }
  /* 加载更多 */
  renderLoadMore() {
    const thz = this;
    return <LoadingMore isLoadingState={thz.state.isLoadingState} />;
  }


  render() {
    const thz = this;

    return (
      <ScrollView
        style={[styles.scrollViewContainer, thz.props.style]}
        refreshControl={
          <RefreshControl
            refreshing={thz.props.isRefreshing}
            onRefresh={thz.onRefresh.bind(thz)}
            tintColor="#ff0000"
            title="加载中..."
            titleColor="#00ff00"
            colors={[Common.colors.themeColor]}
            progressBackgroundColor="#ffffff"
          />
        }
        showsVerticalScrollIndicator={thz.props.showsVerticalScrollIndicator ? true : false}
        onScroll={thz.onScroll}
        scrollEventThrottle={50}
      >
        {thz.props.children}
        {thz.props.showLoadMore && thz.renderLoadMore()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default RefreshScrollView;
