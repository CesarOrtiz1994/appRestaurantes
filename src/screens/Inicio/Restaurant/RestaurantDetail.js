import React, { useCallback, useState } from "react";
import { Linking } from "react-native";
import { View, Text } from "react-native";
import { Button, Divider } from "react-native-paper";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
import GlobalApi from "../../../Services/GlobalApi";
import Favoritos from "../../../components/Favoritos/Favoritos";
import { useFocusEffect } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { styles } from "./RestaurantDetail.styles";

const RestaurantDetail = (props) => {
  const { navigation, route: { params } } = props;
  const [place, setPlace] = useState([])

  useFocusEffect(
    useCallback(() => {
      (async () => {
        GetDetailPlace()
      })()
    }, [])
  )

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
      <View style={styles.lineDesc}>
        <Text style={styles.textCampo}>Nombre:</Text>
        <Text style={styles.textDesc}>{place.name}</Text>
      </View>
      <View style={styles.lineDesc}>
        <Text style={styles.textCampo}>Calificación:</Text>
        <View style={styles.lineFav}>
          <AntDesign name="star" style={styles.ratingStar} />
          <Text style={styles.textDesc}>{place.rating}</Text>
        </View>
      </View>
      <View style={styles.lineRow}>
        <Text style={styles.textCampo}>Dirección:</Text>
        <Text style={[styles.textDesc, styles.textAddress]}>{place.vicinity}</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.lineDesc}>
        <Text style={styles.textCampo}>Horarios:</Text>
        <View>
          {place.opening_hours && place.opening_hours.weekday_text.map((horario) => (
            <Text key={horario}>{horario}</Text>
          ))}
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.sectionButtons}>
      <Button icon="map-marker" mode="outlined" onPress={() => onDirectionClick()}>Google Maps</Button>
      </View>
      <Text>Comentarios: ...</Text>
      {/* params.reviews */}
    </ScrollView>
  );
};


export default RestaurantDetail;
