import { View, Text } from "react-native";
import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import SerieScreen from "../screens/SerieScreen";
import LoginScreen from "../screens/LoginScreen";

const Drawer = createDrawerNavigator();

export default function DrawerRoute() {
  const [token, setToken]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Serie" component={SerieScreen} />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        //initialParams={{ setToken: setToken }}
      />
    </Drawer.Navigator>
  );
}
