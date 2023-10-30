import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CategoryDropdownFilter from "./CategoryDropdownFilter";
import SerieNameFilterInput from "./SerieNameFilterInput";
import { FiltersProps } from "../types/Props";

export default function Filters({ setSerieName, serieName }: FiltersProps) {
  return (
    <>
      <View style={styles.container}>
        {/* <CategoryDropdownFilter /> */}
        <SerieNameFilterInput
          setSerieName={setSerieName}
          serieName={serieName}
        />
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
