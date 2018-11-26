/**
 * Created by lenovo on 2018/1/15.
 */
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Button,
    ScrollView,
    Linking,
    TouchableOpacity,
} from 'react-native';
import px2dp from '../common/px2dp';
import Tools from '../common/tools'

class LinkAble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this._handlePress = this._handlePress.bind(this);
    }

    render() {
        const thz = this;

        return (
            <TouchableOpacity onPress={() => { thz.props.handlePress && thz.props.handlePress(thz.props.url) }} style={thz.props.style}>
                { thz.props.children }
            </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({});

export default LinkAble;