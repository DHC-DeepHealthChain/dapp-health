import * as types from "../actions/actionTypes";

const initialState = {
  bannerList: [],
  questionList: [],
  appVersionInfo: {},
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HOME_UPDATE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default homeReducer;
