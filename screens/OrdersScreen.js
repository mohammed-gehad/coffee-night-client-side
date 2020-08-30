import React from "react";
import { View, ScrollView } from "react-native";
import Orders from "../features/orders/Orders";
import { Text, Divider } from "react-native-elements";

export default function OrdersScreen() {
  return (
    <View style={{ paddingTop: 40 }}>
      <Orders />
    </View>
  );
}
