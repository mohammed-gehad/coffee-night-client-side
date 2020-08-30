import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import api from "../../api/server";
import { logout } from "../auth/authSlice";
import { socket } from "../../api/server";

export const sendMessageToAdmin = createAsyncThunk(
  "orders/sendMessageToAdmin",
  async ({ id, message }) => {
    socket.emit("messageToAdmin", {
      id,
      message,
    });

    return { id, message };
  }
);
export const asyncOrders = createAsyncThunk("orders/asyncOrders", async () => {
  const result = await api.get("/order");

  return result.data.orders;
});
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({ location, address, instruction, callback, cart }) => {
    const result = await api.post("/order", {
      location,
      address,
      instruction,
      cart,
    });
    callback(); //to navigate to orders list
    socket.emit("orderAdded");

    return result.data;
  }
);

const orderAdapter = createEntityAdapter({
  selectId: (order) => {
    return order._id;
  },
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: orderAdapter.getInitialState({
    loading: false,
    orderDetails: {
      location: {
        latitude: 0,
        longitude: 0,
      },
      address: "",
      instruction: "",
    },
  }),
  reducers: {
    receiveMessage: (state, { payload }) => {
      orderAdapter.updateOne(state, {
        id: payload.id,
        changes: {
          chat: [payload.message, ...state.entities[payload.id].chat],
          unreadMessagesForCustomer: payload.unreadMessagesForCustomer,
        },
      });
    },
    setAddress: (state, { payload }) => {
      // console.log(payload/);
      state.orderDetails.address = payload.address;
    },
    setLocation: (state, { payload: { latitude, longitude } }) => {
      state.orderDetails.location.latitude = latitude;
      state.orderDetails.location.longitude = longitude;
    },
    setInstruction: (state, { payload }) => {
      state.orderDetails.instruction = payload.instruction;
    },
  },
  extraReducers: {
    [logout]: (state) => {
      orderAdapter.removeAll(state);
    },
    [asyncOrders.fulfilled]: (state, { payload }) => {
      orderAdapter.setAll(state, payload);
      state.loading = false;
    },
    [asyncOrders.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [asyncOrders.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [addOrder.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [addOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      orderAdapter.setAll(state, payload);
    },
    [addOrder.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [sendMessageToAdmin.fulfilled]: (state, { payload }) => {
      orderAdapter.updateOne(state, {
        id: payload.id,
        changes: {
          chat: [payload.message, ...state.entities[payload.id].chat],
          unreadMessagesForCustomer: 0,
        },
      });
    },
  },
});

export const {
  receiveMessage,
  setAddress,
  setInstruction,
  setLocation,
} = ordersSlice.actions;
export const ordersLoading = (state) => state.orders.loading;
export const ordersSelectors = orderAdapter.getSelectors(
  (state) => state.orders
);
export default ordersSlice.reducer;
