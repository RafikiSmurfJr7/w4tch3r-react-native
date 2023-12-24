import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function DrawerLinkItems({
  children,
  icon,
  navigatePage = false,
  logout = false,
}) {
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext);
  // ! alterar futuramente
  return (
    <Pressable
      style={styles.container}
      onPress={
        navigatePage
          ? () => navigation.navigate(navigatePage)
          : logout
          ? () => {
              signOut();
            }
          : null
      }
    >
      <Icon name={icon} type="font-awesome" color="#021F3A" />
      <Text style={styles.linkText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#021F3A",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  linkText: {
    color: "#021F3A",
    fontWeight: "bold",
    marginHorizontal: 8,
  },
});
