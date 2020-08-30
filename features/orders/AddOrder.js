import React, { useState } from "react";
import { View, Platform, Dimensions, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setAddress, setInstruction, setLocation } from "./ordersSlice";
import { Button, Text, Input, Overlay } from "react-native-elements";
import AddYourLocation from "../../components/AddYourLocation";
import api from "../../api/server";
import { ordersLoading } from "./ordersSlice";

export default function AddOrder() {
  const [showMap, setShowMap] = useState(false);

  const [_address, _setAddress] = useState(null);
  const loading = useSelector(ordersLoading);
  const orderDetails = useSelector((state) => state.orders.orderDetails);

  const dispatch = useDispatch();
  const callback = () => {
    navigation.navigate("orders");
  };

  const getAddress = async (latitude, longitude) => {
    const result = await api.post("/address", { latitude, longitude });
    console.log(result.data);
    _setAddress(result.data);
  };
  const __setLocation = ({ longitude, latitude }) => {
    dispatch(setLocation({ longitude, latitude }));
  };
  return (
    <View>
      <Overlay
        isVisible={showMap}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor="red"
        width="auto"
        height="auto"
        overlayStyle={{
          borderRadius: 40,
          overflow: "hidden",
        }}
      >
        <View style={{ width: "95%" }}>
          <AddYourLocation
            setLocation={__setLocation}
            location={orderDetails.location}
          />
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              buttonStyle={{
                marginTop: 10,
                backgroundColor: "#C4C4C4",
                width: 200,
                borderRadius: 20,
              }}
              titleStyle={{ color: "#251002" }}
              onPress={() => {
                setShowMap(false);
                getAddress(
                  orderDetails.location.latitude,
                  orderDetails.location.longitude
                );
              }}
              title="save"
            />
          </View>
        </View>
      </Overlay>
      <View style={{ margin: 20 }}>
        <Input
          containerStyle={{
            backgroundColor: "#fff",
            borderRadius: 20,
            marginBottom: 10,
          }}
          placeholderTextColor="#251002"
          placeholder="address"
          value={orderDetails.address}
          onChangeText={(t) => dispatch(setAddress({ address: t }))}
        />
        <Input
          containerStyle={{
            backgroundColor: "#fff",
            borderRadius: 20,
            marginBottom: 10,
          }}
          placeholderTextColor="#251002"
          placeholder="instruction"
          value={orderDetails.instruction}
          onChangeText={(t) => dispatch(setInstruction({ instruction: t }))}
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
                backgroundColor: "transparent",
                width: 200,
                borderRadius: 20,
                marginBottom: 10,
                borderColor: "#251002",
              }}
              titleStyle={{ color: "#251002" }}
              onPress={() => setShowMap(true)}
              title="Select a location"
              type="outline"
            />
            <Text style={{ color: "gray" }}>{_address && _address}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
