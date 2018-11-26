import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

/* 用户名密码登录 */
export const passwordLogin = ( query={} ) => {
  const url = `${URL.LOGIN}`;
  return async dispatch => {
    const data = await request(url, {
      method: 'POST',
      body: query,
    });
    if( data.error === false ) {
      try {
        await Tools.removeStorage('jwt');
        await Tools.setStorage('jwt', data.result.token);
        await Tools.setStorage('userId', data.result.userId);
        dispatch(getSuccess({ userInfo: data }));
        return Promise.resolve('success');
      } catch (error) {
        // alert(error);
        return Promise.reject(error);
      }
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
      return Promise.reject(data.message);
    }
  };
};
/* 第三方登录 */
export const thirdLogin = ( query={} ) => {
  const url = `${URL.THIRDLOGIN}`;
  return async dispatch => {
    const data = await request(url, {
      method: 'POST',
      body: query,
    });
    if( data.error === false ) {
      try {
        await Tools.removeStorage('jwt');
        await Tools.setStorage('jwt', data.result.token);
        await Tools.setStorage('userId', data.result.userId);
        dispatch(getSuccess({ userInfo: data }));
        return Promise.resolve('success');
      } catch (error) {
        // alert(error);
        // return Promise.reject(error);
      }
    } else {
      // Tools.showToast(data.message);
      return Promise.reject(data);
    }
  };
};


/* 清空 user sore 里面控制跳转登录页面的state  failinfo */
export const clearFailedInfo = (payload={}) => {
  return async dispatch => {
    dispatch({
      type: types.CLEAR_FAILEDINFO,
      payload,
    });
  };
};

export const getSuccess = payload => {
  return {
    type: types.PASSWORD_LOGIN,
    payload,
  };
};
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};
