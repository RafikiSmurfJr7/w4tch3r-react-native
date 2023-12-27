import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  import MoviesCard from "./MoviesCard";
  import { tmdbApi } from "../../config/axios.conf";
  
  
  export default function MoviesPopularList() {
    const [moviesData, setMoviesData] = useState([]);
  
    const [isLoading, setIsLoading] = useState(false);
  
    const requestPage = useRef(1);
  
    useEffect(() => {
      requestData();
    }, []);
  
    const requestData = async () => {
      setIsLoading(true);
  
      await tmdbApi
        .get(`/movie/popular?page=${requestPage.current}`)
        .then((res) => {
          setMoviesData([...moviesData, ...res.data.results]);
          requestPage.current += 1;
        })
        .catch((err) => console.log(err));
  
      setIsLoading(false);
    };
    
  
    return (
      <View>
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          data={moviesData}
          horizontal={false}
          numColumns={2}
          renderItem={({ item }) => (
            <MoviesCard
              id={item.id}
              title={item.title}
              img={item.poster_path}
              rating={String(item.vote_average.toPrecision(2))}
              year={item.release_date.slice(0, 4)}
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
  