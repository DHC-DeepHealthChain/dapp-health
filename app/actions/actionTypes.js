/**
 * action类型
 */
// 首页
export const HOME_UPDATE = 'HOME_UPDATE';
export const HOMENEW = 'HOMENEW';
// 登录
export const PASSWORD_LOGIN = 'PASSWORD_LOGIN';
export const REQUEST_FAILED = 'REQUEST_FAILED';// 请求失败
export const CLEAR_FAILEDINFO = 'CLEAR_FAILEDINFO';// 请求失败
// 计划
export const PLAN = 'PLAN';
// 文章
export const ARTICLE = 'ARTICLE';
export const ARTICLE_QUERYSUCCESS = 'ARTICLE_QUERYSUCCESS';
// export const ARTICLE_FAVORITE = 'ARTICLE_FAVORITE';
// 收藏
export const COLLECTION = 'COLLECTION';
// T钻
export const SCORE = 'SCORE';
export const SCORE_QUERYSUCCESS = 'SCORE_QUERYSUCCESS';

// LOADING
export const USER_LOGIN_SHOWLOADING = "USER_LOGIN_SHOWLOADING";
export const USER_LOGIN_HIDELOADING = "USER_LOGIN_HIDELOADING";

/* common 获取列表 */
export const QUERY_SUCESS_LIST = "QUERY_SUCESS_LIST";
export const GET_SUCESS_LIST = "GET_SUCESS_LIST";

// 每一天

export const GET_INDICATORS = 'GET_INDICATORS'; // 获取腰围等数据
export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS'; // 提交健康数据成功
export const GET_HISTOYR_LIST = 'GET_HISTOYR_LIST'; // 获取历史记录
export const DELETE_HISTOYR = 'DELETE_HISTOYR'; // 删除历史记录

// 问卷调查
export const GET_QUESTION_LIST = 'GET_HISTOYR_LIST'; // 获取问卷问题
export const SUBMIT_ANSWER_SUCCESS = 'SUBMIT_ANSWER_SUCCESS'; // 提交问卷问题
export const SAVE_ANSWER_LIST = 'SAVE_ANSWER_LIST'; // 保存问题

// 消息列表
export const GET_MESSAGE_LIST = 'GET_MESSAGE_LIST';
export const READ_MESSAGE = 'READ_MESSAGE'; // 阅读消息

// 意见反馈
export const SUBMIT_FEEDBACK = 'SUBMIT_FEEDBACK';

// 个人信息
export const GET_PERSONAL_INFO = 'GET_PERSONAL_INFO'; // 获取用户信息
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'; // 更新用户信息

// 签到
export const SIGN_SUCCESS = 'SIGN_SUCCESS'; // 签到成功
export const GET_SIGN_LIST = 'GET_SIGN_LIST'; // 获取签到记录
export const GET_SIGN_INFO = 'GET_SIGN_INFO'; // 获取签到信息

// 注册
export const GET_CAPTCHA_CODE = 'GET_CAPTCHA_CODE'; // 获取验证码
export const SAVE_CONTENT = 'SAVE_CONTENT'; // 保存用户名密码
export const REGISTER_USER = 'REGISTER_USER'; // 用户注册
export const RESET_PASSWORD = 'RESET_PASSWORD'; // 重置密码

// 计步器
export const STEPDATA = 'STEPDATA'; // 计步器
export const STEPDATA_QUERYSUCCESS = 'STEPDATA_QUERYSUCCESS'; // 计步器
export const STEPDATA_LIST = 'GET_STEP_LIST'; // 获取历史记录