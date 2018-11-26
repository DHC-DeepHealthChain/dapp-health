import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import px2dp from '../common/px2dp';
// import Mbutton from './components/Mbutton'


class TableList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    _renderItem(item, index) {
        const thz = this;
        return (
            <View
                key={index + '-body-row'}
                style={styles.tbody_tr}>
                {
                    thz.props.columns.map((i, ind) => {
                        if (i.render) {
                            return <View style={styles.tbody_td} key={ind + '-body-col'}>{ i.render(item, ind) }</View>
                        }
                        return <Text style={[styles.tbody_td, styles.tbody_td_text]} key={ind + '-body-col'}>{ item[i.value] && item[i.value] }</Text>
                    })
                }
            </View>
        )
    }

    _renderNull() {
        return <Text style={{textAlign: 'center', }}>暂无数据</Text>
    }

    render() {
        const thz = this;
        const {columns, list} = thz.props;

        return (
            <View style={styles.table_wrap}>
                <View style={styles.table_header}>
                    {
                        columns && columns.map((item, index) => {
                            return <Text key={item.value + '-head-columns'} style={styles.th_textStyle}>{item.label}</Text>
                        })
                    }
                </View>
                <View style={styles.table_body}>
                    {
                        list && list.length > 0 ? list.map((item, index) => {
                                return thz._renderItem(item, index)
                            })
                            :
                            thz._renderNull()
                    }
                </View>
            </View>
        )

    }
}


const styles = StyleSheet.create({
    table_wrap: {},
    table_header: {
        flexDirection: 'row',
        flex: 1,
        height: px2dp(60),
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomWidth: px2dp(1),
        borderBottomColor: '#ddd',
    },

    th_textStyle: {flex: 1, textAlign: 'center', fontSize: px2dp(26), color: '#333', fontWeight: '500',},

    table_body: {  },
    tbody_tr: {
        flexDirection: 'row',
        flex: 1,
        height: px2dp(75),
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomWidth: px2dp(1),
        borderBottomColor: '#ddd',
    },
    tbody_td: {
        flex: 1,
        flexDirection: 'row',
    },
    tbody_td_text: {
        fontSize: px2dp(24),
        color: '#646464',
        textAlign: 'center',
    },
});

export default TableList;