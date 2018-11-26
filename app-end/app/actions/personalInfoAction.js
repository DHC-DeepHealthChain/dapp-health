import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

// 更新用户信息
export const updateInfo = (params, id) => {
  const url = `${URL.USERINFO}/${id}`;
  return async dispatch => {
    const data = await request(url, {
      method: 'PUT',
      body: {
        ...params,
      },
    });
    if( data.error === false ) {
      dispatch(updateSuccess());
      Promise.resolve();
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
      Promise.reject();
    }
  };
};

const updateSuccess = () => {
  return {
    type: types.UPDATE_USER_INFO,
  }
}

// 请求失败
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};