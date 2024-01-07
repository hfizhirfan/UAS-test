import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, Text, Image } from "react-native";
import { Heading, Box } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import firebase from "./config/FIREBASE";

const Explore = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const dataRef = firebase.database().ref("events");
      dataRef.once("value").then((snapshot) => {
        const dataValue = snapshot.val();
        if (dataValue != null) {
          const snapshotArr = Object.entries(dataValue).map((item) => {
            return {
              id: item[0],
              ...item[1],
            };
          });
          setEvents(snapshotArr);
        }
        // setIsLoading(false); // Set isLoading to false when data fetching is complete
      }).catch((e) => {
        console.error(e);
      });
  };

  const renderitem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({pathname:"/event-detail", params:{id:item.id}})
        }
        activeOpacity={0.5}
      >
        <Box
          p={"$4"}
          borderBottomColor={"$coolGray300"}
          borderBottomWidth={1}
          flexDirection="row"
          flex={1}
        >
          <Box flex={1} mr={"$4"}>
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: "100%" }}
              alt="Image Data"
              role="img"
            />
          </Box>
          <Box flex={1.8}>
            <Text fontSize={"$sm"}>{item.date}</Text>
            <Heading lineHeight={"$md"} fontSize={"$md"}>
              {item.title}
            </Heading>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20, backgroundColor: "#B80000", marginTop: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => router.replace("/event")}>
            <Ionicons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <Text style={{ textTransform: "none", fontSize: 20, marginLeft: 10, color: "white" }}>Explore Event</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Ionicons name="search" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={events}
        renderItem={renderitem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: -2 }}
      />
    </View>
  );
};

export default Explore;
