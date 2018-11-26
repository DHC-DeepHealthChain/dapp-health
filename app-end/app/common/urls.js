import Common from "./constants";

const HOST = Common.url.URL;

export default {
  AUTH: `${HOST}auth`, // 用户  权限
  LOGIN: `${HOST}auth/login`, // 登录
  THIRDLOGIN: `${HOST}auth/thirdLogin`, // 第三方登录登录
  PLAN: `${HOST}healthPlan`, // 计划
  INDICATORS: `${HOST}healthIndicators`, // 健康指标
  ARTICLE: `${HOST}articles`, // 文章
  FAVORITES: `${HOST}favorites`, // 收藏
  SCORE: `${HOST}scores`, // T钻
  REPORT: `${HOST}exams`, // 问卷
  MESSAGE: `${HOST}messages`, // 消息
  FEEDBACK: `${HOST}feedbacks`, // 反馈
  USERINFO: `${HOST}users`, // 个人信息
  UPLOADFILE: `${HOST}ipfs/uploadFile`, // 文件上传
  SIGNIN: `${HOST}signs`, // 签到
  SENDCAPTCHA: `${HOST}users/sendCaptcha`, // 发送验证码
  RESETPASSWORD: `${HOST}users/resetPassword`, // 重置密码
  APK: `${HOST}apks/apkVersion`, // 版本信息
  STEPDATA: `${HOST}apks/apkVersion`, // 计步器
};
