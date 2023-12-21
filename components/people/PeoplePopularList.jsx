import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  import PeopleCard from "./PeopleCard";
  import { tmdbApi } from "../../config/axios.conf";
  
  
  export default function PeoplePopularList() {
    const [peopleData, setPeopleData] = useState([]);
  
    const [isLoading, setIsLoading] = useState(false);
  
    const requestPage = useRef(1);
  
    useEffect(() => {
      requestData();
    }, []);
  
    const requestData = async () => {
      setIsLoading(true);
  
      await tmdbApi
        .get(`/person/popular?page=${requestPage.current}`)
        .then((res) => {
          setPeopleData([...peopleData, ...res.data.results]);
          requestPage.current += 1;
        })
        .catch((err) => console.log(err));
  
      setIsLoading(false);
    };
  
    return (
      <View>
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          data={peopleData}
          horizontal={false}
          numColumns={2}
          renderItem={({ item }) => (
            <PeopleCard
              id={item.id}
              name={item.name}
              img={item.profile_path}
              job={String(item.known_for_department)}
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
  