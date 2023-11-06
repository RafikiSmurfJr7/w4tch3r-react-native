import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SerieEpisodeButtonProps } from "../types/Props";

export default function SerieEpisodeButton({
  children,
  handleSerieEpisodeButtonPressed,
}: SerieEpisodeButtonProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => handleSerieEpisodeButtonPressed(children)}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 30,
    height: 25,
    borderRadius: 10,
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
