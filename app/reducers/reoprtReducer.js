import * as types from "../actions/actionTypes";

const initialState = {
  questionList: [],
  isSubmit: false,
  answerArr: [],
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_QUESTION_LIST:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case types.SUBMIT_ANSWER_SUCCESS:
      return Object.assign({}, state, {
        isSubmit: true,
      });
    case types.SAVE_ANSWER_LIST:
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};

export default reportReducer;
