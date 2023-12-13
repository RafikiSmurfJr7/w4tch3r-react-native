import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerLinkItems from "./DrawerLinkItems";

export default function DrawerMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <DrawerLinkItems navigation={navigation} navigatePage="Home" icon="home">
        Home
      </DrawerLinkItems>
      <DrawerLinkItems
        navigation={navigation}
        navigatePage="Login"
        icon="sign-in"
      >
        Login
      </DrawerLinkItems>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
});
