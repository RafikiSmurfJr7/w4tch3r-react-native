import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { Icon } from "@rneui/base";
import { IThemeColor } from "../types/interfaces/IThemeColor";
import { ThemeColor } from "../context/ThemeColor";
import { CategoryDropdownFilterStyles } from "../types/Styles";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function CategoryDropdownFilter() {
  const [isDropdownOpen, updateIsDropdownOpen]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const colors: IThemeColor = useContext(ThemeColor);

  const styles: CategoryDropdownFilterStyles = {
    container: {
      marginStart: 20,
    },
    dropDownContainer: {
      backgroundColor: colors.white,
      position: "absolute",
      top: 30,
      left: 25,
      width: 200,
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => updateIsDropdownOpen((prev: boolean) => !prev)}>
        {isDropdownOpen ? (
          <Icon
            reverse
            name="chevron-up"
            type="font-awesome"
            reverseColor={colors.blue}
            color={colors.white}
            size={15}
          />
        ) : (
          <Icon
            reverse
            name="chevron-down"
            type="font-awesome"
            reverseColor={colors.blue}
            color={colors.white}
            size={15}
          />
        )}
      </Pressable>
      {isDropdownOpen ? (
        <View style={styles.dropDownContainer}>
          <Text>Action</Text>
          <Text>Comedy</Text>
          <Text>Horror</Text>
          <Text>Fiction</Text>
          <Text>Syfy</Text>
          <Text>Fantasy</Text>
          <Text>Mystery</Text>
          <Text>Romance</Text>
          <Text>Thriller</Text>
          <Text>Drama</Text>
        </View>
      ) : null}
    </View>
  );
}
