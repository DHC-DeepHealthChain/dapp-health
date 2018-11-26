import * as types from "../actions/actionTypes";

const initialState = {
  failInfo: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PASSWORD_LOGIN:
      return Object.assign({}, state, action.payload);
    case types.REQUEST_FAILED:
      return Object.assign({}, state, action.payload);
    case types.CLEAR_FAILEDINFO:
      return Object.assign({}, state, action.payload, { failInfo: {} });
    default:
      return state;
  }
};

export default userReducer;
