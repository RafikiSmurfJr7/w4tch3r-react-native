import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import NavBar from '../components/NavBar';
import { useNavigation } from '@react-navigation/native';
import { useThemeColor } from '../context/ThemeColor';

const FavoriteFilmScreen = () => {
  const navigation = useNavigation();
  const { blue } = useThemeColor();

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
    </View>
  );
};

export default FavoriteFilmScreen;