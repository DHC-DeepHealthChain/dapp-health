import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

// 获取验证码
export const getCaptcha = (mobileNum, type) => {
  const url = `${URL.SENDCAPTCHA}/${mobileNum}?type=${type}`;
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

export const registerUser = (params) => {
  const url = `${URL.USERINFO}`;
  return async dispatch => {
    const data = await request(url, {
      method: 'POST',
      body: {
        ...params,
      },
    });
    Tools.showToast(data.message);
    if( data.error === false ) {
      dispatch(registerSuccess(data));
      return Promise.resolve();
    } else {
      dispatch(failed({ failInfo: data }));
      return Promise.reject(data.message);
    }
  };
};

/* 检查邀请码是否正确 */
export const checkInviteCode = (params) => {
  const url = `${URL.USERINFO}/invite`;
  return async dispatch => {
    const data = await request(url, {
      method: 'POST',
      body: {
        ...params,
      },
    });
    console.log('checkInviteCode', data);
    if( data.error === false ) {
      return Promise.resolve();
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
      return Promise.reject(data.message);
    }
  };
};
/* 绑定手机号 */
export const combinePhone = (params) => {
  const url = `${URL.AUTH}/associatedWeixinAccount`;
  return async dispatch => {
    const data = await request(url, {
      method: 'POST',
      body: {
        ...params,
      },
    });
    console.log('combinePhone', data);
    Tools.showToast(data.message);
    if( data.error === false ) {
      return Promise.resolve();
    } else {
      dispatch(failed({ failInfo: data }));
      return Promise.reject(data.message);
    }
  };
};


export const saveData = (data) => {
  return {
    type: types.SAVE_CONTENT,
    payload: data,
  }
}

const getSuccess = (data) => {
  return {
    type: types.GET_CAPTCHA_CODE,
    payload: {
      code: data.result,
    },
  }
}

const registerSuccess = () => {
  return {
    type: types.REGISTER_USER,
  }
}

// 请求失败
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};