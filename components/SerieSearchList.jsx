import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { tmdbApi } from "../config/axios.conf";
import { SerieSearchListProps } from "../types/Props";
import { SeriesData } from "../types/Requests";
import SeriesCard from "./SeriesCard";

export default function SerieSearchList({ serieName }) {
  const requestPage = useRef(1);

  // ! depois corrigir alguns pequenos bugs

  const [seriesData, setSeriesData] = useState([]);

  const [totalPages, setTotalPages] = useState(0);

  const renew = useRef(true);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    requestPage.current = 1;
    renew.current = true;
    requestData();
    //  seriesData.current = [];
  }, [serieName]);

  const requestData = async () => {
    setIsLoading(true);
    if (renew.current == true) {
      renew.current = false;
      await setSeriesData([]);
    }
    try {
      const result = await tmdbApi.get(
        `/search/tv?query=${serieName}&page=${requestPage.current}`
      );
      setSeriesData([...seriesData, ...result.data.results]);
      setTotalPages(result.data.total_pages);
    } catch (error) {
      console.log(error);
    }

    requestPage.current += 1;

    setIsLoading(false);
  };

  return (
    <View>
      {seriesData ? (
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          data={seriesData}
          horizontal={false}
          numColumns={2}
          renderItem={({ item }) => (
            <SeriesCard
              id={item.id}
              title={item.name}
              img={item.poster_path}
              rating={String(item.vote_average.toPrecision(2))}
              year={item.first_air_date.slice(0, 4)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          onEndReached={totalPages > 1 ? requestData : null}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator size={"large"} color="#FFFFFF" />
            ) : null
          }
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
