import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

/* 获取列表 */
export const getArticleList = (params = { page: 1 }) => {
  const url = `${URL.ARTICLE}?${Tools.formateQuery({
    ...params,
    page: params.page - 1,
    pageSize: 10,
    passType: true,
  })}`;
  return async dispatch => {
    if (params.page === 1) {
      // 先重本地取
      const cachArticleList = await Tools.getStorage("cachArticleList");
      dispatch(
        getSuccess({
          list: cachArticleList || [],
        })
      );
    }
    const data = await request(url);
    console.log("getArticleList", data);
    const pagination = data.result.pagination || {};
    if (data.error === false) {
      const param = {
        list: data.result.list,
        pagination: {
          current: Number(pagination.current) + 1 || 1,
          pageSize: Number(pagination.pageSize) || 10,
          total: pagination.total,
        },
      };
      if (pagination.current === 0) {
        dispatch(getSuccess(param));
      } else dispatch(querySuccess(param));

      if (params.page === 1) {
        await Tools.setStorage("cachArticleList", data.result.list || [], true);
      }

      return Promise.resolve();
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
      return Promise.reject(data.message);
    }
  };
};
/* 文章详情 */
export const getArticleDetail = params => {
  const url = `${URL.ARTICLE}/articleInfo/${params.id}`;
  return async dispatch => {
    const data = await request(url);
    console.log("---getArticleDetail---", data);
    if (data.error === false) {
      dispatch(
        getSuccess({
          itemArticle: data.result || {},
          itemArticleContent: JSON.parse(data.result.content) || {},
        })
      );
      return Promise.resolve("success");
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
      return Promise.reject(data.message);
    }
  };
};

/* 收藏（文章） */
export const favorite = params => {
  const url = `${URL.FAVORITES}/${params.id}?favoriteType=${
    params.favoriteType
  }`;
  return async dispatch => {
    const data = await request(url, {
      method: "POST",
      body: params,
    });
    console.log(data);
    if (data.error === false) {
      Tools.showToast("收藏成功");
      return Promise.resolve("success");
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};
/* 取消收藏 */
export const unFavorite = params => {
  const url = `${URL.FAVORITES}/${params.id}`;
  return async dispatch => {
    const data = await request(url, {
      method: "DELETE",
    });
    console.log(data);
    if (data.error === false) {
      Tools.showToast("取消成功");
      return Promise.resolve("success");
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};

/* 分享文章成功请求接口 */
export const shareArticle = (params = {}) => {
  const url = `${URL.ARTICLE}/share/${params.id}`;
  return async dispatch => {
    const data = await request(url, {
      method: "POST",
      body: params,
    });
    console.log(data);
    if (data.error === false) {
      return Promise.resolve(data);
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};

/* 清除文章详情信息 */
export const clearArticleDetail = () => {
  return async dispatch => {
    dispatch(
      getSuccess({
        itemArticle: {},
        itemArticleContent: {},
      })
    );
  };
};
export const getSuccess = payload => {
  return {
    type: types.ARTICLE,
    payload,
  };
};
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};

export const querySuccess = payload => {
  return {
    type: types.ARTICLE_QUERYSUCCESS,
    payload,
  };
};
