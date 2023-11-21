import { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useGlobalContext } from "../../store/auth-context";
import Friend from "./FrindItem";
const FriendList = () => {
  const { chats, fetchChats, fetchFriends, friends } = useGlobalContext();
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
        {friends.map(item => {
          return <Friend key={item.id} friend={item} />;
        })}
      </View>
    </View>
  );
};

export default FriendList;
