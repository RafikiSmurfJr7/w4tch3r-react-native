import { View, Text, ActivityIndicator } from "react-native";
import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import SerieScreen from "../screens/SerieScreen";
import LoginScreen from "../screens/LoginScreen";
import FilmeScreen from "../screens/FilmeScreen";
import FilmeDetailScreen from "../screens/FilmeDetailScreen";
import PeopleScreen from "../screens/PeopleScreen";
import PeopleDetailScreen from "../screens/PeopleDetailScreen";
import FavoriteFilmScreen from "../screens/FavoriteFilmScreen";
import DrawerMenu from "../components/DrawerMenu";
import ProfileScreen from "../screens/ProfileScreen";
import * as SecureStore from "expo-secure-store";
import { backendApi } from "../config/axios.conf";
import { AuthContext } from "../context/AuthContext";

const Drawer = createDrawerNavigator();

export default function DrawerRoute() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("access_token");
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async (data) => {
      let userToken = null;

      backendApi
        .post("/auth/login", {
          username: data.username,
          password: data.password,
        })
        .then(async (res) => {
          console.log(res.data.token);

          userToken = res.data.token;
          try {
            await SecureStore.setItemAsync("access_token", String(userToken));
          } catch (error) {
            console.log(error);
          }

          console.log(userToken);

          dispatch({ type: "SIGN_IN", token: userToken });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    signOut: async () => {
      try {
        await SecureStore.deleteItemAsync("access_token");
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: "SIGN_OUT" });
    },
  };

  if (state.isLoading) {
    return <ActivityIndicator size="large" color="#ffffff" />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
        drawerContent={() => <DrawerMenu />}
      >
        {state.userToken != null ? (
          <>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Serie" component={SerieScreen} />
            <Drawer.Screen name="Filme" component={FilmeScreen} />
            <Drawer.Screen name="FilmeDetail" component={FilmeDetailScreen} />
            <Drawer.Screen name="People" component={PeopleScreen} />
            <Drawer.Screen name="PeopleDetail" component={PeopleDetailScreen} />
            <Drawer.Screen name="FavoriteFilm" component={FavoriteFilmScreen} />
            <Drawer.Screen name="Perfil" component={ProfileScreen}/>
          </>
        ) : (
          <>
            <Drawer.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Drawer.Navigator>
    </AuthContext.Provider>
  );
}
