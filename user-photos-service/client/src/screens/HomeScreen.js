import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useGlobalContext } from "../store/auth-context";
import socketIoClient from "socket.io-client";

import Button from "../components/ui/Button";
import FriendList from "../components/Friend/Friend";
import Messenger from "../components/Messenger/Messenger";

import useSocket from "../util/socketConnect";

function HomeScreen() {
  const { chats, fetchChats, setCurrentChat } = useGlobalContext();
  const [openM, setOpenM] = useState(false);

  console.log("====================================");
  console.log(chats, "From home screen 👹👹");
  console.log("====================================");

  const connectToSocket = async data => {
    const socket = await socketIoClient.connect("http://localhost:4000");
    console.log("====================================");
    console.log("Logged user before send to socket 💥💥💥💥", data);
    console.log("====================================");
    socket.emit("join", data);
  };

  const openChat = chat => {
    console.log("====================================");
    console.log("Chat opend", chat);
    console.log("====================================");
    setCurrentChat(chat);

    setOpenM(true);

    connectToSocket({ email: "Salim" });
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
