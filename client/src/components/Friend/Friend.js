import { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useGlobalContext } from "../../store/auth-context";
import Friend from "./FrindItem";
const FriendList = () => {
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
      <Text>Fiend list</Text>
      <View>
        {chats.map(item => {
          return <Friend key={item.id} />;
        })}
      </View>
    </View>
  );
};

export default FriendList;
