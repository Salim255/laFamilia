import axios from "axios";

async function authenticate(mode, email, password) {
  const url = `http://localhost:4000/api/v1/users/${mode}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
  });
  let token;
  if (mode === "login") {
    token = response?.data?.token;
    return token;
  }

  token = response?.data?.data?.token;

  return token;
}

export async function createUser(email, password) {
  return authenticate("signup", email, password);
}

export async function loginUser(email, password) {
  return authenticate("login", email, password);
}
