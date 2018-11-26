import * as types from "../actions/actionTypes";

const initialState = {
  list: [],
  data: {},
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
};

const stepDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.STEPDATA:
      return Object.assign({}, state, action.payload);
   case types.STEPDATA_LIST:
      return Object.assign({}, state,{ list: [ ...state.list, ...action.payload.list ]});
    case types.STEPDATA_QUERYSUCCESS:
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

export default stepDataReducer;
