import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { useContext, createContext, useReducer, useState, useEffect } from "react";
import reducer from "./reducers/chats_reducer";
import {
  GET_CHATS_BEGIN,
  GET_CHATS_SUCCESS,
  GET_CHATS_ERROR,
  GET_FRIENDS_BEGIN,
  GET_FRIENDS_SUCCESS,
  GET_FRIENDS_ERROR,
  SET_CURRENT_CHAT_SUCCESS,
  SET_CURRENT_CHAT_ERROR,
  SET_CURRENT_CHAT_BEGIN,
} from "./actions/chats_actions";

const initialState = {
  fetchingIsBegin: false,
  fetchFriendsBegin: false,
  currentChat: [],
  settingCurrentChat: false,
  friends: [],
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

  const fetchFriends = async () => {
    dispatch({ type: GET_FRIENDS_BEGIN });
    try {
      const url = `http://localhost:4000/api/v1/users`;
      let token = await AsyncStorage.getItem("token");
      console.log(token);
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data.data, "friends");
      dispatch({ type: GET_FRIENDS_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: GET_FRIENDS_ERROR });
    }
  };

  const setCurrentChat = async chat => {
    //SET_CURRENT_CHAT_SUCCESS
    dispatch({ type: SET_CURRENT_CHAT_BEGIN });
    try {
      console.log("====================================");
      console.log("Hello from set current chat 👹👹👹");
      console.log("====================================");
      dispatch({ type: SET_CURRENT_CHAT_SUCCESS, payload: chat });
    } catch (error) {
      dispatch({ type: SET_CURRENT_CHAT_ERROR });
    }
  };
  useEffect(() => {
    fetchChats();
    fetchFriends();
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
    fetchFriends: fetchFriends,
    setCurrentChat: setCurrentChat,
  };
  return <AuthContext.Provider value={{ ...state, ...value }}>{children}</AuthContext.Provider>;
}
export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
