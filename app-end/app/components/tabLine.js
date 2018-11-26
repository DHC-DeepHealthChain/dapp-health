import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Button,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import px2dp from '../common/px2dp';

class TabLine extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // currentTab: 0,
        };
    }

    _onPressButton(index, item) {
        // console.log(1);
        // this.setState({
        //     currentTab: index,
        // })
        this.props.onChange && this.props.onChange( index, item );
    }
    
    render() {
        const thz = this;

        return (
            <View style={styles.boxStyle}>
                <View style={styles.tab_wrap}>
                    {
                        thz.props.tabList.map((item, index) => {
                            return (
                                <View key={index} style={styles.tab_item_wrap}>
                                    <TouchableHighlight
                                        style={{flex: 1,}}
                                        activeOpacity={1}
                                        underlayColor={'#fff'}
                                        onPress={() => {thz._onPressButton( index, item )}}>
                                        <View style={styles.tab_item_container}>
                                            <View style={styles.tab_item}>
                                                <Text style={index == thz.props.currentTab ? [styles.textStyle, styles.activeTextStyle] : styles.textStyle}>
                                                    {item.label}
                                                </Text>
                                            </View>
                                            {
                                                index == thz.props.currentTab ?
                                                    <View style={[styles.under_line, thz.props.underLineStyle]}></View>:
                                                    <View style={[styles.under_line_trans, thz.props.underLineStyle]}></View>
                                            }
                                        </View>
                                    </TouchableHighlight>
                                    <View style={styles.verticalLineStyle}></View>
                                </View>
                            )
                        })
                    }
                </View>

                <ScrollView style={styles.boxStyle}>
                    <View style={styles.tab_body}>
                        {
                            thz.props.tabList[thz.props.currentTab].render()
                        }
                    </View>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    boxStyle: {
        flex: 1,
        width: '100%',
        backgroundColor:'#ffffff',
    },
    fontStyle: {
        fontSize: 16,
        color: '#000',
    },
    tab_wrap: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: px2dp(1),
        borderTopWidth: px2dp(1),
        borderStyle: 'solid',
        borderColor: '#ddd',
    },
    tab_item_wrap: {
        flex: 1,
        height: px2dp(75),
        flexDirection: 'row',
        alignItems: 'center',
    },
    tab_item_container: {
        flex: 1,
        alignItems: 'center',
    },
    tab_item: {
        // height: px2dp(90),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        textAlign:'center',
        fontSize: px2dp(24),
        color: '#646464',
    },
    activeTextStyle: {
        color: '#be9a6a',
    },
    tab_body: {
        flex: 1,
    },
    under_line: {
        width: '40%',
        height: px2dp(2),
        backgroundColor: '#be9a6a',
    },
    under_line_trans: {
        height: px2dp(2),
        backgroundColor: 'transparent',
    },
    verticalLineStyle: {
        width: px2dp(2),
        height: px2dp(25),
        backgroundColor: '#dddddd',
    },
});

export default TabLine;
