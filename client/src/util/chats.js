import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getChats() {
  try {
    const url = `http://localhost:4000/api/v1/chats`;
    let token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });

    console.log(response, "hello from chats");
  } catch (error) {
    console.log(error);
  }
}
