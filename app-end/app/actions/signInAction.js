import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

// 签到
export const signIn = () => {
  const url = `${URL.SIGNIN}`;
  return async dispatch => {
    const data = await request(url, {
      method: 'POST',
    });
    if( data.error === false ) {
      dispatch(SubmitSuccess());
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
    return Promise.resolve(data);
  };
};

// 获取签到记录
export const getList = () => {
  const url = `${URL.SIGNIN}`;
  return async dispatch => {
    const data = await request(url);
    console.log('list', data);
    if( data.error === false ) {
      dispatch(getSuccess(data));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};

// 获取签到记录
export const getSignInfo = () => {
  const url = `${URL.SIGNIN}/signState`;
  return async dispatch => {
    const data = await request(url);
    console.log('getSignInfo', data);
    if( data.error === false ) {
      dispatch(getInfoSuccess(data));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};

const SubmitSuccess = () => {
  return {
    type: types.SIGN_SUCCESS,
  }
}

const getSuccess = (data) => {
  return {
    type: types.GET_SIGN_LIST,
    payload: {
      list: data.result,
    },
  }
}

const getInfoSuccess = (data) => {
  return {
    type: types.GET_SIGN_INFO,
    payload: {
      signInfo: data.result,
    },
  }
}

// 请求失败
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};