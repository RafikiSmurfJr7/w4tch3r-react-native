import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeColor } from "../context/ThemeColor";
import SwitchSelector from "react-native-switch-selector";
import { tmdbApi } from "../config/axios.conf";

const FavoriteFilmScreen = ({ navigation }) => {
  const { blue, text, white } = useThemeColor();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWatchLater, setShowWatchLater] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]); 
  const [onAirSeries, setOnAirSeries] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      } finally {
        setLoading(false);
      }
    };

    const loadPopularMovies = async () => {
      try {
        const response = await tmdbApi.get('/movie/popular');
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error('Erro ao carregar filmes populares:', error);
      }
    };

    const loadOnAirSeries = async () => {
      try {
        const response = await tmdbApi.get('/tv/on_the_air');
        setOnAirSeries(response.data.results);
      } catch (error) {
        console.error('Erro ao carregar séries em exibição:', error);
      }
    };

    loadFavorites();
    loadPopularMovies();
    loadOnAirSeries();
  }, []);

  const handleToggleWatchLater = () => {
    setShowWatchLater(!showWatchLater);
  };

  const removeFromFavorites = async (id) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Erro ao atualizar favoritos no AsyncStorage:', error);
    }

  
    const removedSerie = onAirSeries.find((serie) => serie.id === id);
    if (removedSerie) {
      const updatedOnAirSeries = onAirSeries.filter((serie) => serie.id !== id);
      setOnAirSeries(updatedOnAirSeries);
    }
  };

  const switchOptions = [
    { label: "Favoritos", value: false },
    { label: "Assistir Mais Tarde", value: true },
  ];

  const filteredFavorites = showWatchLater
    ? favorites.filter((item) => item.watchLater).concat(onAirSeries)
    : favorites.concat(onAirSeries);

  const getFavoriteDetails = (id) => {
    const movie = popularMovies.find((movie) => movie.id === id);
    if (movie) {
      return {
        type: 'movie',
        details: movie,
      };
    }

    const favoriteSerie = favorites.find((fav) => fav.id === id);
    if (favoriteSerie) {
      return {
        type: 'serie',
        details: favoriteSerie,
      };
    }

    const onAirSerie = onAirSeries.find((serie) => serie.id === id);
    if (onAirSerie) {
      return {
        type: 'serie',
        details: onAirSerie,
      };
    }

    return null;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: blue,
      padding: 16,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    switchSelector: {
      marginRight: 8,
      borderRadius: 10,
      overflow: 'hidden',
    },
    listHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 8,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: white,
    },
    clockIcon: {
      marginLeft: 8,
      color: 'orange', 
    },
    starIcon: {
      marginLeft: 8,
      color: 'yellow', 
    },
  });

  const navigateToDetails = (type, id) => {
 
    const detailsScreen = type === 'movie' ? 'FilmeDetail' : 'SerieDetail';

    navigation.navigate(detailsScreen, { id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <SwitchSelector
          initial={showWatchLater ? 1 : 0}
          textColor={text}
          selectedColor={white}
          buttonColor={blue}
          borderColor={white}
          valuePadding={2}
          hasPadding
          onPress={(value) => setShowWatchLater(value)}
          options={switchOptions}
          style={styles.switchSelector}
        />
      </View>

      <View style={styles.listHeader}>
        {showWatchLater ? (
          <Icon name="time" size={17} color={white} style={styles.clockIcon} />
        ) : (
          <Icon name="star" size={24} color={white} style={styles.starIcon} />
        )}
        <Text style={styles.headerText}>
          {showWatchLater ? "Assistir Mais Tarde" : "Filmes e Séries Favoritas"}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={white} />
      ) : (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const favoriteDetails = getFavoriteDetails(item.id);

            if (favoriteDetails) {
              const { type, details } = favoriteDetails;
              return (
                <TouchableOpacity onPress={() => navigateToDetails(type, details.id)}>
                  <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'center' }}>
                    {details.poster_path ? (
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
                        }}
                        style={{ width: 50, height: 75, borderRadius: 5, marginRight: 8 }}
                      />
                    ) : (
                      <View style={{ width: 50, height: 75, backgroundColor: 'gray', borderRadius: 5, marginRight: 8 }} />
                    )}
                    <Text style={{ color: white, flex: 1 }}>{details.title || details.name}</Text>
                    <TouchableOpacity onPress={() => removeFromFavorites(item.id)}>
                      <Icon name={showWatchLater ? "time" : "star"} size={24} style={showWatchLater ? styles.clockIcon : styles.starIcon} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }

            return null;
          }}
        />
      )}
    </View>
  );
};

export default FavoriteFilmScreen;
