import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Button, ButtonText, Image, Divider, ScrollView } from "@gluestack-ui/themed";
import { Header } from "../components";
import  Ionicons  from "@expo/vector-icons/Ionicons";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Firebase from "./config/FIREBASE/index";
import {router, useLocalSearchParams} from "expo-router"

const NewsDetail = ({ event }) => {
  const params = useLocalSearchParams();
  const [test, setTest] = useState();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added isLoading state
  console.log(params)

  // useEffect(() => {
  //   getUserData();
  // }, []);

  // const getUserData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("user-data");
  //     if (value !== null) {
  //       const valueObject = JSON.parse(value);
  //       setUserData(valueObject);
  //       fetchDataTest();
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const fetchDataTest = () => {
  //   try {
  //     const dataRef = Firebase.database().ref("events/event1");
  //     dataRef.once("value").then((snapshot) => {
  //       const dataValue = snapshot.val();
  //       if (dataValue != null) {
  //         const snapshotArr = Object.entries(dataValue).map((item) => {
  //           return {
  //             id: item[0],
  //             ...item[1],
  //           };
  //         });
  //         setTest(snapshotArr);
  //       }
  //       setIsLoading(false); // Set isLoading to false when data fetching is complete
  //     }).catch((e) => {
  //       console.error(e);
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <>
      <Header title={"Event"} withBack={true} />
      <ScrollView>
        <Image
          source={{ uri: params.image }}
          w={"$full"}
          h={"$48"}
          alt="News Image"
          role="img"
        />
        <Box p={"$4"}>
          <Text mb={"$1"}>{params.procurement}</Text>
          <Heading lineHeight={"$xl"} fontSize={"$2xl"}>
            {params.title}
          </Heading>
          <Divider my={"$4"} />
          <Box flexDirection="row">
            <Ionicons name="time" size={32} color="#B80000" />
            <Box flexDirection="column">
              <Text fontWeight="normal">{params.date}</Text>
              <Text fontWeight="normal">{params.time}</Text>
            </Box>
          </Box>
          <Box flexDirection="row" marginTop={20}>
            <Ionicons name="cash" size={32} color="#B80000" />
            <Text fontWeight="normal">{params.fee}</Text>
          </Box>


          <Text mt={"$7"} fontWeight="bold" fontSize={18}>
            About
          </Text>
          <Text fontWeight="normal">{params.content}</Text>
          <Button
            size="xl"
            variant="solid"
            bg="#B80000"
            mx={20}
            mt={20}
            onPress={() => router.push({pathname:"/web", params: {link: params.link}})}
            isDisabled={false}
            isFocusVisible={false}
            sx={{ ":active": { bg: "$error800" } }}
          >
            <ButtonText>register</ButtonText>
          </Button>

        </Box>
      </ScrollView>
    </>
  );
};

export default NewsDetail;
