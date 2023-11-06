import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import { LoginFormProps } from "../types/Props";

export default function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  submitLoginForm,
}: LoginFormProps) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Pressable style={styles.loginButton} onPress={submitLoginForm}>
        <Text style={styles.loginButtonText}>Login </Text>
        <Icon name="sign-in" type="font-awesome" color="#ffffff" size={20} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 8,
    width: 250,
    height: 30,
    paddingHorizontal: 13,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: "#021F3A",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 8,
    width: 250,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  loginButtonText: {
    color: "white",
    marginHorizontal: 2,
  },
});
