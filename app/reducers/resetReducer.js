import * as types from "../actions/actionTypes";

const initialState = {
  code: null,
  isReset: true,
};

const resetReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CAPTCHA_CODE:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case types.RESET_PASSWORD:
      return Object.assign({}, state, {
        isReset: true,
      });
    default:
      return state;
  }
};

export default resetReducer;
