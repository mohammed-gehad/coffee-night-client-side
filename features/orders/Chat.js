import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
// import { socket } from "../../api/server";
import { Input, Button } from "react-native-elements";
import {
  sendMessageToAdmin,
  receiveMessage,
  ordersSelectors,
} from "./ordersSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Chat({ id }) {
  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();
  const messages = useSelector(
    (state) => ordersSelectors.selectById(state, id).chat
  );

  const renderMessages = () => {
    return messages.map((message, index) => {
      if (message.sender === "customer") {
        return <Text key={index.toString()}>You:{message.message}</Text>;
      }
      if (message.sender === "admin") {
        return (
          <Text style={{ textAlign: "right" }} key={index.toString()}>
            {message.message}:Admin
          </Text>
        );
      }
    });
  };
  return (
    <View
      style={{
        width: Dimensions.get("window").width - 100,
        height: Dimensions.get("window").height - 200,
      }}
    >
      <Text>{id}</Text>
      <Input value={message} onChangeText={setMessage} placeholder="message" />
      <Button
        onPress={() => {
          dispatch(
            sendMessageToAdmin({ id, message: { sender: "customer", message } })
          );
        }}
        title="send"
      />
      <ScrollView>{renderMessages()}</ScrollView>
    </View>
  );
}
