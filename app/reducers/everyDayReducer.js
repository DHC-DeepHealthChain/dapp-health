import * as types from "../actions/actionTypes";

const initialState = {
  healthIndicators: {},
  isSubmit: false,
  historyList: undefined,
  isDelete: false,
};

const everyDayReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INDICATORS:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case types.SUBMIT_SUCCESS:
      return Object.assign({}, state, {
        isSubmit: true,
      });
    case types.GET_HISTOYR_LIST:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case types.DELETE_HISTOYR:
      return Object.assign({}, state, {
        isDelete: true,
      });
    default:
      return state;
  }
};

export default everyDayReducer;
