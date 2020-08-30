import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, addItemToCart, removeItemFromCart } from "./menuSlice";
import {
  Text,
  Button,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";

export default function Items() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, []);
  const items = useSelector((state) => state.menu.items);
  const cart = useSelector((state) => state.menu.cart);
  const { width } = Dimensions.get("screen");

  const NumberOfItemsInCart = (id) => {
    let index = -1;
    cart && (index = cart.findIndex((item) => item.id == id));
    if (index != -1) {
      return cart[index].quantity;
    }
    return 0;
  };

  return (
    <View className="items">
      <Carousel
        // ref={(c) => { this._carousel = c; }}
        data={items}
        renderItem={({ item }, i) => {
          return (
            <View
              className="item"
              key={i}
              style={{
                width: 250,
                height: 415,
                backgroundColor: "#fff",
                borderRadius: 19,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: "100%", height: "80%" }}
              />

              <View style={{ display: "flex", flex: 2, flexDirection: "row" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={{ fontSize: 24 }}> {item.name}</Text>
                  <Text style={{ fontSize: 18, color: "#505050" }}>
                    {item.price}$
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      // flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#E7E7E7",
                      width: 30,
                      height: 30,
                      borderRadius: 6,
                      margin: 5,
                    }}
                    onPress={() => dispatch(addItemToCart({ id: item._id }))}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                      }}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 24, margin: 7 }}>
                    {NumberOfItemsInCart(item._id)}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      dispatch(removeItemFromCart({ id: item._id }))
                    }
                    style={{
                      // flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#E7E7E7",
                      width: 30,
                      height: 30,
                      borderRadius: 6,
                      margin: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                      }}
                    >
                      -
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
        sliderWidth={width}
        itemWidth={250}
      />
    </View>
  );
}
