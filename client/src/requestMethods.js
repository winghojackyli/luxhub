import axios from "axios";

const getBaseUrl = () => {
  if (process.env.NODE_MODE === "production") {
    return "https://luxhub-api.onrender.com/api/";
  } else {
    return "http://localhost:5000/api/";
  }
};

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
  baseURL: getBaseUrl(),
});

export const userRequest = axios.create({
  baseURL: getBaseUrl(),
  headers: { token: getToken() || TOKEN },
});
