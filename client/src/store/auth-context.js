import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { useContext, createContext, useReducer, useState, useEffect } from "react";
import reducer from "./reducers/chats_reducer";
import { GET_CHATS_BEGIN, GET_CHATS_SUCCESS, GET_CHATS_ERROR } from "./actions/chats_actions";

const initialState = {
  fetchingIsBegin: false,
  chats: [],
};

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: token => {},
  logout: () => {},
  fetchChats: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  const [state, dispatch] = useReducer(reducer, initialState);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }
  const fetchChats = async () => {
    dispatch({ type: GET_CHATS_BEGIN });
    try {
      const url = `http://localhost:4000/api/v1/chats`;
      let token = await AsyncStorage.getItem("token");
      console.log(token);
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data.data);
      dispatch({ type: GET_CHATS_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: GET_CHATS_ERROR });
    }
  };

  const createDualChat = async () => {};

  const createGroupeChat = async () => {};

  const deleteChat = async () => {};

  const getChats = async () => {
    const url = `http://localhost:4000/api/v1/chats`;
    let token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    console.log(response.data.data);
  };

  useEffect(() => {
    fetchChats();
  }, []);
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    fetchChats: fetchChats,
    createDualChat: createDualChat,
    createGroupeChat: createGroupeChat,
    deleteChat: deleteChat,
  };
  return <AuthContext.Provider value={{ ...state, ...value }}>{children}</AuthContext.Provider>;
}
export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
