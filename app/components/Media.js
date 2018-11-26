import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import px2dp from "../common/px2dp";
// import Mbutton from './components/Mbutton'

class Media extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goDetail(e, item) {
    console.log(item);
    this.props.goDetail && this.props.goDetail(item);
  }

  renderTag(item) {
    return (
      <Text
        style={[
          styles.item_tag_com,
          item.status == "in" ? styles.item_tag_in : styles.item_tag_apply,
        ]}
      >
        {item.status == "in" ? "已加入" : "待申请"}
      </Text>
    );
  }

  renderItem(item, index) {
    const thz = this;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={ev => thz.goDetail(ev, item)}
        style={styles.item_wrap}
      >
        <Image source={item.img} style={styles.item_img} />
        <View style={styles.item_info}>
          <View style={styles.item_title_box}>
            <Text style={styles.item_title}>{item.title}</Text>
            { thz.renderTag(item) }
          </View>
          <Text style={styles.item_des}>{item.des}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    const thz = this;
    const { item } = thz.props;

    return thz.renderItem(item);
  }
}

const styles = StyleSheet.create({
  medialist_wrap: {
    // flex: 1,
  },

  item_wrap: {
    paddingHorizontal: px2dp(20),
    paddingVertical: px2dp(20),
    borderStyle: "solid",
    borderBottomWidth: px2dp(1),
    borderBottomColor: "#ddd",

    flexDirection: "row",
    alignItems: "center",
  },
  item_img: {
    width: px2dp(225),
    height: px2dp(150),
  },
  item_info: {
    marginLeft: px2dp(20),
    flex: 1,
  },
  item_title_box: {
    flexDirection: "row",
    paddingVertical: px2dp(10),
  },
  item_title: {
    color: "#000",
    fontSize: px2dp(28),
  },

  /* tags */
  item_tag_com: {
    borderRadius: px2dp(5),
    color: "#fff",
    marginLeft: px2dp(20),
    // paddingTop: px2dp(6),
    paddingHorizontal: px2dp(6),
    height: px2dp(40),
    lineHeight: px2dp(40),
    fontSize: px2dp(24),
    includeFontPadding: false,
    // textAlignVertical: 'center',
  },
  item_tag_in: { backgroundColor: "#cecece" },
  item_tag_apply: { backgroundColor: "#e6ae6c" },

  item_des: {
    color: "#646464",
    fontSize: px2dp(24),
    lineHeight: px2dp(45),
  },
});

export default Media;
