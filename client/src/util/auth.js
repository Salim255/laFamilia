import axios from "axios";
export async function createUser(email, password) {
  const response = await axios
    .post("http://localhost:4000/api/v1/users/signup", {
      email: email,
      password: password,
    })
    .then(res => {
      console.log("====================================");
      console.log(res);
      console.log("====================================");
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
    });
}
