import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

// 获取消息列表
export const submitFeedback = (params) => {
  const url = `${URL.FEEDBACK}`;
  return async dispatch => {
    const data = await request(url, {
      method: 'POST',
      body: {
        ...params,
      },
    });
    if( data.error === false ) {
      dispatch(submitSuccess());
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
    return Promise.resolve(data);
  };
};


const submitSuccess = () => {
  return {
    type: types.SUBMIT_FEEDBACK,
  }
}

// 请求失败
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};