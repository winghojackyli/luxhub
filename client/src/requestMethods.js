import axios from "axios";

const NODE_MODE = process.env.NODE_MODE;
const BASE_URL =
  NODE_MODE === "production"
    ? "https://luxhub-api.onrender.com/api/"
    : "http://localhost:5000/api/";

console.log(NODE_MODE);

const currentUser = JSON.parse(
  localStorage.getItem("persist:root")
)?.currentUser;

const TOKEN = currentUser && JSON.parse(currentUser)?.accessToken;

const getToken = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("persist:root")
  )?.currentUser;
  return currentUser && JSON.parse(currentUser)?.accessToken;
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: getToken() || TOKEN },
});
