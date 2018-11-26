import * as types from "../actions/actionTypes";

const initialState = {
  code: null,
  isRegiste: false,
  data: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CAPTCHA_CODE:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case types.REGISTER_USER:
      return Object.assign({}, state, {
        isRegiste: true,
      });
    case types.SAVE_CONTENT: 
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};

export default registerReducer;
