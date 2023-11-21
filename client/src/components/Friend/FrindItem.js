import React from "react";
import { View, Text } from "react-native";

const Friend = ({ friend }) => {
  console.log("====================================");
  console.log(friend);
  console.log("====================================");
  return (
    <View>
      <Text>Friend: {friend.id}</Text>
    </View>
  );
};

export default Friend;
