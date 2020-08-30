import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import Login from "../features/auth/Login";
import SignIn from "../features/auth/SignIn";
import { Button } from "react-native-elements";
import Logo from "../coffee-night.svg";

export default function LoginScreen() {
  const [signin, setSignin] = useState(true);
  const toggle = () => {
    setSignin(!signin);
  };

  return (
    <View style={{ backgroundColor: "#251002" }}>
      <ImageBackground
        source={{ uri: "https://i.ibb.co/HNQrKt8/bg.png" }}
        imageStyle={{ opacity: 0.5 }}
        style={{
          height: "100%",
          padding: 10,
        }}
      >
        <Logo width="100%" height={60} fill={"#fff"} />
        {signin ? <SignIn /> : <Login />}
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {signin ? (
            <Button
              titleStyle={{ color: "#C4C4C4" }}
              buttonStyle={{
                backgroundColor: "transparent",
                width: 200,
                borderRadius: 20,
                borderColor: "#C4C4C4",
              }}
              title="login instead"
              type="outline"
              onPress={toggle}
            />
          ) : (
            <Button
              titleStyle={{ color: "#C4C4C4" }}
              buttonStyle={{
                backgroundColor: "transparent",
                width: 200,
                borderRadius: 20,
                borderColor: "#C4C4C4",
              }}
              title="signin instead"
              type="outline"
              onPress={toggle}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
}
