import { View, Text } from "react-native";
import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import SerieScreen from "../screens/SerieScreen";
import LoginScreen from "../screens/LoginScreen";
import * as SecureStore from "expo-secure-store";
const Drawer = createDrawerNavigator();

export default function DrawerRoute() {
  const [token, setToken]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");

  const getIsLogged = async () => await SecureStore.getItemAsync("token");

  const isLogged = getIsLogged();
  //console.log(isLogged);

  async function getToken() {
    let result = await SecureStore.getItemAsync("token");
    await SecureStore.deleteItemAsync("token");
    //console.log(result, "aaaa");
    return result;
  }
  //console.log(getToken(), "a");
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      {/* {getToken() == null ? (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Serie" component={SerieScreen} />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            //initialParams={{ setToken: setToken }}
          />
        </>
      )} */}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Serie" component={SerieScreen} />
    </Drawer.Navigator>
  );
}
