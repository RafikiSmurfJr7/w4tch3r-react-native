import React, { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeColor } from "../../context/ThemeColor";
import { useNavigation } from "@react-navigation/native";

export default function PeopleCard({ id, name, img, job }) {
  const colors = useContext(ThemeColor);
  const navigation = useNavigation();
  const [isLongPress, setIsLongPress] = useState(false);

  const styles = StyleSheet.create({
    container: {
      margin: 10,
      width: 127 + 30,
      borderRadius: 15,
      overflow: "hidden",
    },
    img: {
      width: 127 + 30,
      height: 179 + 30,
      borderRadius: 15,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.3)", 
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      alignItems: "center",
    },
    title: {
      fontWeight: "bold",
      color: colors.white,
    },
  });

  const handlePress = () => {
    navigation.navigate("PeopleDetail", { id: id });
  };

  const handleLongPress = () => {
    setIsLongPress(true);
  };

  const handlePressOut = () => {
    setIsLongPress(false);
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${img}` }}
        style={[styles.img, isLongPress && { opacity: 0.7 }]}
      />
      {isLongPress && (
        <View style={styles.overlay}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.title}>({job})</Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}
