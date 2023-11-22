import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useGlobalContext } from "../store/auth-context";

import Button from "../components/ui/Button";
import FriendList from "../components/Friend/Friend";
import Messenger from "../components/Messenger/Messenger";

function HomeScreen() {
  const { chats, fetchChats, setCurrentChat } = useGlobalContext();
  const [openM, setOpenM] = useState(false);

  console.log("====================================");
  console.log(chats, "From home screen 👹👹");
  console.log("====================================");
  const openChat = chat => {
    console.log("====================================");
    console.log("Chat opend", chat);
    console.log("====================================");
    setCurrentChat(chat);
    setOpenM(true);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  let screen = (
    <View>
      <Text>Loading</Text>
    </View>
  );
  if (chats.length === 0) {
    return screen;
  }
  return (
    <View>
      <Text>Chats</Text>
      {chats.map(chat => {
        return (
          <View key={chat.id}>
            <Text>Chat : {chat.id}</Text>
            <Button onPress={() => openChat(chat)}>
              Last message: {chat?.messages[chat?.messages?.length - 1].content}
            </Button>
          </View>
        );
      })}
      <Messenger />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
