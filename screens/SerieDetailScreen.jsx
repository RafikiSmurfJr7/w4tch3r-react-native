import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import NavBar from '../components/NavBar';
import { tmdbApi } from '../config/axios.conf';
import SerieSeasonEpisodeButton from '../components/series/SerieSeasonEpisodeButton';
import { ScrollView } from 'react-native-gesture-handler';
import { Iframe } from '@bounceapp/iframe';
import SerieEpisodeButton from '../components/series/SerieEpisodeButton';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SerieDetailScreen() {
  const route = useRoute();

  const [serieData, setSerieData] = useState();
  const [season, setSeason] = useState(1);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [episodesArray, setEpisodesArray] = useState([0]);
  const [episode, setEpisode] = useState(1);
  const [isFavorito, setIsFavorito] = useState(false);

  useEffect(() => {
    setShowEpisodes(false);
    tmdbApi
      .get(`/tv/${route.params.id}`)
      .then((res) => {
        setSerieData(res.data);
      })
      .catch((err) => {});
  }, [route.params.id]);

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

  const toggleFavorite = () => {
    
    setIsFavorito(!isFavorito);
  };

  return (
    <View style={styles.container}>
      {serieData ? (
        <>
          <ImageBackground
            source={{
              uri: `https://image.tmdb.org/t/p/w500${serieData.backdrop_path}`,
            }}
            resizeMode="cover"
            style={styles.image}
          >
            <ImageBackground
              source={require('../assets/angryimg.png')}
              resizeMode="cover"
              style={styles.imageTransparent}
            >
              <TouchableOpacity
                style={styles.starContainer}
                onPress={toggleFavorite}
              >
                <Icon
                  name={isFavorito ? 'star' : 'star-outline'}
                  size={30}
                  color="yellow"
                />
              </TouchableOpacity>
              <NavBar />
              <View style={styles.serieInfoContainer}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${serieData.poster_path}`,
                  }}
                  style={styles.poster}
                />
                <View style={{ alignSelf: 'center', width: 150 }}>
                  <Text style={styles.serieInfoText}>{serieData.name}</Text>
                  <Text style={styles.serieInfoText}>
                    ({serieData.first_air_date.slice(0, 4)})
                  </Text>
                  <Text style={styles.serieInfoText}>
                    Rating: {serieData.vote_average.toPrecision(2) * 10}%
                  </Text>
                  <Text style={styles.serieInfoText}>
                    Genre:{' '}
                    {serieData.genres.map((item, i) =>
                      i < serieData.genres.length - 1
                        ? `  ${item.name} ,`
                        : `  ${item.name} `
                    )}{' '}
                  </Text>
                  <Text style={styles.serieInfoText}>
                    Created by:{' '}
                    {serieData.created_by.map((item, i) =>
                      i < serieData.created_by.length - 1
                        ? `  ${item.name} ,`
                        : `  ${item.name} `
                    )}{' '}
                  </Text>
                </View>
              </View>
              <View style={styles.serieDescriptionContainer}>
                <Text style={styles.serieInfoText}>{serieData.overview}</Text>
              </View>
            </ImageBackground>
          </ImageBackground>
          <ScrollView style={styles.seriePlayerContainer}>
            <View style={styles.seriePlayerTitleContainer}>
              <Text style={styles.serieWatchTitle}>Watch</Text>
            </View>
            <View style={styles.seriePlayerSeasonsContainer}>
              <Text style={styles.seriePlayerSeasonsTitle}>Seasons</Text>
              <View style={styles.seriePlayerSeasonsButtonsContainer}>
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
                  <Text style={styles.seriePlayerEpisodesTitle}>Episodes</Text>
                  <View style={styles.seriePlayerEpisodesButtonsContainer}>
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
                style={styles.containerWebView}
                uri={`https://vidsrc.me/embed/tv?tmdb=${serieData.id}&season=${season}&episode=${episode}&color=15006D`}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={{ flex: 1, backgroundColor: '#021F3A' }}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 2,
    height: '100%',
  },
  imageTransparent: {
    flex: 1,
    height: '100%',
  },
  serieInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
    flexWrap: 'wrap',
  },
  poster: {
    width: 117,
    height: 176,
    borderRadius: 10,
  },
  serieInfoText: {
    color: 'white',
    fontWeight: 'bold',
  },
  serieDescriptionContainer: {
    marginTop: 25,
    marginHorizontal: 30,
  },
  seriePlayerContainer: {
    flex: 1,
    backgroundColor: '#021F3A',
  },
  seriePlayerTitleContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  serieWatchTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  seriePlayerSeasonsContainer: {
    marginTop: 10,
    marginHorizontal: 25,
    flex: 1,
  },
  seriePlayerSeasonsTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seriePlayerSeasonsButtonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerWebView: {
    flex: 1,
    marginTop: 16,
    height: 200,
  },
  seriePlayerEpisodesButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  seriePlayerEpisodesTitle: {
    color: 'white',
  },
  starContainer: {
    position: 'absolute',
    top: 70,
    right: 40,
    zIndex: 1,
  },
});
