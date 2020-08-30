import React from "react";
import { View, ImageBackground, Text } from "react-native";
import Items from "../features/menu/Items";
import Logo from "../coffee-night.svg";

export default function Orders() {
  return (
    <View style={{ backgroundColor: "#251002" }}>
      <ImageBackground
        source={{ uri: "https://i.ibb.co/HNQrKt8/bg.png" }}
        imageStyle={{ opacity: 0.5 }}
        style={{
          height: "100%",
          padding: 10,
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
            margin: -10,
            borderTopRightRadius: 60,
            borderTopLeftRadius: 60,
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 36, textAlign: "center", marginBottom: 20 }}>
            Select your drink!
          </Text>
          <Items />
        </View>
      </ImageBackground>
    </View>
  );
}
