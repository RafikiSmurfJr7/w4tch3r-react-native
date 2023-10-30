import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { Icon, Input, color } from "@rneui/base";
import { IThemeColor } from "../types/interfaces/IThemeColor";
import { ThemeColor } from "../context/ThemeColor";
import { SerieNameFilterInputStyles } from "../types/Styles";
import { SerieNameFilterInputProps } from "../types/Props";

export default function SerieNameFilterInput({
  setSerieName,
  serieName,
}: SerieNameFilterInputProps) {
  const colors: IThemeColor = useContext(ThemeColor);

  const [text, setText]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");

  const styles: SerieNameFilterInputStyles = {
    input: {
      width: 350,
      height: 35,
      backgroundColor: colors.white,
      marginHorizontal: 25,
      borderRadius: 8,
      paddingHorizontal: 10,
    },
    searchIcon: {
      position: "absolute",
      right: 35,
      top: 6,
    },
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Serie name..."
        onChangeText={setText}
        value={text}
        inputMode="search"
        onSubmitEditing={() => setSerieName(text)}
      />
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
