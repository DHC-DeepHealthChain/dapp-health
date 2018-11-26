import * as types from "../actions/actionTypes";

const initialState = {
  list: null,
  signInfo: null,
  isSign: false,
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SIGN_LIST:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case types.SIGN_SUCCESS:
      return Object.assign({}, state, {
        isSign: true,
      });
    case types.GET_SIGN_INFO:
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};

export default signInReducer;
