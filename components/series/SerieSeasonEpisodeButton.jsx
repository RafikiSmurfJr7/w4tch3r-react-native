import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SerieSeasonEpisodeButton({
  children,
  handleSerieButtonPressed,
}) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => handleSerieButtonPressed(children)}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "900",
  },
});
