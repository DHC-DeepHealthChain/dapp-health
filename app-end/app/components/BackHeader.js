import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import px2dp from '../common/px2dp';
import Common from '../common/constants';

const BackHeader = (props) => {
  function backHandle() {
    if (props.backPress) {
      props.backPress();
    }
  }

  function nextHandle() {
    if (props.nextPress) {
      props.nextPress();
    }
  }

  const { title, titleLeft, titleRight, hasBorder, nextIcon, nextIconStyle, backPress } = props;

  return (
    <View>
      {
        Platform.OS === 'ios' ? <View style={{ height: px2dp(30), backgroundColor: '#fff' }} /> : null
      }
      <View style={[styles.boxStyle, hasBorder ? styles.box_border : {}]}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={backHandle}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: px2dp(40),
            width: px2dp(170),
            height: '100%',
          }}
        >
          {
            backPress ? <Image source={require('../imgs/common/back.png')} style={{ width: px2dp(20), height: px2dp(35) }} resizeMode="stretch" /> : null
          }
          <Text
            style={{ marginLeft: px2dp(20), color: '#000', fontSize: 14 }}>{titleLeft === undefined ? '' : titleLeft}</Text>
        </TouchableOpacity>

        <View style={styles.title_container}><Text style={{ color: '#000', fontSize: 16 }}>{title}</Text></View>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={nextHandle}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: px2dp(170),
            height: '100%',
            paddingRight: px2dp(30),
          }}
        >
          {
            nextIcon ? <Image source={props.nextIcon} style={[{ width: px2dp(40), height: px2dp(40) }, nextIconStyle]} resizeMode="stretch" /> : null
          }
          {
            titleRight ?
              <Text style={{
                textAlign: 'right',
                color: props.active ? Common.colors.themeColor : '#000',
                fontSize: 14,
              }}>
                {titleRight}
              </Text>
              : null
          }

        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  boxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: px2dp(100),
    backgroundColor: '#fff',
  },
  box_border: {
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#eee',
    borderStyle: 'solid',
  },
  fontStyle: {
    fontSize: 16,
    color: '#000',
  },
  title_container: {
    // width: '100%',
    // height: '100%',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    backgroundColor: 'transparent',
  },
});

export default BackHeader;
