import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

/* 获取列表 */
export const getMyCollection = params => {
  const url = `${URL.FAVORITES}?favoriteType=${params.favoriteType}`;
  return async dispatch => {
    const data = await request(url);
    console.log("Collection", data);
    if (data.error === false) {
      dispatch(
        getSuccess({
          list: data.result || [],
        })
      );
      return Promise.resolve("success");
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};
/* 收藏（文章）详情 */
export const getCollectionDetail = params => {
  const url = `${URL.ARTICLE}/articleInfo/${params.id}`;
  return async dispatch => {
    const data = await request(url);
    console.log("---collectionDetail---", data);
    if (data.error === false) {
      dispatch(
        getSuccess({
          itemCollection: data.result || {},
          itemCollectionContent: JSON.parse(data.result.content) || {},
        })
      );
      return Promise.resolve("success");
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};

export const getSuccess = payload => {
  return {
    type: types.COLLECTION,
    payload,
  };
};
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};
