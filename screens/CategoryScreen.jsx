import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import NavBar from '../components/NavBar';
import { tmdbApi } from '../config/axios.conf';
import { useThemeColor } from "../context/ThemeColor";

const CategoryScreen = () => {
  const navigation = useNavigation();
  const { blue, white, text } = useThemeColor();

  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [seriesByCategory, setSeriesByCategory] = useState({});
  const [showMovies, setShowMovies] = useState(true);
  const [genres, setGenres] = useState([]);

  const fetchDataByCategory = async (category, isMovie) => {
    try {
      const mediaType = isMovie ? 'movie' : 'tv';
      const response = await tmdbApi.get(`/discover/${mediaType}`, {
        params: {
          with_genres: category.id,
        },
      });

      return response.data.results;
    } catch (error) {
      console.error(`Error fetching ${isMovie ? 'movies' : 'series'} by category:`, error);
      return [];
    }
  };

  const fetchAllCategories = async () => {
    try {
      const genreRequests = genres.map(async (genre) => ({
        [genre.name]: {
          movies: await fetchDataByCategory(genre, true),
          series: await fetchDataByCategory(genre, false),
        },
      }));

      const results = await Promise.all(genreRequests);
      const moviesResult = results.reduce((acc, cur) => ({ ...acc, ...cur }), {});
      setMoviesByCategory(moviesResult);
      const seriesResult = results.reduce((acc, cur) => ({ ...acc, ...cur }), {});
      setSeriesByCategory(seriesResult);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await tmdbApi.get('/genre/movie/list');
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchAllCategories();
    }, [genres])
  );

  const handleMediaPress = (mediaId, isMovie) => {
    const screenName = isMovie ? 'FilmeDetail' : 'SerieDetail';
    navigation.navigate(screenName, { id: mediaId });
  };

  const handleToggleMedia = () => {
    setShowMovies(!showMovies);
  };

  const switchOptions = [
    { label: 'Filmes', value: true },
    { label: 'Séries', value: false },
  ];

  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.switchContainer}>
        <SwitchSelector
          initial={showMovies ? 0 : 1}
          onPress={handleToggleMedia}
          textColor={text}
          selectedColor={white}
          buttonColor={blue}
          borderColor={blue}
          hasPadding
          options={switchOptions}
          style={styles.switchSelector}
        />
      </View>
      <ScrollView style={styles.content}>
        {showMovies
          ? Object.entries(moviesByCategory).map(([category, { movies }]) => (
              <View key={category}>
                <Text style={styles.categoryTitle}>{category} Movies</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.mediaContainer}>
                    {movies.map((movie) => (
                      <TouchableOpacity
                        key={movie.id}
                        style={styles.mediaItemContainer}
                        onPress={() => handleMediaPress(movie.id, true)}
                      >
                        <Image
                          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                          style={styles.mediaImage}
                        />
                        <Text style={styles.mediaTitle}>{movie.title}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            ))
          : Object.entries(seriesByCategory).map(([category, { series }]) => (
              <View key={category}>
                <Text style={styles.categoryTitle}>{category} Series</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.mediaContainer}>
                    {series.map((serie) => (
                      <TouchableOpacity
                        key={serie.id}
                        style={styles.mediaItemContainer}
                        onPress={() => handleMediaPress(serie.id, false)}
                      >
                        <Image
                          source={{ uri: `https://image.tmdb.org/t/p/w500${serie.poster_path}` }}
                          style={styles.mediaImage}
                        />
                        <Text style={styles.mediaTitle}>{serie.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021F3A',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  switchSelector: {
    width: '80%',
  },
  content: {
    flex: 1,
    marginHorizontal: 20,
  },
  categoryTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  mediaContainer: {
    flexDirection: 'row',
  },
  mediaItemContainer: {
    width: 150,
    marginRight: 10,
  },
  mediaImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  mediaTitle: {
    color: 'white',
    marginTop: 5,
  },
});

export default CategoryScreen;
