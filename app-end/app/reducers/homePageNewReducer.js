import * as types from "../actions/actionTypes";

const initialState = {
  appVersionInfo: {},
  diamondList: [],
  rankList: [],
};

const homeNewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HOMENEW:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default homeNewReducer;
