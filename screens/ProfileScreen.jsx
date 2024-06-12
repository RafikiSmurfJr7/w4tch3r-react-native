import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  onChangeText,
  Pressable,
  Modal,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import NavBar from "../components/NavBar";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { ThemeColor } from "../context/ThemeColor";
import { Icon } from "@rneui/base";
import { useFocusEffect } from "@react-navigation/native";
import { backendApi } from "../config/axios.conf";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen({}) {
  const colors = useContext(ThemeColor);

  const [username, onChangeUsername] = useState();
  const [email, onChangeEmail] = useState();

  const [userData, setUserData] = useState({});

  const { getToken } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      backendApi
        .get(`/auth/user?token=${getToken()}`)
        .then((res) => {
          console.log(res);
          setUserData(res.data);
          onChangeUsername(res.data.username);

          onChangeEmail(res.data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])
  );

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.blue,
    },
    subContainerNavBar: {},
    subContainerFilter: {},
    listContainer: {
      flex: 1,
      marginTop: 10,
    },
    avatar: {
      flex: 1,
      width: 202,
      height: 60,
      marginTop: 30,
      marginBottom: 30,
      alignSelf: "center",
    },
    texto1: {
      marginTop: 30,
      alignSelf: "center",
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
    container1: {
      flex: 4,
      marginTop: 0,
    },

    textouser: {
      color: "#ffffff",
      fontSize: 16,
      marginLeft: 20,
    },
    input: {
      marginLeft: 20,
      borderWidth: 1,
      marginRight: 20,
      margin: 10,
      borderColor: "#fff",
      color: "#ffffff",
      paddingLeft: 20,
    },
    textpass: {
      color: "#ffffff",
      marginTop: 20,
      fontSize: 16,
      marginLeft: 20,
    },
    inputconfirmarpass: {
      marginLeft: 20,
      borderWidth: 1,
      marginRight: 20,
      margin: 10,
      borderColor: "#fff",
      color: "#ffffff",
      paddingLeft: 20,
    },
    textpassnova: {
      color: "#ffffff",
      marginTop: 5,
      fontSize: 16,
      marginLeft: 20,
    },
    button: {
      alignItems: "center",
      width: "90%",
      height: 40,
      marginTop: 35,
      borderRadius: 6,
      backgroundColor: colors.blue,
      borderWidth: 1,
      borderColor: colors.white,
      justifyContent: "center",
      alignSelf: "center",
      fontWeight: "bold",
    },
    buttonText: {
      color: "white",
    },
  };

  const handleSubmitData = () => {
    backendApi
      .put("/auth/user/update", {
        username: username,
        email: email,
        token: getToken(),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <NavBar />
      {userData ? (
        <>
          <View style={styles.avatar}>
            <Icon
              name="user-secret"
              type="font-awesome"
              color="#ffffff"
              size={90}
            />
            <Text style={styles.texto1}>Dados Pessoias</Text>
          </View>

          <View style={styles.container1}>
            <Text style={styles.textouser}>Username:</Text>
            <View>
              <TextInput
                style={styles.input}
                placeholderTextColor={"#fff"}
                editable={false}
                value={username}
                onChangeText={onChangeUsername}
              />
              <Text style={styles.textouser}>Email:</Text>
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeEmail}
                  value={email}
                />
                <View>
                  <Text style={styles.texto1}>Alterar Password</Text>
                  <Text style={styles.textpass}>Nova Password:</Text>
                  <View>
                    <TextInput style={styles.input} />
                  </View>
                  <View>
                    <Text style={styles.textpassnova}>Confirmar Password:</Text>
                    <View>
                      <TextInput style={styles.inputconfirmarpass} />
                    </View>
                    <View>
                      <Pressable
                        style={styles.button}
                        onPress={handleSubmitData}
                      >
                        <Text style={styles.buttonText}>
                          Guardar Alterações
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
