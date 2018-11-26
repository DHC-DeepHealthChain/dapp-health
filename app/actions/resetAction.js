import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

// 获取验证码
export const getCaptcha = (mobileNum) => {
  const url = `${URL.SENDCAPTCHA}/${mobileNum}`;
  return async dispatch => {
    const data = await request(url);
    if( data.error === false ) {
      dispatch(getSuccess(data));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
    return Promise.resolve(data);
  };
};

export const resetPassword = (params) => {
  const url = `${URL.RESETPASSWORD}`;
  return async dispatch => {
    const data = await request(url, {
      method: 'POST',
      body: {
        ...params,
      },
    });
    if( data.error === false ) {
      dispatch(resetSuccess(data));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
    return Promise.resolve(data);
  };
};



const getSuccess = (data) => {
  return {
    type: types.GET_CAPTCHA_CODE,
    payload: {
      code: data.result,
    },
  }
}

const resetSuccess = () => {
  return {
    type: types.RESET_PASSWORD,
  }
}

// 请求失败
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};