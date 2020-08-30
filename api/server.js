const axios = require("axios");
import { AsyncStorage } from "react-native";
import { store } from "../app/store";
import { receiveMessage } from "../features/orders/ordersSlice";
import io from "socket.io-client";

export const baseURL = "https://coffe-night.herokuapp.com";

export const socket = io(baseURL);

const identify = async (id) => {
  if (id) socket.emit("identify", id);
};

socket.on("connect", async () => {
  console.log("connected");
  const id = await AsyncStorage.getItem("id");
  if (id) identify(id);

  socket.on(
    "messageToCustomer",
    ({ id, message, unreadMessagesForCustomer }) => {
      console.log(message);
      store.dispatch(
        receiveMessage({ id, message, unreadMessagesForCustomer })
      );
    }
  );
});

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");

    if (token) {
      config.headers.token = token;
    }
    if (id) identify(id);

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
