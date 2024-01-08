import React, { useState } from 'react';
import { Box, Image, Input, InputIcon, InputSlot, InputField, Button, ButtonText, Alert, AlertText, Modal, ModalBackdrop, Fab } from "@gluestack-ui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import BackFAB from './ButtonBack';
import firebase from "./config/FIREBASE/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';



const Register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const toggleAlert = (message) => {
    setShowAlert(!showAlert);
    setAlertMessage(message);
  };

  const onRegister = async () => { firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
    saveUserDatabase(nama,nim,userCredential);
    saveUserData(email, password,nama, nim);
  }).catch((error) => {
    console.error(error);
  });
  const saveUserData = async (email, password, name,credential) => {
    const userData = { email, password,name, credential };
    try {
      await AsyncStorage.setItem("user-data", JSON.stringify(userData));
      
    } catch (error) {
      console.error(error);
    }
  }
  };
  const saveUserDatabase = (Nama,Nim,credential) =>{
    const data = {
        Nama: Nama,
        Nim: Nim
    };
    const uid = credential.user.uid;
    firebase.database().ref("User/"+uid).push(data);
    router.replace('/welcome');
};


//   const saveUserData = async (email, password, nama, nim) => {
//     const userData = { email, password,nama, nim };
//     try {
//       await AsyncStorage.setItem("user-data", JSON.stringify(userData));
//       router.replace("/home");
//     } catch (error) {
//       console.error(error);
//   }
// };

  // const handleState = () => {
  //   setShowPassword((showState) => {
  //     return !showState
  //   })



  return (
    <>
      <Box 
      p={"$12"} 
      flexDirection="col"
      justifyContent="center"
      >
        <BackFAB/>
        <Image
          source={require("../assets/logoproject.png")}
          h={200}
          w={"$full"}
          mt={30}
          mb={30}
          alt="Logo"
          role="img"
        />
        <Input
        variant="outline"
        size="x"
        mb="$4"
        >
          <InputSlot pl="$3">
            <InputIcon>
              <Ionicons
                name={"person"}
                size={20}
                color={"black"}
              />
            </InputIcon>
          </InputSlot>
          <InputField 
          placeholder="Nama Lengkap"
          onChangeText={(nama) => setNama(nama)} 
          value={nama} />
        </Input>
        <Input
        variant="outline"
        size="x"
        mb="$4"
        >
          <InputSlot pl="$3">
            <InputIcon>
              <Ionicons
                name={"person"}
                size={20}
                color={"black"}
              />
            </InputIcon>
          </InputSlot>
          <InputField 
          placeholder="Email"
          onChangeText={(email) => setEmail(email)} 
          value={email} />
        </Input>
        <Input
        variant="outline"
        size="x"
        mb="$4"
        >
          <InputSlot pl="$3">
            <InputIcon>
              <Ionicons
                name={"person"}
                size={20}
                color={"black"}
              />
            </InputIcon>
          </InputSlot>
          <InputField 
          placeholder="Nomor Induk Mahasiswa"
          onChangeText={(nim) => setNim(nim)} 
          value={nim} />
        </Input>
        <Input
        variant="outline"
        size="x"
        mb="$4"
        >
          <InputSlot pl="$3">
            <InputIcon>
                <Ionicons
                  name={"lock-closed"}
                  size={20}
                  color={"black"}
              />
            </InputIcon>
          </InputSlot>
          <InputField 
          placeholder="Password"
          onChangeText={(password) => setPassword(password)} 
          value={password} />
        </Input>
        <Button
          size="x"
          variant="solid"
          mx={20}
          mt={20}
          bg="$red800"
          sx={{ ":active": { bg: "$error800" } }}
          onPress={() => onRegister()}
        >
          <ButtonText>Register</ButtonText>
        </Button>
          
      </Box>

      {}
      {showAlert && (
        <Modal isOpen={showAlert} onClose={() => toggleAlert()}>
          <ModalBackdrop />
          <Alert mx="$4" action="error" variant="solid">
            <AlertText fontWeight="$bold">Buset!</AlertText>
            <AlertText>{alertMessage}</AlertText>
          </Alert>
        </Modal>
      )}
     
    </>
  );
};

export default Register;
