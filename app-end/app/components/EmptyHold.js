import React from "react";
import { View, Image } from "react-native";
// import constants from "../common/constants";
import px2dp from "../common/px2dp";

// const { colors } = constants;

const EmptyHold = ({ visible, ...props }) => {
  return (
    <View style={[{ justifyContent: 'center', alignItems: 'center', paddingTop: px2dp(100) }, visible ?{flex: 1} : {display: 'none'}]}>
      <Image 
        style={{width: px2dp(284), height: px2dp(215)}}
        resizeMode="stretch"
        source={require('../imgs/message/noMessage.png')}
      />
    </View>
  );
};
export default EmptyHold;
