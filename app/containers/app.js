import { StackNavigator, TabNavigator } from "react-navigation";
// import HomePage from "./HomePageContainer";
/* 改版首页 */
import HomePageNew from "./HomePageNewContainer";
import UserCenter from "./UserCenterContainer";
import Plan from "./PlanContainer";
/* 每一天改为文章列表 */
// import EveryDay from "./EveryDayContainer";

import ArticleDetail from "./ArticleDetailContainer";
import PlanDetail from "./PlanDetailContainer"; // 计划详情
import PlanDetailofOwn from "./PlanDetailofOwnContainer"; // 自己参加的计划详情
import MoreRecommend from "./MoreRecommendContainer"; // 更多推荐
import MyCollection from "./MyCollectionContainer"; // 我的收藏
import CollectionDetail from "./CollectionDetailContainer"; // 我的收藏
import Questionnaire from "./QuestionnaireContainer"; // 我的收藏
import CompletePersonalInfo from "./CompletePersonalInfoContainer"; // 个人资料

import EditUserInfo from "./EditUserInfoContainer"; // 单个编写个人资料

/* 登录注册 */
import PasswordLogin from "./PasswordLoginContainer";
import VerificationCodeLogin from "./VerificationCodeLoginContainer";
import Registe from "./RegisteContainer";
import CombinePhone from "./CombinePhoneContainer"; // 绑定手机号
/* 登录注册 */

import HealthyIndexDetail from './HealthyIndexDetailContainer'; // 每一天详情
import Feedback from './FeedbackContainer'; // 意见反馈
import Message from './MessageContainer'; // 我的消息
import Setting from './SettingContainer'; // 设置
import Temperature from './TemperatureContainer'; // 体温数据录入
import HealthyIndexHistory from './HealthyIndexHistoryContainer'; // 体温历史记录
import PersonalInfo from './PersonalInfoContainer'; // 个人资料
import SignIn from './SignInContainer'; // 签到
import Score from './ScoreContainer'; // T钻
import Report from './ReportContainer'; // 问卷
import AccountManage from './AccountManageContainer'; // 账户管理
import Help from './HelpContainer'; // 使用帮助
import About from './AboutContainer'; // 关于健康宝
import InviteCode from './InviteCodeContainer'; // 我的邀请码
import FollowWechat from './FollowWechatContainer'; // 关注公众号
import Agreement from './AgreementContainer'; // 关于健康宝
import MyReport from './MyReportContainer.js'; // 我的问卷
import StepData from './StepDataContainer.js'; // 计步器数据
import StepDataHistory from './StepDataHistoryContainer'; // 计步历史记录
import Rules from './RulesContainer.js'; // 计步器数据


import px2dp from "../common/px2dp";
import Common from "../common/constants";

const TabContainer = TabNavigator(
  {
    HomeFirst: { screen: HomePageNew },
    Plan: { screen: Plan },
    EveryDay: { screen: MoreRecommend },
    UserCenter: { screen: UserCenter },
  },
  {
    initialRouteName: "HomeFirst",
    lazy: true,
    swipeEnabled: false, // 是否可以左右滑动切换tab
    animationEnabled: false,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: Common.colors.themeColor,
      inactiveTintColor: "#999999",
      showIcon: true,
      style: {
        backgroundColor: "#fff",
      },
      indicatorStyle: {
        opacity: 0,
      },
      tabStyle: {
        padding: 0,
      },
      labelStyle: {
        fontSize: px2dp(28),
        marginTop: px2dp(0),
      },
    },
  }
);

const App = StackNavigator(
  {
    HomePage: { screen: TabContainer },

    PasswordLogin: { screen: PasswordLogin },
    VerificationCodeLogin: { screen: VerificationCodeLogin },

    HealthyIndexDetail: { screen: HealthyIndexDetail },
    Registe: { screen: Registe },
    CombinePhone: { screen: CombinePhone }, // 绑定手机号
    ArticleDetail: { screen: ArticleDetail },// 文章详情
    Feedback: { screen: Feedback },
    Message: { screen: Message },
    Setting: { screen: Setting },
    PlanDetail: { screen: PlanDetail },// 计划详情
    PlanDetailofOwn: { screen: PlanDetailofOwn },// 计划详情
    MoreRecommend: { screen: MoreRecommend },// 更多推荐
    MyCollection: { screen: MyCollection },// 我的收藏
    CollectionDetail: { screen: CollectionDetail },// 我的收藏详情
    Questionnaire: { screen: Questionnaire },// 问卷列表
    Temperature: { screen: Temperature },
    HealthyIndexHistory: { screen: HealthyIndexHistory },
    PersonalInfo: { screen: PersonalInfo },
    SignIn: { screen: SignIn },
    Score: { screen: Score },
    CompletePersonalInfo: { screen: CompletePersonalInfo },
    Report: { screen: Report },
    AccountManage: { screen: AccountManage },
    Help: { screen: Help },
    About: { screen: About },
    EditUserInfo: { screen: EditUserInfo }, // 单个编写资料
    InviteCode: { screen: InviteCode }, // 我的邀请码
    FollowWechat: { screen: FollowWechat }, // 关注公众号
    Agreement: { screen: Agreement }, // 单个编写资料
    MyReport: { screen: MyReport },
    StepData: { screen: StepData }, // 计步器数据
    Rules: { screen: Rules }, // 规则页面
    StepDataHistory: { screen: StepDataHistory }, // 计步器数据
  },
  {
    initialRouteName: "HomePage",
    headerMode: "screen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#fff",
        height: px2dp(90),
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: "#000",
        fontSize: 16,
      },
      headerTintColor: "#000",
    },
  }
);

export default App;
