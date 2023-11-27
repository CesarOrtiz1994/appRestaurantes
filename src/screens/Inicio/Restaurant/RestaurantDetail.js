import React, { useEffect, useState } from "react";
import { FlatList, Image, Linking } from "react-native";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
import GlobalApi from "../../../Services/GlobalApi";
import Favoritos from "../../../components/Favoritos/Favoritos";

const RestaurantDetail = (props) => {
  const { navigation, route: { params } } = props;
  const [place, setPlace] = useState([])

  useEffect(() => {
    GetDetailPlace()

  }, []);

  const GetDetailPlace = async () => {
    await GlobalApi.searchPlaceById(params.place.place_id).then((res) => {
      // console.log(res.data.result)
      setPlace(res.data.result)
    })
  }

  const onDirectionClick = () => {
    const url = Platform.select({
      ios: "maps:" + place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
      android: "geo:" + place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
    });
    Linking.openURL(url)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.iconFav}>
        <Favoritos place={place} />
      </View>
      <Text>Detalle</Text>
      <Text>{place.name}</Text>
      <Text>{place.vicinity}</Text>
      <Text>Calificación general: {place.rating}</Text>
      <Text>Horarios: </Text>
      {place.opening_hours && place.opening_hours.weekday_text.map((horario) => (
        <Text key={horario}>{horario}</Text>
      ))}
      <Text>Comentarios: ...</Text>
      {/* params.reviews */}
      <Button mode="contained" onPress={() => onDirectionClick()}>Ver dirección en otra App</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  iconFav: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});

export default RestaurantDetail;
