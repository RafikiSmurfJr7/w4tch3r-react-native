import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Icon } from "@rneui/base";
import { ThemeColor } from "../context/ThemeColor";
import { useNavigation } from "@react-navigation/native";

export default function SeriesCard({
  id,
  title,
  img,
  rating,
  year,
}) {
  const colors = useContext(ThemeColor);

  const navigation = useNavigation();

  const styles = {
    container: {
      backgroundColor: colors.white,
      margin: 10,
      width: 127 + 30,
      borderRadius: 15,
    },
    img: {
      width: 127 + 30,
      height: 179 + 30,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    textContainer: {
      width: 127 + 30,
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
      marginTop: 7,
      marginBottom: 7,
    },
    titleContainer: {
      flexWrap: "nowrap",
      width: "75%",
      paddingStart: 5,
    },
    ratingContainer: {
      flexDirection: "row",
      paddingEnd: 5,
    },
    title: {
      fontWeight: "bold",
    },
    rating: {
      fontWeight: "bold",
    },
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("Serie", { id: id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${img}` }}
        style={styles.img}
      />
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text>({year})</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>
            {rating}
            <Icon name="star" type="font-awesome" color="#F7D730" size={12} />
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
