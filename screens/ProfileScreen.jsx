import { Button, StyleSheet, Text, View,TextInput, onChangeText,Pressable,Modal, Animated,TouchableOpacity,Image} from "react-native";
import NavBar from "../components/NavBar";
import React, { useEffect, useState, useContext } from "react";
import { ThemeColor } from "../context/ThemeColor";
import { Icon } from "@rneui/base";

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};



export default function ProfileScreen({}) {
  const colors = useContext(ThemeColor);
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
    avatar:{
      flex:1,
      width: 202,
      height: 60,
      marginTop: 30,
      marginBottom: 30,
      alignSelf:"center",
      
    },
    texto1:{
      marginTop:30,
      alignSelf: "center",
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
    container1:{
      flex:4,
      marginTop:0,
    },

    textouser:{
      color:'#ffffff',
      fontSize:16,
      marginLeft:20,
      
    },
    input: {
      marginLeft:20,
      borderWidth: 1,
      marginRight:20,
      margin:10,
      borderColor:"#fff",
      color:"#ffffff",
      paddingLeft:20,
      
      },
      textpass:{
        color:'#ffffff',
        marginTop:20,
        fontSize:16,
        marginLeft:20,
      },
      inputconfirmarpass:{
        marginLeft:20,
        borderWidth: 1,
        marginRight:20,
        margin:10,
        borderColor:"#fff",
        color:"#ffffff",
        paddingLeft:20,
      },
      textpassnova:{
        color:'#ffffff',
        marginTop:5,
        fontSize:16,
        marginLeft:20,
      },
      button: {
        alignItems: "center",
        width: 300,
        height: 40,
        marginTop: 35,
        borderRadius: 6,
        backgroundColor: "#2B7ACA",
        paddingHorizontal: 15,
        paddingVertical: 4,
        justifyContent: "center",
        alignSelf: "center",
        fontWeight: "bold",
      },
      buttonText: {
        color: "white",
      },
    
    

  };
  const [text, onChangeText] =useState('w4tcheruser1234@gmail.com');
  const [visible, setVisible] = React.useState(false);


  return (
    <View style={styles.container}>
        <NavBar/>
      <View style={styles.avatar}>
      <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              {  }
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          {  }
        </View>

        <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
          Alterações guardadas com sucesso
        </Text>
      </ModalPoup>
        <Icon name="user-secret" type="font-awesome" color="#ffffff" size={90}  />
        <Text style={styles.texto1}>Dados Pessoias</Text>
        </View> 
        
        <View style={styles.container1}>
          <Text style={styles.textouser}>Username:</Text>
          <View>
          <TextInput
        style={styles.input}
        
        placeholder={
          "W4tcherUser123"
          
        }
        placeholderTextColor={"#fff"}
        editable={false}
      />
      <Text style={styles.textouser}>Email:</Text>
      <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}

        
        
        
      />
      <View >
        <Text style={styles.texto1}>Alterar Password</Text>
        <Text style={styles.textpass}>Nova Password:</Text>
        <View>
        <TextInput
        style={styles.input}  
             
        
      />
      </View>
      <View>
        <Text style={styles.textpassnova}>Confirmar Password:</Text>
        <View>
        <TextInput
        style={styles.inputconfirmarpass} 
        />
      </View>
      <View>
      <Pressable
  style={styles.button}
  onPress={() => setVisible(true)}
>
  <Text style={styles.buttonText}>Guardar Alterações</Text>
</Pressable>

      </View>
        </View>
        
      </View>

      </View>
      
      </View>
             
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
