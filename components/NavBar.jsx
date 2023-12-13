import { View, Text, StyleSheet, Button, Image, Pressable } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

export default function NavBar() {
  const navigation = useNavigation();

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
