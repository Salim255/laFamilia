import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useGlobalContext } from "../store/auth-context";

import FriendList from "../components/Friend/Friend";
import Messenger from "../components/Messenger/Messenger";
function HomeScreen() {
  const { chats, fetchChats } = useGlobalContext();
  console.log("====================================");
  console.log(chats);
  console.log("====================================");
  // const chatCtx = useContext(AuthContext);
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <View>
      <Text>Welcome</Text>
      <FriendList />
      <Messenger />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
