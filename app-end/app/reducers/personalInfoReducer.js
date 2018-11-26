import * as types from "../actions/actionTypes";

const initialState = {
  isUpdate: false,
};

const userCenterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_USER_INFO:
      return Object.assign({}, state, {
        isUpdate: true,
      });
    default:
      return state;
  }
};

export default userCenterReducer;
