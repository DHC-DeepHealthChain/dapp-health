import * as types from "../actions/actionTypes";

const initialState = {
  messageList: [],
  isRead: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MESSAGE_LIST:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case types.READ_MESSAGE:
      return Object.assign({}, state, {
        isRead: true,
      }); 
    default:
      return state;
  }
};

export default messageReducer;
