import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import SerieScreen from "../screens/SerieScreen";
import LoginScreen from "../screens/LoginScreen";
import * as SecureStore from "expo-secure-store";
import DrawerMenu from "../components/DrawerMenu";
const Drawer = createDrawerNavigator();

export default function DrawerRoute() {
  const [token, setToken] = useState(null);

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
      drawerContent={() => <DrawerMenu />}
    >
      {/* {token !== null ? (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Serie" component={SerieScreen} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Login" component={LoginScreen} />
        </>
      )} */}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Serie" component={SerieScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
    </Drawer.Navigator>
  );
}
