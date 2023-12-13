import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { backendApi } from "../config/axios.conf";
import ErrorAlert from "../components/ErrorAlert";
import { LoginScreenProps } from "../types/Props";
import * as SecureStore from "expo-secure-store";

//export default function LoginScreen({ setToken }: LoginScreenProps) {
export default function LoginScreen() {
  const [username, setUsername]= useState("");

  const [password, setPassword]= useState("");

  const [error, setError]= useState("");

  const [token, setToken] = useState("");

  const saveToken = async (token) => {
    //console.log(token);
    await SecureStore.setItemAsync("token", token);
    let result = await SecureStore.getItemAsync("token");
    //console.log(result);
  };

  const submitLoginForm = () => {
    console.log(username, password);

    backendApi
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setToken(res.data.token);
        saveToken(token);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.detail);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      {error ? <ErrorAlert>{error}</ErrorAlert> : null}

      <View style={styles.formContainer}>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          submitLoginForm={submitLoginForm}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#021F3A",
  },
  image: {
    width: 227,
    height: 39.72,
  },
  formContainer: {
    marginTop: 25,
  },
});
