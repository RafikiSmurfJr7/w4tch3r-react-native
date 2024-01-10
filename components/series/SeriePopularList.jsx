import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { tmdbApi } from "../../config/axios.conf";
import SeriesCard from "./SeriesCard";

export default function SeriePopularList() {
    const [seriesData, setSeriesData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const requestPage = useRef(1);

    useEffect(() => {
        requestData();
    }, []);

    const requestData = async () => {
        setIsLoading(true);

        await tmdbApi
            .get(`/tv/popular?page=${requestPage.current}`)
            .then((res) => {
                //console.log(res);
                //seriesData.current = [...seriesData.current, ...res.data.results];
                setSeriesData([...seriesData, ...res.data.results]);
                requestPage.current += 1;
            })
            .catch((err) => console.log(err));

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
                        id={item.id}
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
