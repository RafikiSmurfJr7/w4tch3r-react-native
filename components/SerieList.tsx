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
import { SerieListProps } from "../types/Props";

export default function SerieList({ serieName }: SerieListProps) {
  // * Teve de se utilizar useRef pois o useState é async e causava problemas a renderizar as series :)
  // ! Continua a não funcionar para ios (iphone)
  //const [seriesData, setSeriesData]: SeriesData[] | any = useState([]);
  const seriesData: React.MutableRefObject<SeriesData[]> = useRef([]);

  const [isLoading, setIsLoading]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const requestPage: React.MutableRefObject<number> = useRef(1);

  useEffect(() => {
    if (serieName != "") {
      seriesData.current = [];
      requestPage.current = 1;

      requestSearchData();
    } else {
      seriesData.current = [];
      requestPage.current = 1;
      requestData();
    }
  }, [serieName]);

  const requestSearchData = async () => {
    setIsLoading(true);

    await tmdbApi
      .get(`/search/tv?query=${serieName}&page=${requestPage.current}`)
      .then((res) => {
        //console.log(res);
        seriesData.current = [...seriesData.current, ...res.data.results];

        requestPage.current += 1;
      })
      .catch((err) => console.log());

    setIsLoading(false);
  };

  const requestData = async () => {
    setIsLoading(true);

    await tmdbApi
      .get(`/tv/top_rated?page=${requestPage.current}`)
      .then((res) => {
        //console.log(res);

        // * Como era feito antes
        //setSeriesData([...seriesData, ...res.data.results]);

        seriesData.current = [...seriesData.current, ...res.data.results];
        requestPage.current += 1;
      })
      .catch((err) => console.log());

    setIsLoading(false);
  };

  return (
    <View>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
        data={seriesData.current}
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
        onEndReached={serieName != "" ? requestSearchData : requestData}
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
