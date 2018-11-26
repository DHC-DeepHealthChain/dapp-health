import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

// 获取数据
export const getIndicators = () => {
  const url = `${URL.INDICATORS}/last`;
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

// 提交数据
export const submitData = (param) => {
  const url = `${URL.INDICATORS}`;
  return async dispatch => {
    const data = await request(url, {
      method: 'POST',
      body: {
        ...param,
      },
    });
    if( data.error === false ) {
      Tools.showToast('添加成功');
      dispatch(submitSuccess());
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
    return Promise.resolve(data);
  };
};

// 提交步数数据
export const submitStepData = (param) => {
  const url = `${URL.INDICATORS}/step`;
  return async dispatch => {
    const data = await request(url, {
      method: 'POST',
      body: {
        ...param,
      },
    });
    if( data.error === false ) {
      Tools.showToast('添加成功');
      dispatch(submitSuccess());
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
    return Promise.resolve(data);
  };
};



// 获取历史记录
export const getHistoryList = (param) => {
  const url = URL.INDICATORS;
  return async dispatch => {
    const data = await request(`${url}?healthType=${param.healthType}`);
    if( data.error === false ) {
      dispatch(getListSuccess(data));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};

// 获取步数历史记录
export const getStepHistoryList = () => {
  const url = URL.INDICATORS;
  return async dispatch => {
    const data = await request(`${url}?healthType=step`);
    if( data.error === false ) {
      dispatch(getStepListSuccess(data));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};

// 根据id删除历史记录
export const deleteList = (param) => {
  const url = `${URL.INDICATORS}`;
  return async dispatch => {
    const data = await request(`${url}/${param}`, {
      method: 'DELETE',
    });
    if( data.error === false ) {
      dispatch(deleteSuccess());
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};

// 获取健康指标数据成功
export const getSuccess = data => {
  return {
    type: types.GET_INDICATORS,
    payload: { healthIndicators: data.result },
  };
};

export const submitSuccess = () => {
  return {
    type: types.SUBMIT_SUCCESS,
  }
}

export const getListSuccess = (data) => {
  return {
    type: types.GET_HISTOYR_LIST,
    payload: { historyList: data.result },
  };
}

export const getStepListSuccess = (data) => {
  return {
    type: types.STEPDATA,
    payload: { list: data.result },
  };
}

export const deleteSuccess = () => {
  return {
    type: types.DELETE_HISTOYR,
  }
}

// 请求失败
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};