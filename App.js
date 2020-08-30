import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";

import LoginScreen from "./screens/LoginScreen";
import OrdersScreen from "./screens/OrdersScreen";
import AddOrderScreen from "./screens/AddOrderScreen";
import Cart from "./features/menu/Cart";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App(props) {
  const token = useSelector((state) => state.auth.token);

  return (
    <NavigationContainer>
      {token ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Cart") {
                iconName = "shopping-cart";
              } else if (route.name === "Account") {
                iconName = "user";
              }

              // You can return any component that you like here!
              return <Feather name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Home" component={AddOrderScreen} />

          <Tab.Screen name="Cart" component={Cart} />
          <Tab.Screen name="Account" component={OrdersScreen} />
          {/* <Tab.Screen name="orders" component={OrdersScreen} /> */}
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
