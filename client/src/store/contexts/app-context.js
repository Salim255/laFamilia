import { useContext, useEffect, useReducer, createContext } from "react";
import { GET_CHATS_BEGIN } from "../actions/chats_actions";

const AppContext = createContext({});

const initialState = {
  loading: false,
  chats: [],
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchChats = () => {
    dispatch({ type: GET_CHATS_BEGIN });
  };

  return <AppContext.Provider value={{ ...state, fetchChats }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
