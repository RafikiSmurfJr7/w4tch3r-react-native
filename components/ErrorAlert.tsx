import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import { ErrorAlertProps } from "../types/Props";

export default function ErrorAlert({ children }: ErrorAlertProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{children}</Text>
      <Icon name="bug" type="font-awesome" color="#A61C1C" size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E48080",
    borderWidth: 2,
    borderColor: "#A61C1C",
    borderRadius: 5,
    width: 250,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  errorMessage: {
    color: "#B41212",
    marginHorizontal: 10,
  },
});
