import { GET_CHATS_BEGIN, GET_CHATS_SUCCESS, GET_CHATS_ERROR } from "../actions/chats_actions";

const chats_reducer = (state, action) => {
  if (action.type === GET_CHATS_BEGIN) {
    return { ...state, fetchingIsBegin: true };
  }
  if (action.type === GET_CHATS_SUCCESS) {
    return { ...state, chats: action.payload };
  }
  if (action.type === GET_CHATS_ERROR) {
    return { ...state };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default chats_reducer;
