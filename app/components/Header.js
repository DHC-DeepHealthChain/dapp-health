import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import px2dp from '../common/px2dp';

class Header extends React.Component {
  render() {
    return (
      <View style={styles.boxStyle}>
        <Text style={styles.fontStyle}>{this.props.content}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    // width: px2dp(750),
    height: px2dp(100),
    backgroundColor: '#ffffff',
  },
  fontStyle: {
    fontSize: 16,
    color: '#000',
  },
});

export default Header;
