import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SerieNameFilterInput from "./SerieNameFilterInput";

export default function Filters({ setSerieName, serieName }) {
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
