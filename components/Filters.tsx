import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CategoryDropdownFilter from "./CategoryDropdownFilter";
import MovieNameFilterInput from "./MovieNameFilterInput";

export default function Filters() {
  return (
    <>
      <View style={styles.container}>
        <CategoryDropdownFilter />
        <MovieNameFilterInput />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
