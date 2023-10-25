import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { tmdbApi } from "../config/axios.conf";

export default function SerieList() {
  const [seriesData, setSeriesData] = useState();

  useEffect(() => {
    tmdbApi
      .get("/discover/tv")
      .then((res) => {
        setSeriesData(res.data.results);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View>
      <FlatList
        data={seriesData}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
