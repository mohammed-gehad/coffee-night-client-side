import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, addItemToCart, removeItemFromCart } from "./menuSlice";
import { addOrder } from "../orders/ordersSlice";
import {
  Text,
  Button,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import Logo from "../../coffee-night.svg";
import OrderDetails from "../orders/AddOrder";
import { useNavigation } from "@react-navigation/native";

export default function Items() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, []);
  const items = useSelector((state) => state.menu.items);
  const orderDetails = useSelector((state) => state.orders.orderDetails);
  const cart = useSelector((state) => state.menu.cart);
  const totalCartPrice = useSelector((state) => state.menu.totalCartPrice);
  const navigation = useNavigation();

  const NumberOfItemsInCart = (id) => {
    let index = -1;
    cart && (index = cart.findIndex((item) => item.id == id));
    if (index != -1) {
      return cart[index].quantity;
    }
    return 0;
  };

  const placeOrder = () => {
    dispatch(
      addOrder({
        cart,
        address: orderDetails.address,
        location: orderDetails.location,
        instruction: orderDetails.instruction,
        callback: () => navigation.navigate("Home"),
      })
    );
  };

  return (
    <View style={{ backgroundColor: "#251002" }}>
      <ImageBackground
        source={{ uri: "https://i.ibb.co/HNQrKt8/bg.png" }}
        imageStyle={{ opacity: 0.5 }}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: 45,
        }}
      >
        <Logo width="100%" height={60} fill={"#fff"} />
        <View
          style={{
            height: "80%",
            backgroundColor: "rgba(256,256,256,0.7)",
            // margin: -10,
            borderTopRightRadius: 60,
            borderTopLeftRadius: 60,
            overflow: "hidden",
            // paddingTop: 20,
          }}
        >
          <ScrollView>
            <Text
              style={{ fontSize: 36, textAlign: "center", marginBottom: 20 }}
            >
              My Cart
            </Text>

            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: 4,
              }}
            >
              <View className="items" style={{ flex: 2 }}>
                {items.map((item, i) => {
                  if (NumberOfItemsInCart(item._id))
                    return (
                      <View
                        className="item"
                        key={i}
                        style={{
                          width: "90%",
                          height: 120,
                          backgroundColor: "#fff",
                          borderRadius: 19,
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "row",
                          alignSelf: "center",
                          margin: 10,
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{ width: "100%", height: "100%", flex: 1 }}
                        />

                        <View
                          style={{
                            display: "flex",
                            flex: 2,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
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
                              onPress={() =>
                                dispatch(addItemToCart({ id: item._id }))
                              }
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
                })}
              </View>
              <OrderDetails />

              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  margin: 20,
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => placeOrder()}
                    style={{
                      width: 164,
                      height: 43,
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>Place Order</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <Text style={{ fontSize: 24 }}>total {totalCartPrice}$</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}
