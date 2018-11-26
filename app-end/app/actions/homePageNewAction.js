import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";
import px2dp from "../common/px2dp";

const leftArr = [10, 110, 210, 310, 410, 510, 610];
const topArr = [0, 120, 240, 360];
const bounce = (left, top) => {
  const res = [];
  left.forEach(item => {
    top.forEach(i => {
      res.push([item, i]);
    });
  });
  return res;
};
const randomArr = bounce(leftArr, topArr);
let member = [];
/* *********************   ******************* */
/* 获取随机位置 [ 10, 120 ] */
const getRandom = () => {
  const ran = parseInt(Math.random() * 27); // eslint-disable-line
  if (member.includes(ran)) {
    return getRandom();
  } else {
    member.push(ran);
    return randomArr[ran];
  }
};
/* *********************   ******************* */

/* 获取diamond  积分列表 */
export const getDiamondList = (params = {}) => {
  /* 置空member */
  member = [];
  const url = `${URL.SCORE}/scoreLogs?${Tools.formateQuery({
    page: params.page || 0,
    pageSize: 10,
    looked: false,
  })}`;
  let loopListIds = [];
  if (params.loopList) {
    loopListIds = params.loopList.map(item => item._id);
  }
  console.log('loopListIds', loopListIds);
  return async dispatch => {
    const data = await request(url);
    console.log("getDiamondList", data);
    if (data.error === false) {
      const list = data.result.list; // eslint-disable-line
      if (list) {
        const nList = list.filter(item => {
          if (loopListIds.includes(item._id)) {
            return false;
          }
          return item;
        });
        const nnList = nList.map(item => {
          const randomPosition = getRandom();
          return {
            ...item,
            position: {
              left: px2dp(randomPosition[0]),
              top: px2dp(randomPosition[1]),
            },
          };
        });
        const param = {
          diamondList: nnList,
          pagination: data.result.pagination,
        };
        dispatch(updateState(param));
      }
      return Promise.resolve();
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
      return Promise.reject(data.message);
    }
  };
};

/* 获取 排行列表 */
export const getRankList = (params = {}) => {
  const url = `${URL.SCORE}/rank?${Tools.formateQuery({ ...params })}`;
  return async dispatch => {
    const data = await request(url);
    console.log("getRankList", data);
    if (data.error === false) {
      const param = {
        rankList: data.result,
      };
      dispatch(updateState(param));
      return Promise.resolve();
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
      return Promise.reject(data.message);
    }
  };
};

/* 标记  已获取T钻 */
export const receivedDiamond = (params = {}) => {
  const url = `${URL.SCORE}/scoreLogs/${params.id}`;
  return async dispatch => {
    const data = await request(url, {
      method: "PUT",
      body: params,
    });
    console.log("receivedDiamond", data);
    if (data.error === false) {
      return Promise.resolve();
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
      return Promise.reject(data.message);
    }
  };
};

/* 检查更新 */
export const checkIsLatestApp = () => {
  const url = `${URL.APK}`;
  return async dispatch => {
    const data = await request(url);
    console.log(data);
    if (data.error === false) {
      dispatch(
        updateState({
          appVersionInfo: data.result || {},
        })
      );
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
    return Promise.resolve();
  };
};

export const updateState = payload => {
  return {
    type: types.HOMENEW,
    payload,
  };
};
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};
