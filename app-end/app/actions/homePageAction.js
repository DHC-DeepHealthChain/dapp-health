import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

/* 获取banner列表 */
export const getBannerList = () => {
  const url = `${URL.REPORT}/recommend`;
  return async dispatch => {
    const data = await request(url);
    console.log(data);
    if( data.error === false ) {
      dispatch(getSuccess({
        bannerList: data.result || [],
      }));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({failInfo: data}));
    }
  };
};

/* 获取问卷列表 */
export const getQuestionList = () => {
  const url = `${URL.REPORT}`;
  return async dispatch => {
    const data = await request(url);
    console.log(data);
    if( data.error === false ) {
      dispatch(getSuccess({
        questionList: data.result || [],
      }));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({failInfo: data}));
    }
    return Promise.resolve();
  };
};

/* 检查更新 */
export const checkIsLatestApp = () => {
  const url = `${URL.APK}`;
  return async dispatch => {
    const data = await request(url);
    console.log(data);
    if( data.error === false ) {
      dispatch(getSuccess({
        appVersionInfo: data.result || {},
      }));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({failInfo: data}));
    }
    return Promise.resolve();
  };
};

export const getSuccess = payload => {
  return {
    type: types.HOME_UPDATE,
    payload,
  };
};
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};
