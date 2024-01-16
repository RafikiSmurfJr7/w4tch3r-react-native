import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { tmdbApi } from "../../config/axios.conf";
import PeopleCard from "./PeopleCard";

export default function PeopleSearchList({ peopleName }) {
  const requestPage = useRef(1);

  // ! depois corrigir alguns pequenos bugs

  const [peopleData, setPeopleData] = useState([]);

  const [totalPages, setTotalPages] = useState(0);

  const renew = useRef(true);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    requestPage.current = 1;
    renew.current = true;
    requestData();
  }, [peopleName]);

  const requestData = async () => {
    setIsLoading(true);
    if (renew.current == true) {
      renew.current = false;
      await setPeopleData([]);
    }
    try {
      const result = await tmdbApi.get(
        `/search/person?query=${peopleName}&page=${requestPage.current}`
      );
      setPeopleData([...peopleData, ...result.data.results]);
      setTotalPages(result.data.total_pages);
    } catch (error) {
      console.log(error);
    }

    requestPage.current += 1;

    setIsLoading(false);
  };

  return (
    <View>
      {peopleData ? (
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
              job={item.known_for_department}
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
