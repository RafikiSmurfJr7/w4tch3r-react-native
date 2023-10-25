import { View, Text, StyleSheet, Button, Image, Pressable } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NavBarStyles } from "../types/Styles";

export default function NavBar() {
  const navigation: DrawerNavigationProp<ParamListBase> = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.navBarContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Pressable onPress={() => navigation.toggleDrawer()}>
          <Icon name="bars" type="font-awesome" color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles: NavBarStyles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  navBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginHorizontal: 25,
    marginVertical: 15,
  },
  logo: {
    width: 136,
    height: 23.8,
  },
});
