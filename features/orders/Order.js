import React from "react";
import { View, Text } from "react-native";

export default function Order({ order }) {
  return (
    <View>
      <Text>{order.status}</Text>
    </View>
  );
}
