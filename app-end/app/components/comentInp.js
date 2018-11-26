import React from 'react'
import {
    StyleSheet,View,TextInput,Text, Keyboard,
} from 'react-native';
import px2dp from '../common/px2dp';
import Mbutton from './Mbutton'

export default class CommentInp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inpStyle: {
                // borderColor: '#ccc',
            },
        }
    }

    componentWillMount () {
        const thz = this;
        thz.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', thz._keyboardDidShow.bind(thz));
        thz.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', thz._keyboardDidHide.bind(thz));

        // thz.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', thz._keyboardWillShow.bind(thz));
    }
    componentWillUnmount () {
        const thz = this;
        thz.keyboardDidShowListener.remove();
        thz.keyboardDidHideListener.remove();
    }

    _keyboardDidShow () {
        // alert('Keyboard Shown');
        this.props.handleKeyboard && this.props.handleKeyboard(true);
    }

    _keyboardDidHide () {
        // alert('Keyboard Hidden');
        this.props.handleKeyboard && this.props.handleKeyboard(false);
    }

    // _keyboardWillShow () {
    //     // alert('Keyboard Hidden');
    //     this.props.handleKeyboard(true);
    // }



    onFocus() {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }
    onBlur() {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }
    handlePress() {
        this.onPress && this.onPress();
    }

    render() {
        const thz = this;

        return (
            <View style={[styles.comment_inp_wrap, thz.props.wrapStyle]} >
                <View style={[styles.container, thz.state.inpStyle, thz.props.style]}>
                    <TextInput style={[styles.input, thz.props.style, thz.props.inputStyle]}
                               onChangeText={thz.props.onChangeText}
                               placeholder={thz.props.placeholder}
                               onFocus={()=>{thz.onFocus()}}
                               onBlur={() => {thz.onBlur()}}
                               value={thz.props.inpValue}

                               underlineColorAndroid={'transparent'}
                               multiline = {true}
                               numberOfLines = {3}
                    />
                </View>

                <View style={[styles.comment_bottom]}>
                    { thz.props.children }
                </View>

            </View>

        )
    }

};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: px2dp(120),
    },
    input: {
        padding: px2dp(10),
        flex: 1,
        textAlignVertical: 'top',
        fontSize: px2dp(24),
        color: '#646464',
        // borderWidth: 1,
    },

    comment_inp_wrap: {
        flex: 1,

        backgroundColor: '#fff',
    },
    comment_bottom: {  },
});