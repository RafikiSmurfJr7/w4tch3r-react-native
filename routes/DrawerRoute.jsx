import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import SerieScreen from "../screens/SerieScreen";
import LoginScreen from "../screens/LoginScreen";
import FilmeScreen from '../screens/FilmeScreen';
import FilmeDetailScreen from "../screens/FilmeDetailScreen";
import DrawerMenu from "../components/DrawerMenu";
import * as SecureStore from "expo-secure-store";

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
      <Drawer.Screen name='Filme' component={FilmeScreen}/>
      <Drawer.Screen name='FilmeDetail' component={FilmeDetailScreen}/>
    </Drawer.Navigator>
  );
}
