import { View, Text, StyleSheet, Button, Image, Pressable } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  logo: {
    width: 136,
    height: 23.8,
  },
});
