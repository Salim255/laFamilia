import axios from "axios";

async function authenticate(mode, email, password) {
  const url = `http://localhost:4000/api/v1/users/${mode}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
  });
}

export async function createUser(email, password) {
  await authenticate("signup", email, password);
}

export async function loginUser(email, password) {
  await authenticate("login", email, password);
}
