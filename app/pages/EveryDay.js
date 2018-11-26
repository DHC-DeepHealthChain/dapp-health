import React from "react";
import { View, StyleSheet, Text, RefreshControl,
  ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import BackHeader from "../components/BackHeader";
import { getIndicators } from '../actions/everyDayAction';
import px2dp from "../common/px2dp";
import Common from '../common/constants'

class EveryDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: true,
    };
    this.goDetail = this.goDetail.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getIndicators());
  }

  componentWillReceiveProps(nextProps) {
    const { failInfo } = nextProps.user;
    const { healthIndicators } = nextProps.everyDay;
    if( failInfo.error === true && failInfo.message === '未登录' ) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: "PasswordLogin" }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    if (Object.values(healthIndicators).length !== 0 ) {
      this.setState({
        isRefreshing: false,
      });
    }
  }


  onRefresh = () => {
    this.setState({
      isRefreshing: true,
    });
    const thz = this;
    const { dispatch } = this.props;
    dispatch(getIndicators()).then(() => {
      thz.setState({
        isRefreshing: false,
      })
    });
  }

  goDetail = (item, index) => {
    const { navigation } = this.props;
    navigation.navigate('HealthyIndexDetail', {
      type: item.type,
      title: item.nextTitle,
      itemName: item.itemName,
      list: itemList[index],
    });
  }
  checkRange = (value, min, max) => {
    if (Number(value) >= Number(min) && Number(value) <= Number(max)) {
      return {
        result: '正常',
        resultEn: 'normal',
        color: '#2fc0ff',
        imageSource: require('../imgs/everyDay/normal.png'),
      }
    } else if (Number(value) > Number(max) ) {
      return {
        result: '超出',
        resultEn: 'over',
        color: '#ff392f',
        imageSource: require('../imgs/everyDay/fast.png'),
      }
    } else if (value === undefined) {
      return {
        result: '未填写',
        resultEn: 'less',
        color: '#41d38d',
        imageSource: require('../imgs/everyDay/small.png'),
      }
    }
    return {
      result: '不足',
      resultEn: 'less',
      color: '#41d38d',
      imageSource: require('../imgs/everyDay/small.png'),
    }
  }

  renderIcon = (obj, ele) => {
    const content = obj === null ? '' : JSON.parse(obj.content).content;
    return (
      obj === null ?
      <ImageBackground style={styles.absoluteStyle} source={this.checkRange(undefined, ele.normalMin, ele.normalMax).imageSource}>
        <Text style={{ marginLeft: px2dp(10), color: '#fff' }}>{this.checkRange(undefined, ele.normalMin, ele.normalMax).result}</Text>
      </ImageBackground> :
      <ImageBackground style={styles.absoluteStyle} source={this.checkRange(content[ele.nameEN], ele.normalMin, ele.normalMax).imageSource}>
        <Text style={{ marginLeft: px2dp(10), color: '#fff' }}>{this.checkRange(content[ele.nameEN], ele.normalMin, ele.normalMax).result}</Text>
      </ImageBackground>
    )
  }
  renderParam = (obj, ele, length) => {
    const content = obj === null ? '' : JSON.parse(obj.content).content;
    return (
      <View
        key={ele.childrenName}
        style={{ 
          marginLeft: px2dp(57),
          flexDirection: 'row',
          marginTop: length === 1 ? 0 : px2dp(30),
        }}
      >
        <View style={{ width: px2dp(200) }}>
          <Text style={{ color: '#b3b3b3', marginBottom: px2dp(30) }}>{ele.childrenName}</Text>
          {
            obj === null ?
            <Text style={{ color: this.checkRange(undefined, ele.normalMin, ele.normalMax).color, fontSize: 18 }}>未填写</Text> :
            <Text
              style={{
                color: this.checkRange(content[ele.nameEN], ele.normalMin, ele.normalMax).color, fontSize: 18,
              }}
            >
              {content[ele.nameEN]} {ele.unit}
            </Text>
          }
        </View>
        <View style={styles.verticalLine} />
        <View>
          <Text style={{ color: '#b3b3b3', marginBottom: px2dp(30) }}>正常范围</Text>
          <Text style={{ fontSize: 18 }}>{ele.normalMin} ~ {ele.normalMax} {ele.unit}</Text>
        </View>
      </View>
    )
  }

  renderItem = () => {
    const { everyDay: { healthIndicators } } = this.props;
    const objValue = Object.values(healthIndicators);
    return (
      itemList.map((ele, index) => {
        return(
          <TouchableOpacity
            key={ele.itemName}
            activeOpacity={0.6}
            onPress={() => { this.goDetail(ele, index) }}
            style={{ flexDirection: 'row', justifyContent: 'center', marginTop: px2dp(30) }}
          >
            <ImageBackground
              resizeMode="stretch"
              style={[styles.itemStyle, { paddingVertical: ele.children.length > 1 ? px2dp(50) : px2dp(35)}]}
              source={require('../imgs/everyDay/paramBg.png')}
            >
              <View style={{ marginLeft: px2dp(57) }}>
                <Text style={{ fontSize: 18 }}>{ele.itemName}</Text>
                <Text style={{ color: '#b3b3b3', marginTop: px2dp(21) }}>{ele.itemNameEn}</Text>
              </View>
              {
                ele.children.map(e => this.renderParam(objValue[index], e, ele.children.length))
              }
              {
                this.renderIcon(objValue[index], ele.children[0])
              }
            </ImageBackground>
          </TouchableOpacity>
        )
      })
    )
  }

  render() {
    const { navigation } = this.props;
    const { everyDay: { healthIndicators } } = this.props;
    const objValue = Object.values(healthIndicators);
    return (
      <View style={{ flex: 1 }}>
        <BackHeader
          title="每一天"
          hasBorder
          nextPress={() => {
            navigation.navigate('Message');
          }}
          nextIcon={require('../imgs/everyDay/message.png')}
          nextIconStyle={{ width: px2dp(32), height: px2dp(33), marginLeft: px2dp(40) }}
        />
        <ScrollView
          style={styles.boxStyle}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={[Common.colors.themeColor]}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          {Object.keys(objValue).length !== 0 ? this.renderItem() : null}
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
  itemStyle: {
    width: px2dp(724),
    minHeight: px2dp(331),
    paddingVertical: px2dp(35),
    justifyContent: 'space-around',
  },
  absoluteStyle: {
    position: 'absolute',
    top: px2dp(43),
    right: px2dp(39),
    width: px2dp(215),
    height: px2dp(151),
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLine: {
    width: px2dp(1),
    height: px2dp(55),
    backgroundColor: '#eee',
    marginLeft: px2dp(45),
    marginRight: px2dp(45),
    marginTop: px2dp(30),
  },
});

const itemList = [
  {
    itemName: '血压',
    itemNameEn: 'Blood Pressure',
    type: 'bloodPressure',
    nextTitle: '血压数据录入',
    children: [
      {
        childrenName: '高压',
        nameEN: 'highPress',
        min: '0',
        max: '300',
        normalMin: '90',
        normalMax: '140',
        unit: 'mmHg',
      },
      {
        childrenName: '低压',
        nameEN: 'lowPress',
        min: '0',
        max: '200',
        normalMin: '60',
        normalMax: '90',
        unit: 'mmHg',
      },
      {
        childrenName: '脉搏',
        nameEN: 'pulse',
        min: '0',
        max: '300',
        normalMin: '60',
        normalMax: '100',
        unit: '次',
      },
    ],
  },
  {
    itemName: '体重',
    itemNameEn: 'Weight',
    type: 'weight',
    nextTitle: '体重数据录入',
    children: [
      {
        childrenName: '体重',
        nameEN: 'weight',
        min: '0',
        max: '200',
        normalMin: '60',
        normalMax: '100',
        unit: 'kg',
      },
    ],
  },
  {
    itemName: '步数',
    itemNameEn: 'Step',
    type: 'step',
    nextTitle: '步数录入',
    children: [
      {
        childrenName: '步数',
        nameEN: 'step',
        min: '0',
        max: '100000',
        normalMin: '0',
        normalMax: '100000',
        unit: '步',
      },
    ],
  },
  {
    itemName: '腰围',
    itemNameEn: 'Waist circumference',
    type: 'waistline',
    nextTitle: '腰围数据录入',
    children: [
      {
        childrenName: '腰围',
        nameEN: 'waistline',
        min: '10',
        max: '200',
        normalMin: '66',
        normalMax: '85',
        unit: 'cm',
      },
    ],
  },
  {
    itemName: '体温',
    itemNameEn: 'Body temperature',
    next: 'Temperature',
    type: 'temperature',
    nextTitle: '体温数据录入',
    children: [
      {
        childrenName: '体温',
        nameEN: 'temperature',
        min: '35',
        max: '45',
        normalMin: '36.3',
        normalMax: '37.2',
        unit: '℃', 
      },
    ],
  },
  {
    itemName: '心率',
    itemNameEn: 'Heart Rate',
    type: 'heartRate',
    nextTitle: '心率数据录入',
    children: [
      {
        childrenName: '心率',
        nameEN: 'heartRate',
        min: '0',
        max: '300',
        normalMin: '60',
        normalMax: '100',
        unit: 'bpm',
      },
    ],
  },
]
export default EveryDay;
