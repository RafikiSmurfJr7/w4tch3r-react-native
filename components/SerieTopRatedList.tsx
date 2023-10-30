import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { tmdbApi } from "../config/axios.conf";
import SeriesCard from "./SeriesCard";
import { SeriesData } from "../types/Requests";

export default function SerieTopRatedList() {
  // * Teve de se utilizar useRef pois o useState é async e causava problemas a renderizar as series :)
  // ! Continua a não funcionar para ios (iphone)
  //const [seriesData, setSeriesData]: SeriesData[] | any = useState([]);
  //const seriesData: React.MutableRefObject<SeriesData[]> = useRef([]);

  const [seriesData, setSeriesData]: SeriesData[] | any = useState([]);

  const [isLoading, setIsLoading]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const requestPage: React.MutableRefObject<number> = useRef(1);

  useEffect(() => {
    requestData();
  }, []);

  const requestData = async () => {
    setIsLoading(true);

    await tmdbApi
      .get(`/tv/top_rated?page=${requestPage.current}`)
      .then((res) => {
        //console.log(res);
        //seriesData.current = [...seriesData.current, ...res.data.results];
        setSeriesData([...seriesData, ...res.data.results]);
        requestPage.current += 1;
      })
      .catch((err) => console.log());

    setIsLoading(false);
  };

  return (
    <View>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
        data={seriesData}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => (
          <SeriesCard
            title={item.name}
            img={item.poster_path}
            rating={String(item.vote_average.toPrecision(2))}
            year={item.first_air_date.slice(0, 4)}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        onEndReached={requestData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator size={"large"} color="#FFFFFF" />
          ) : null
        }
      />
    </View>
  );
}
