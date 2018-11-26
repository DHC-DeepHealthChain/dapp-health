import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

// 获取用户信息
export const getUserInfo = (param) => {
  const url = `${URL.USERINFO}/${param}`;
  return async dispatch => {
    const data = await request(url);
    console.log('getUserInfo', data);
    if( data.error === false ) {
      dispatch(getSuccess(data));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};

// 获取邀请码
export const getInviteCode = () => {
  const url = `${URL.USERINFO}/invite`;
  return async dispatch => {
    const data = await request(url);
    console.log('getInviteCode', data);
    if( data.error === false ) {
      dispatch(updateUserInfo({ inviteData: data.result }));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};



/* 更新数据 */
export const updateUserInfo = (payload={}) => {
  return async dispatch => {
    dispatch({
      type: types.GET_PERSONAL_INFO,
      payload,
    });
  };
};

const getSuccess = (data) => {
  return {
    type: types.GET_PERSONAL_INFO,
    payload: {
      userInfo: data.result,
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