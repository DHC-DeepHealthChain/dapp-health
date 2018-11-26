import * as types from "../actions/actionTypes";

const initialState = {
  userInfo: {},
  inviteData: {},
};

const userCenterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PERSONAL_INFO:
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};

export default userCenterReducer;
