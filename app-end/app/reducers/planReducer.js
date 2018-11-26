import * as types from "../actions/actionTypes";

const initialState = {
  joinList: [],
  notJoinList: [],
  planDetail: {},
  planDetailContent: {},
  ownPlanFinishData: {},
};

const planReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PLAN:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default planReducer;
