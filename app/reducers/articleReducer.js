import * as types from "../actions/actionTypes";

const initialState = {
  list: [],
  itemArticle: {},
  itemArticleContent: {},
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ARTICLE:
      return Object.assign({}, state, action.payload);
    case types.ARTICLE_QUERYSUCCESS:
      return Object.assign(
        {},
        state,
        { list: [...state.list, ...action.payload.list] },
        {
          pagination: {
            ...state.pagination,
            ...action.payload.pagination,
          },
        }
      );
    default:
      return state;
  }
};

export default articleReducer;
