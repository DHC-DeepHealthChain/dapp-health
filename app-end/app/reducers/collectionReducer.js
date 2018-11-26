import * as types from "../actions/actionTypes";

const initialState = {
  list: [],
  itemCollection: {},
  itemCollectionContent: {},
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.COLLECTION:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default collectionReducer;
