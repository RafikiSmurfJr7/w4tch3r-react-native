import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, FlatList, ActivityIndicator } from 'react-native';
import NavBar from '../components/NavBar';
import { useThemeColor } from '../context/ThemeColor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteFilmScreen = () => {
  const { blue } = useThemeColor();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

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

    loadFavorites();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: blue, padding: 16 }}>
      <NavBar />

      {/* Contêiner para os botões "Favoritos" e "Assistir Mais Tarde" */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <View style={{ marginRight: 8, borderRadius: 10, overflow: 'hidden' }}>
          <Button title="Favoritos" onPress={() => {/* Ação ao pressionar Favoritos */}} />
        </View>
        <View style={{ marginLeft: 8, borderRadius: 10, overflow: 'hidden' }}>
          <Button title="Assistir Mais Tarde" onPress={() => {/* Ação ao pressionar Assistir Mais Tarde */}} />
        </View>
      </View>

      {/* Cabeçalho com estrela e texto */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Image
          source={require('../assets/fav.png')}  // Substitua pelo caminho real do ícone de estrela
          style={{ width: 24, height: 24, marginRight: 8 }}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Filmes Favoritos</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ color: 'white' }}>{item.title}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default FavoriteFilmScreen;
