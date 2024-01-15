import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/NavBar';
import { tmdbApi } from '../config/axios.conf';

const CategoryScreen = () => {
  const navigation = useNavigation();

  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [seriesByCategory, setSeriesByCategory] = useState({});

  useEffect(() => {
    const fetchDataByCategory = async (category, isMovie) => {
      try {
        const mediaType = isMovie ? 'movie' : 'tv';
        const response = await tmdbApi.get(`/discover/${mediaType}`, {
          params: {
            with_genres: category.id,
          },
        });

        if (isMovie) {
          setMoviesByCategory((prevMoviesByCategory) => ({
            ...prevMoviesByCategory,
            [category.name]: response.data.results,
          }));
        } else {
          setSeriesByCategory((prevSeriesByCategory) => ({
            ...prevSeriesByCategory,
            [category.name]: response.data.results,
          }));
        }
      } catch (error) {
        console.error(`Error fetching ${isMovie ? 'movies' : 'series'} by category:`, error);
      }
    };

    const genres = [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' },
      { id: 99, name: 'Documentary' },
      { id: 18, name: 'Drama' },
      { id: 10751, name: 'Family' },
      { id: 14, name: 'Fantasy' },
      { id: 36, name: 'History' },
      { id: 27, name: 'Horror' },
      { id: 10402, name: 'Music' },
      { id: 9648, name: 'Mystery' },
      { id: 10749, name: 'Romance' },
      { id: 878, name: 'Science Fiction' },
      { id: 10770, name: 'TV Movie' },
      { id: 53, name: 'Thriller' },
      { id: 10752, name: 'War' },
      { id: 37, name: 'Western' },
    ];

    genres.forEach((genre) => {
        fetchDataByCategory(genre, true); // Busca filmes
        fetchDataByCategory(genre, false); // Busca séries
      });
    }, []);
  
    const handleMediaPress = (mediaId, isMovie) => {
      const screenName = isMovie ? 'FilmeDetail' : 'SerieDetail';
      navigation.navigate(screenName, { id: mediaId });
    };
  
    return (
      <View style={styles.container}>
        <NavBar />
        <ScrollView style={styles.content}>
          {Object.entries(moviesByCategory).map(([category, movies]) => (
            <View key={category}>
              <Text style={styles.categoryTitle}>{category} Movies</Text>
              <View style={styles.categoryContainer}>
                {movies.map((movie) => (
                  <TouchableOpacity
                    key={movie.id}
                    style={styles.mediaContainer}
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
            </View>
          ))}
          {Object.entries(seriesByCategory).map(([category, series]) => (
            <View key={category}>
              <Text style={styles.categoryTitle}>{category} Series</Text>
              <View style={styles.categoryContainer}>
                {series.map((serie) => (
                  <TouchableOpacity
                    key={serie.id}
                    style={styles.mediaContainer}
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
    content: {
      flex: 1,
      marginTop: 80,
      marginHorizontal: 20,
    },
    categoryTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    categoryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    mediaContainer: {
      width: '48%',
      marginBottom: 20,
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
