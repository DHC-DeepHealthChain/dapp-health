import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import px2dp from "../common/px2dp";

class FormRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValue: props.defaultChecked,
    };
    this.handleChange = this.handleChange.bind(this);
    this.textChange = this.textChange.bind(this);
  }

  handleChange = item => {
    const { checkedValue } = this.state;
    const { type, questionChange } = this.props;
    item.value = item._id; // eslint-disable-line
    if (type === "RADIO") {
      // 单选
      this.setState(
        {
          checkedValue: [item.value],
        },
        () => {
          questionChange(this.state.checkedValue);
        }
      );
    } else {
      const index = checkedValue.indexOf(item.value);
        if (index > -1) {
          // 已经选中
          checkedValue.splice(index, 1);
        } 
        // else if( radioGroup[radioGroup.length - 1]._id === [item.value] ) { // eslint-disable-line
        //   checkedValue = [item.value];
        // } 
        else {
          checkedValue.push(item.value);
        }
        this.setState({ checkedValue }, () => {
          questionChange(this.state.checkedValue);
        });
    }
  };
  textChange = value => {
    const { questionChange } = this.props;
    questionChange([value]);
  };
  renderRadio = item => {
    const { checkedValue } = this.state;
    return (
      <View style={styles.circleStyle}>
        {checkedValue.indexOf(item._id) > -1 ? ( // eslint-disable-line
          <View style={styles.checkedStyle} />
        ) : null}
      </View>
    );
  };
  render() {
    const { radioGroup } = this.props;
    const { type } = this.props;
    return (
      <View style={styles.boxStyle}>
        {type !== "INPUT" ? (
          radioGroup.map(item => (
            <TouchableOpacity
              key={item.ipfsHash}
              style={styles.optionStyle}
              activeOpacity={0.6}
              onPress={() => {
                this.handleChange(item);
              }}
            >
              {this.renderRadio(item)}
              <Text style={{ marginLeft: px2dp(20) }}>
                {JSON.parse(item.content).name}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{
              flexDirection: "row",
              paddingLeft: px2dp(40),
              marginTop: px2dp(20),
            }}
          >
            <Text style={{ marginRight: px2dp(15) }}>答案：</Text>
            <TextInput
              underlineColorAndroid="transparent"
              onChangeText={this.textChange}
              style={{
                width: px2dp(400),
                borderBottomWidth: px2dp(1),
                borderBottomColor: "#eee",
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    backgroundColor: "#ffffff",
  },
  optionStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: px2dp(80),
    height: px2dp(90),
  },
  circleStyle: {
    width: px2dp(40),
    height: px2dp(40),
    borderRadius: px2dp(20),
    borderWidth: px2dp(2),
    borderColor: "#29d4e8",
    justifyContent: "center",
    alignItems: "center",
  },
  checkedStyle: {
    width: px2dp(24),
    height: px2dp(24),
    borderRadius: px2dp(12),
    backgroundColor: "#29d4e8",
  },
});

export default FormRadio;
