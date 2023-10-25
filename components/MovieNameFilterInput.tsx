import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useContext } from "react";
import { Icon, Input } from "@rneui/base";
import { IThemeColor } from "../types/interfaces/IThemeColor";
import { ThemeColor } from "../context/ThemeColor";
import { MovieNameFilterInputStyles } from "../types/Styles";

export default function MovieNameFilterInput() {
  const colors: IThemeColor = useContext(ThemeColor);

  const styles: MovieNameFilterInputStyles = {
    input: {
      width: 300,
      height: 35,
      backgroundColor: "white",
      marginHorizontal: 25,
      borderRadius: 8,
      paddingHorizontal: 10,
    },
    searchIcon: {
      position: "absolute",
      right: 35,
      top: 5,
    },
  };

  return (
    <View>
      <TextInput style={styles.input} placeholder="Serie name..." />
      <View style={styles.searchIcon}>
        <Icon
          name="search"
          type="font-awesome"
          color={colors.greyDark}
          size={20}
        />
      </View>
    </View>
  );
}
