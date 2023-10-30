import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SeriesCardProps } from "../types/Props";
import { Icon } from "@rneui/base";
import { SeriesCardStyles } from "../types/Styles";
import { ThemeColor } from "../context/ThemeColor";

export default function SeriesCard({
  title,
  img,
  rating,
  year,
}: SeriesCardProps) {
  const colors = useContext(ThemeColor);

  const styles: SeriesCardStyles = {
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
    <View style={styles.container}>
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
    </View>
  );
}
