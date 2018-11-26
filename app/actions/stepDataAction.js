import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

/* 获取当前T钻 */
export const getStatistics = () => {
  const url = `${URL.STEPDATA}`;
  // return async dispatch => {
  //   const data = await request(url);
  //   console.log(data);
  //   if (data.error === false) {
  //     dispatch(
  //       updateState({
  //         data: data.result,
  //       })
  //     );
  //     return Promise.resolve();
  //   } else {
  //     Tools.showToast(data.message);
  //     dispatch(failed({ failInfo: data }));
  //     return Promise.reject(data.message);
  //   }
  // };
};
/* 获取T钻明细 */
// export const getScoreList = (params = { page: 1 }) => {
//   const url = `${URL.SCORE}/scoreLogs?${Tools.formateQuery({ ...params, page: params.page - 1 })}`;
//   return async dispatch => {
//     const data = await request(url);
//     const pagination = data.result.pagination || {};
//     console.log("scoreLogs", data);
//     if (data.error === false) {
//       const param = {
//         list: data.result.list,
//         pagination: {
//           current: Number(pagination.current) + 1 || 1,
//           pageSize: Number(pagination.pageSize) || 3,
//           total: pagination.total,
//         },
//       };
//       if (pagination.current === 0) {
//         dispatch(updateState(param));
//       } else dispatch(querySuccess(param));
//       return Promise.resolve();
//     } else {
//       Tools.showToast(data.message);
//       dispatch(failed({ failInfo: data }));
//       return Promise.reject(data.message);
//     }
//   };
// };

export const updateState = payload => {
  return {
    type: types.STEPDATA,
    payload,
  };
};
// export const clearStepData = payload => {
//   return {
//     type: types.SCORE,
//     payload: {
//       ...payload,
//       list: [],
//       data: {},
//       pagination: {
//         current: 1,
//         pageSize: 3,
//         total: 0,
//       },
//     },
//   };
// };
export const querySuccess = payload => {
  return {
    type: types.STEPDATA_QUERYSUCCESS,
    payload,
  };
};
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};
