/**
 * 根reducer
 */
import { combineReducers } from 'redux';

import user from './userReducer';
import home from './homePageReducer'; // 首页
import homeNew from './homePageNewReducer'; // 首页新
import everyDay from './everyDayReducer'; // 每一天
import plan from './planReducer'; // 计划
import article from './articleReducer'; // 文章
import report from './reoprtReducer'; // 问卷
import collection from './collectionReducer'; // 收藏
import score from './scoreReducer'; // T钻
import message from './messageReducer'; // 消息
import feedback from './feedbackReducer'; // 反馈
import userCenter from './userCenterReducer'; // 个人中心
import personalInfo from './personalInfoReducer'; // 个人资料
import signIn from './signInReducer'; // 签到
import register from './registerReducer'; // 注册
import reset from './resetReducer'; // 重置密码
import stepData from './stepDataReducer'; // 计步器

const rootReducer = combineReducers({
  user,
  home,
  homeNew,
  plan,
  everyDay,
  article,
  report,
  collection,
  score,
  message,
  feedback,
  userCenter,
  personalInfo,
  signIn,
  register,
  reset,
  stepData,
});

export default rootReducer;
