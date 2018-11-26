import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.boxStyle}>
          <Text>健康宝协议</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
export default About;
