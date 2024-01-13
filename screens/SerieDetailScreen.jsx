import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Iframe } from "@bounceapp/iframe";
import { useRoute } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SerieSeasonEpisodeButton from "../components/series/SerieSeasonEpisodeButton";
import SerieEpisodeButton from "../components/series/SerieEpisodeButton";
import { tmdbApi } from "../config/axios.conf";

const SerieDetailScreen = ({ navigation }) => {
  const route = useRoute();

  const [serieData, setSerieData] = useState();
  const [season, setSeason] = useState(1);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [episodesArray, setEpisodesArray] = useState([0]);
  const [episode, setEpisode] = useState(1);
  const [isWatchLaterClicked, setIsWatchLaterClicked] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setShowEpisodes(false);
    tmdbApi
      .get(`/tv/${route.params.id}`)
      .then((res) => {
        setSerieData(res.data);
        checkIsWatchLater(res.data.id);
      })
      .catch((err) => {});
  }, [route.params.id]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  const isFavorite = favorites.some(fav => fav.id === serieData?.id);

  const toggleFavorite = async () => {
    try {
      let updatedFavorites = [...favorites];

      const isAlreadyFavorite = updatedFavorites.some(fav => fav.id === serieData.id);

      if (isAlreadyFavorite) {
        updatedFavorites = updatedFavorites.filter(fav => fav.id !== serieData.id);
      } else {
        updatedFavorites.push({
          id: serieData.id,
          name: serieData.name,
          poster_path: serieData.poster_path,
          vote_average: serieData.vote_average,
          // Adicione outras informações relevantes
        });
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error manipulating favorites:', error);
    }
  };

  const checkIsWatchLater = async (id) => {
    try {
      const storedWatchLater = await AsyncStorage.getItem('watchLaterSeries');
      const watchLaterList = storedWatchLater ? JSON.parse(storedWatchLater) : [];
      const isAlreadyInWatchLater = watchLaterList.some(item => item.id === id);
      setIsWatchLaterClicked(isAlreadyInWatchLater);
    } catch (error) {
      console.error('Error checking if series is in "Watch Later":', error);
    }
  };

  const handleSerieButtonPressed = (seasonNumber) => {
    setShowEpisodes(false);
    setSeason(parseInt(seasonNumber));
    setEpisodesArray([]);
    let episodeCount = -1;
    if (serieData.seasons[0].season_number === 0) {
      episodeCount = 0;
    }
    let episodeNumbers = 0;
    if (serieData.seasons[parseInt(seasonNumber) + episodeCount].episode_count) {
      episodeNumbers =
        serieData.seasons[parseInt(seasonNumber) + episodeCount].episode_count;
    }
    for (let i = 1; i <= episodeNumbers; i++) {
      setEpisodesArray((prevArray) => [...prevArray, i]);
    }
    episodeNumbers = 0;
    setShowEpisodes(true);
  };

  const handleSerieEpisodeButtonPressed = (episodeNumber) => {
    setEpisode(parseInt(episodeNumber));
  };

  const handleWatchLater = async () => {
    try {
      const storedWatchLater = await AsyncStorage.getItem('watchLaterSeries');
      let watchLaterList = storedWatchLater ? JSON.parse(storedWatchLater) : [];

      const isAlreadyInWatchLater = watchLaterList.some(item => item.id === serieData.id);

      if (isAlreadyInWatchLater) {
        watchLaterList = watchLaterList.filter(item => item.id !== serieData.id);
      } else {
        watchLaterList.push({
          id: serieData.id,
          name: serieData.name,
          poster_path: serieData.poster_path,
          vote_average: serieData.vote_average,
          // Adicione outras informações relevantes
        });
      }

      await AsyncStorage.setItem('watchLaterSeries', JSON.stringify(watchLaterList));
      checkIsWatchLater(serieData.id);
    } catch (error) {
      console.error('Error manipulating "Watch Later" for series:', error);
    }
  };

  const customStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 2,
      height: "100%",
    },
    imageTransparent: {
      flex: 1,
      height: "100%",
    },
    starContainer: {
      position: 'absolute',
      top: 70,
      right: 40,
      zIndex: 1,
    },
    serieInfoContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 30,
      flexWrap: "wrap",
    },
    poster: {
      width: 117,
      height: 176,
      borderRadius: 10,
    },
    serieInfoText: {
      color: "white",
      fontWeight: "bold",
    },
    serieDescriptionContainer: {
      marginTop: 25,
      marginHorizontal: 30,
    },
    seriePlayerContainer: {
      flex: 1,
      backgroundColor: "#021F3A",
    },
    seriePlayerTitleContainer: {
      justifyContent: "flex-start",
      alignItems: "center",
    },
    serieWatchTitle: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },
    seriePlayerSeasonsContainer: {
      marginTop: 10,
      marginHorizontal: 25,
      flex: 1,
    },
    seriePlayerSeasonsTitle: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    seriePlayerSeasonsButtonsContainer: {
      marginTop: 20,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    containerWebView: {
      flex: 1,
      marginTop: 16,
      height: 200,
    },
    seriePlayerEpisodesButtonsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    seriePlayerEpisodesTitle: {
      color: "white",
    },
  });

  return (
    <View style={customStyles.container}>
      {serieData ? (
        <>
          <ImageBackground
            source={{
              uri: `https://image.tmdb.org/t/p/w500${serieData.backdrop_path}`,
            }}
            resizeMode="cover"
            style={customStyles.image}
          >
            <ImageBackground
              source={require("../assets/angryimg.png")}
              resizeMode="cover"
              style={customStyles.imageTransparent}
            >
              <NavBar />
              <TouchableOpacity
                onPress={toggleFavorite}
                style={customStyles.starContainer}
              >
                <Icon
                  name={isFavorite ? 'star' : 'star-outline'}
                  size={30}
                  color="yellow"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleWatchLater}
                style={{ position: 'absolute', top: 72, right: 80, zIndex: 1 }}
              >
                <Icon name="time" size={30} color={isWatchLaterClicked ? 'orange' : 'white'} />
              </TouchableOpacity>
              <View style={customStyles.serieInfoContainer}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${serieData.poster_path}`,
                  }}
                  style={customStyles.poster}
                />
                <View style={{ alignSelf: 'center', width: 150 }}>
                  <Text style={customStyles.serieInfoText}>{serieData.name}</Text>
                  <Text style={customStyles.serieInfoText}>
                    ({serieData.first_air_date.slice(0, 4)})
                  </Text>
                  <Text style={customStyles.serieInfoText}>
                    Rating: {serieData.vote_average.toPrecision(2) * 10}%
                  </Text>
                  <Text style={customStyles.serieInfoText}>
                    Genre:{' '}
                    {serieData.genres.map((item, i) =>
                      i < serieData.genres.length - 1
                        ? `  ${item.name} ,`
                        : `  ${item.name} `
                    )}{' '}
                  </Text>
                  <Text style={customStyles.serieInfoText}>
                    Created by:{' '}
                    {serieData.created_by.map((item, i) =>
                      i < serieData.created_by.length - 1
                        ? `  ${item.name} ,`
                        : `  ${item.name} `
                    )}{' '}
                  </Text>
                </View>
              </View>
              <View style={customStyles.serieDescriptionContainer}>
                <Text style={customStyles.serieInfoText}>{serieData.overview}</Text>
              </View>
            </ImageBackground>
          </ImageBackground>
          <ScrollView style={customStyles.seriePlayerContainer}>
            <View style={customStyles.seriePlayerTitleContainer}>
              <Text style={customStyles.serieWatchTitle}>Watch</Text>
            </View>
            <View style={customStyles.seriePlayerSeasonsContainer}>
              <Text style={customStyles.seriePlayerSeasonsTitle}>Seasons</Text>
              <View style={customStyles.seriePlayerSeasonsButtonsContainer}>
                {serieData.seasons.map((item, i) =>
                  item.season_number === 0 ? null : (
                    <SerieSeasonEpisodeButton
                      handleSerieButtonPressed={handleSerieButtonPressed}
                      key={i}
                    >
                      {String(item.season_number)}
                    </SerieSeasonEpisodeButton>
                  )
                )}
              </View>
              {showEpisodes ? (
                <>
                  <Text style={customStyles.seriePlayerEpisodesTitle}>Episodes</Text>
                  <View style={customStyles.seriePlayerEpisodesButtonsContainer}>
                    {episodesArray.map((item, i) => (
                      <SerieEpisodeButton
                        handleSerieEpisodeButtonPressed={
                          handleSerieEpisodeButtonPressed
                        }
                        key={i}
                      >
                        {String(item)}
                      </SerieEpisodeButton>
                    ))}
                  </View>
                </>
              ) : null}
              <Iframe
                style={customStyles.containerWebView}
                uri={`https://vidsrc.me/embed/tv?tmdb=${serieData.id}&season=${season}&episode=${episode}&color=15006D`}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={{ flex: 1, backgroundColor: "#021F3A" }}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
    </View>
  );
}

export default SerieDetailScreen;