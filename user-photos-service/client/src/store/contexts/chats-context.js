import { useContext, createContext, useReducer } from "react";
import reducer from "../reducers/chats_reducer";
import { GET_CHATS_BEGIN, GET_CHATS_SUCCESS, GET_CHATS_ERROR } from "../actions/chats_actions";

const initialState = {
  fetchingIsBegin: false,
};

const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getChats = () => {
    dispatch({ type: GET_CHATS_BEGIN });
  };
  return <ChatsProvider value={{ ...state }}>{children}</ChatsProvider>;
};

export const useChatsContext = () => {
  return useContext(ChatsContext);
};
