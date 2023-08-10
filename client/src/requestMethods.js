import axios from "axios";

const NODE_MODE = process.env.REACT_APP_NODE_MODE;
const BASE_URL =
  NODE_MODE === "production"
    ? "https://luxhub-api.onrender.com/api/"
    : "http://localhost:5000/api/";

export const getToken = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("persist:root")
  )?.currentUser;
  return currentUser && JSON.parse(currentUser)?.accessToken;
};

const currentUser = JSON.parse(
  localStorage.getItem("persist:root")
)?.currentUser;
const TOKEN = currentUser && JSON.parse(currentUser)?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: TOKEN },
});

userRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 403 || error.response.status == 401) {
      console.log("token");
      getToken();
      (() => {
        if (window.localStorage) {
          // If there is no item as 'reload'
          // in localstorage then create one &
          // reload the page
          if (!localStorage.getItem("reload")) {
            localStorage["reload"] = true;
            window.location.reload();
          } else {
            // If there exists a 'reload' item
            // then clear the 'reload' item in
            // local storage
            localStorage.removeItem("reload");
          }
        }
      })();
    }
  }
);
