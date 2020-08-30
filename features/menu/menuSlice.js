import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/server";
// import storage from "redux-persist/lib/storage";
const storage = window.localStorage;

export const getItems = createAsyncThunk("menu/getItems", async () => {
  const result = await api.get("/admin/items");
  return result.data;
});

const refreshTotalPrice = ({ items, cart }) => {
  const Price = (id) => {
    let index = -1;
    items && (index = items.findIndex((item) => item._id == id));
    if (index != -1) {
      return items[index].price;
    }
    return 0;
  };

  let price = 0;
  cart.map((item) => {
    price = price + Price(item.id) * item.quantity;
  });
  return price;
};

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    cart: [],
    totalCartPrice: 0,
    loading: false,
    erorrMessage: "",
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      const itemId = payload.id;
      const index = state.cart.findIndex((item) => item.id == itemId);
      if (index != -1) {
        state.cart[index] = {
          ...state.cart[index],
          quantity: state.cart[index].quantity + 1,
        };
      } else state.cart.push({ id: itemId, quantity: 1 });

      state.totalCartPrice = refreshTotalPrice(state);
    },
    removeItemFromCart: (state, { payload }) => {
      const itemId = payload.id;
      const index = state.cart.findIndex((item) => item.id == itemId);
      if (index != -1) {
        if (state.cart[index].quantity == 1) state.cart.splice(index, 1);
        else
          state.cart[index] = {
            ...state.cart[index],
            quantity: state.cart[index].quantity - 1,
          };
      }
      state.totalCartPrice = refreshTotalPrice(state);
    },
  },
  extraReducers: {
    [getItems.fulfilled]: (state, { payload }) => {
      state.items = payload;
    },
    [getItems.pending]: (state, { payload }) => {
      console.log(payload);
    },
    [getItems.rejected]: (state, { payload }) => {
      console.log("rejected");
    },
  },
});

export default menuSlice.reducer;
export const { addItemToCart, removeItemFromCart } = menuSlice.actions;
