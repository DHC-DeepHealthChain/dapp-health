import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

// 获取消息列表
export const getMessage = () => {
  const url = `${URL.MESSAGE}`;
  return async dispatch => {
    const data = await request(url);
    if( data.error === false ) {
      dispatch(getSuccess(data));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};

// 阅读消息
export const readMessage = (id) => {
  const url = `${URL.MESSAGE}/read/${id}`;
  return async dispatch => {
    const data = await request(url, {
      method: 'PUT',
    });
    if( data.error === false ) {
      dispatch(readSuccess(data));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
    return Promise.resolve(data);
  };
};

const getSuccess = (data) => {
  return {
    type: types.GET_MESSAGE_LIST,
    payload: {
      messageList: data.result,
    },
  }
}

const readSuccess = () => {
  return {
    type: types.READ_MESSAGE,
  }
}

// 请求失败
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};