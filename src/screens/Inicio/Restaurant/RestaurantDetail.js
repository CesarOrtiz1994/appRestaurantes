import React, {useEffect, useState} from "react";
import { FlatList, Image, Linking } from "react-native";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";
import { Platform } from "react-native";
import { ScrollView } from "react-native";

const RestaurantDetail = (props) => {
  const { navigation, route: { params } } = props;
  const [place, setPlace] = useState([])

  useEffect(()=> {
    setPlace(params.place)
  },[]);

  const onDirectionClick = () => {
    const url = Platform.select({
      ios: "maps:" + place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
      android: "geo:" + place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
    });

    Linking.openURL(url)
  }

  return (
    <ScrollView style={styles.container}>
      <Text>Detalle</Text>
      {/* <Text>ID: {params.id}</Text>
      <Text>Name: {params.name}</Text>
      <Text>Address: {params.address}</Text>
      <Text>Horarios: </Text>
      {params.horarios.map((horario) => (
        <Text key={horario}>{horario}</Text>
        ))}
        
      <Text>Localización geometrica</Text>
      <Text>latitud: {params.latitud}</Text>
      <Text>longitud: {params.longitud}</Text>
      <Text>Calificación general: {params.rating}</Text>
      <Text>Comentarios: ...</Text>  */}
      {/* params.reviews */}
      <Button mode="contained" onPress={()=> onDirectionClick()}>Ver dirección en otra App</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 40,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default RestaurantDetail;
