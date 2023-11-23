import { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useGlobalContext } from "../../store/auth-context";

const FriendList = ({ chat }) => {
  //const { chats, fetchChats, fetchFriends, friends } = useGlobalContext();
  console.log("====================================");
  console.log(chat, "Hello 👹👹");
  console.log("====================================");
  // const chatCtx = useContext(AuthContext);
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <View>
      <Text>Fiend list</Text>
      <View>
        <Text>Hello</Text>
      </View>
    </View>
  );
};

export default FriendList;
