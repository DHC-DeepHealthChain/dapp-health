import * as types from "../actions/actionTypes";

const initialState = {
  isSubmit: false,
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SUBMIT_FEEDBACK:
      return Object.assign({}, state, {
        isSubmit: true,
      });
    default:
      return state;
  }
};

export default feedbackReducer;
