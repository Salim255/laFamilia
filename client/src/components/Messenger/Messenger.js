import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useGlobalContext } from "../../store/auth-context";

const Messenger = () => {
  const { currentChat } = useGlobalContext();
  const activeChat = () => {
    console.log(currentChat, "Chant length 🎃🎃🎃", currentChat);
    return Object.keys(currentChat).length > 0;
  };
  useEffect(() => {
    console.log(currentChat);
  }, [currentChat]);
  return (
    <View>
      <Text> Messenger</Text>
      <View>
        {activeChat() ? (
          <View>
            <Text>Type: {currentChat.type}</Text> <Text>Display all the messages</Text>{" "}
            <Text>Input to write a message</Text>
          </View>
        ) : (
          <Text>No Active chat</Text>
        )}
      </View>
    </View>
  );
};

export default Messenger;
