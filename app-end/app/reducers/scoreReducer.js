import * as types from "../actions/actionTypes";

const initialState = {
  list: [],
  data: {},
  pagination: {
    current: 1,
    pageSize: 20,
    total: 0,
  },
};

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SCORE:
      return Object.assign({}, state, action.payload);
    case types.SCORE_QUERYSUCCESS:
      return Object.assign(
        {}, 
        state, 
        { list: [ ...state.list, ...action.payload.list ] },
        { pagination: {
          ...state.pagination,
          ...action.payload.pagination,
        } }
      );
    default:
      return state;
  }
};

export default scoreReducer;
