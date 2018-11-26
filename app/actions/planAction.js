import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

/* 获取计划列表 */
export const getPlanList = () => {
  const url = `${URL.PLAN}/my`;
  return async dispatch => {
    // 先重本地取
    const cachJoinList = await Tools.getStorage("cachJoinList");
    const cachNotJoinList = await Tools.getStorage("cachNotJoinList");
    dispatch(getSuccess({
      joinList: cachJoinList || [],
      notJoinList: cachNotJoinList || [],
    }));
    const data = await request(url);
    console.log(data);
    if( data.error === false ) {
      dispatch(getSuccess({
        joinList: data.result.userJoinList || [],
        notJoinList: data.result.userNotJoinList || [],
      }));

      await Tools.setStorage('cachJoinList', data.result.userJoinList || [], true);
      await Tools.setStorage('cachNotJoinList', data.result.userNotJoinList || [], true);
      
      return Promise.resolve();
    } else {
      Tools.showToast(data.message);
      dispatch(failed({failInfo: data}));
      return Promise.reject(data.message);
    }
  };
};
/* 获取计划详情 自己参与的计划 */
export const getOwnPlanDetail = (params) => {
  const url = `${URL.PLAN}/planItemInfo/${params.id}`;
  return async dispatch => {
    const data = await request(url);
    console.log('OwnPlanDetail', data);
    if( data.error === false ) {
      const res = data.result || {};
      dispatch(getSuccess({
        planDetail: res,
        planDetailContent: JSON.parse(res.content),
      }));
      return Promise.resolve('success');
    } else {
      Tools.showToast(data.message);
      dispatch(failed({failInfo: data}));
      return Promise.reject(data.message);
    }
  };
};
/* 取消计划 */
export const cancelPlan = (params) => {
  const url = `${URL.PLAN}/join/${params.id}`;
  return async dispatch => {
    const data = await request(url, {
      method: 'DELETE',
    });
    console.log(data);
    if( data.error === false ) {
      Tools.showToast(data.message);
      return Promise.resolve('success');
    } else {
      Tools.showToast(data.message);
      dispatch(failed({failInfo: data}));
    }
  };
};
/* 参与计划 */
export const joinPlan = (params) => {
  const url = `${URL.PLAN}/join/${params.id}`;
  return async dispatch => {
    const data = await request(url, {
      method: 'POST',
      body: {},
    });
    console.log(data);
    if( data.error === false ) {
      Tools.showToast(data.message);
      return Promise.resolve('success');
    } else {
      Tools.showToast(data.message);
      dispatch(failed({failInfo: data}));
      return Promise.reject(data.message);
    }
  };
};
/* 完成计划 标记完成 */
export const finishPlan = (params) => {
  const url = `${URL.PLAN}/planItemInfo/remark/${params.id}`;
  return async dispatch => {
    const data = await request(url, {
      method: 'PUT',
      body: {},
    });
    console.log(data);
    Tools.showToast(data.message);
    if( data.error === false ) {
      dispatch(getSuccess({
        ownPlanFinishData: data.result || {},
      }));
      return Promise.resolve('success');
    } else {
      dispatch(failed({failInfo: data}));
      return Promise.reject(data.message);
    }
  };
};

export const getSuccess = payload => {
  return {
    type: types.PLAN,
    payload,
  };
};
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};
