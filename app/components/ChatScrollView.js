import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TouchableHighlight,
    RefreshControl,
} from 'react-native';
// import {connect} from 'react-redux';
// import Tools from '../common/tools';
// import px2dp from '../common/px2dp';
// import LoadingMore from '../components/loadingMore'


class ChartScrollView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // isRefreshing: false,
            // loadMore: false,
        };
        // this._scrollToEnd = this._scrollToEnd.bind(this);
    }

    componentDidMount() {
        const thz = this;
    }


    /*下拉刷新*/
    _onRefresh() {
        const thz = this;
        thz.props.onRefresh && thz.props.onRefresh();
    }
    /*滚动监听  处理函数*/
    /*_onScroll (e) {
        const thz = this;
        const event = e.nativeEvent;
        if( thz.props.loadMore ) {
            return;
        }
        let scrollTop = event.contentOffset.y;
        let containerHeight =  event.layoutMeasurement.height;
        let contentHeight = event.contentSize.height;
        if( scrollTop + containerHeight >= contentHeight - 20 ) {

            thz.props.onLoading && thz.props.onLoading();

            // const { pageSize, current, total  } = thz.props.pagination;
            // let param = {};
            // if( current * pageSize < total || current * pageSize == total ) {
            //     param.page = current + 1;
            //
            // }
        }
    }*/
    /*加载更多*/
    // _renderLoadMore () {
    //     const thz = this;
    //     if( thz.props.hideLoadMore ) {
    //         return null
    //     }
    //     return (
    //         <LoadingMore
    //             isEndLoad={ thz.props.isEndLoad }
    //             isLoading={ thz.props.loadMore }
    //             onLoading={()=>{
    //                 thz.props.onLoading && thz.props.onLoading();
    //             }}
    //         />
    //     );
    // }

    render() {
        const thz = this;

        return (
            <ScrollView
                ref={(scrollView) => { thz.props.scrollViewRef(scrollView) }}
                style={[styles.scrollViewContainer, thz.props.style]}
                keyboardDismissMode={'none'}
                refreshControl={
                         <RefreshControl
                            refreshing={ thz.props.isRefreshing }
                            onRefresh={ thz._onRefresh.bind(thz) }
                            tintColor="#9e9e9e"
                            title="加载中..."
                            titleColor="#00ff00"
                            colors={['#9e9e9e']}
                            progressBackgroundColor="#ffffff"
                          />
                    }
                scrollEventThrottle={50}
                onContentSizeChange={thz.props.onSizeChange}
            >
                { thz.props.children }
            </ScrollView>
        )

    }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
export default ChartScrollView;