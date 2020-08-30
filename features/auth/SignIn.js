import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignInAsync } from "./authSlice";
import { Text, Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator, View } from "react-native";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const loading = useSelector((state) => state.auth.loading);

  return (
    <View style={{ margin: 10 }}>
      <Input
        containerStyle={{
          backgroundColor: "#C4C4C4",
          borderRadius: 20,
          marginBottom: 10,
        }}
        placeholderTextColor="#251002"
        placeholder="User Name"
        leftIcon={<Icon name="user" size={24} color="#251002" />}
        value={username}
        onChangeText={setUsername}
      />
      <Input
        containerStyle={{
          backgroundColor: "#C4C4C4",
          borderRadius: 20,
          marginBottom: 10,
        }}
        placeholderTextColor="#251002"
        placeholder="Email"
        leftIcon={<Icon name="envelope" size={24} color="#251002" />}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholderTextColor="#251002"
        containerStyle={{
          backgroundColor: "#C4C4C4",
          borderRadius: 20,
          marginBottom: 10,
        }}
        placeholder="Password"
        secureTextEntry={true}
        leftIcon={<Icon name="key" size={24} color="#251002" />}
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            buttonStyle={{
              backgroundColor: "#C4C4C4",
              width: 200,
              borderRadius: 20,
            }}
            titleStyle={{ color: "#251002" }}
            title="Sign In"
            onPress={() => {
              dispatch(SignInAsync({ email, password, username }));
            }}
          />
        </View>
      )}
    </View>
  );
}
