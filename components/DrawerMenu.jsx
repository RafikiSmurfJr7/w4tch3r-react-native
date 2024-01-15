import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import DrawerLinkItems from "./DrawerLinkItems";
import { AuthContext } from "../context/AuthContext";
import { DrawerContentScrollView } from "@react-navigation/drawer";

export default function DrawerMenu({ navigation }) {
  return (
    <DrawerContentScrollView style={styles.container}>
      <DrawerLinkItems navigation={navigation} navigatePage="Home" icon="home">
        Home
      </DrawerLinkItems>
      <DrawerLinkItems navigation={navigation} navigatePage="Filme" icon="film">
        Filmes
      </DrawerLinkItems>
      <DrawerLinkItems
        navigation={navigation}
        navigatePage="People"
        icon="user"
      >
        People
      </DrawerLinkItems>
      <DrawerLinkItems navigation={navigation} navigatePage="Perfil" icon="pencil">
        Perfil
      </DrawerLinkItems>
      
      <DrawerLinkItems logout navigation={navigation} icon="sign-out">
        Logout
      </DrawerLinkItems>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
});
