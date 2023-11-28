import React, { useCallback, useState } from "react";
import { FlatList, Linking } from "react-native";
import { View, Text } from "react-native";
import { Avatar, Button, Divider, TextInput } from "react-native-paper";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
import GlobalApi from "../../../Services/GlobalApi";
import Favoritos from "../../../components/Favoritos/Favoritos";
import { useFocusEffect } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { styles } from "./RestaurantDetail.styles";
import { getAuth } from "firebase/auth";
import { auth } from "../../../../Firebase/firebaseConfig";
import { Calificacion } from "../../../components/Opinion/Calificacion";
import ModalOpinion from "../../../components/Opinion/ModalOpinion";
import { forms } from "../../../styles/forms";
import Comentarios from "../../../components/Opinion/Comentarios/Comentarios";
import { getAllComents } from "../../../Services/ComentFirestorage";

const RestaurantDetail = (props) => {
  const authh = getAuth(auth)
  const [user, setUser] = useState(authh.currentUser);
  const { navigation, route: { params } } = props;
  const [place, setPlace] = useState([])
  const [listComents, setListComents] = useState([])
  const [comentUser, setComentUser] = useState({})
  const [tieneComent, setTieneComent] = useState(false)
  const [indice, setIndice] = useState(0)

  useFocusEffect(
    useCallback(() => {
      (async () => {
        GetDetailPlace()
        GetComentsPlace()
      })()
    }, [])
    )
    
    const GetDetailPlace = async () => {
      await GlobalApi.searchPlaceById(params.place.place_id).then((res) => {
        // console.log(res.data.result)
        setPlace(res.data.result)
    })
  }

  const GetComentsPlace = async () => {
    const coments = await getAllComents(params.place.place_id);
    // console.log(place.reviews)
    // console.log(coments)
    if (coments) {
      setListComents(coments.coments)
      const comenUs = coments.coments.find(c => c.uid === user.uid);
      // console.log("comenUs", comenUs)
      if (comenUs) {
        const index = coments.findIndex(comment => comment.uid === user.uid);
        setIndice(index);
        setComentUser(comenUs);
        setTieneComent(true);
      }
    }
  }

  const onDirectionClick = () => {
    const url = Platform.select({
      ios: "maps:" + place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
      android: "geo:" + place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
    });
    Linking.openURL(url)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.iconFav}>
        <Favoritos place={place} />
      </View>
      <View style={styles.lineDesc}>
        <Text style={styles.textCampo}>Nombre:</Text>
        <View style={styles.nameComponent}>
          <Text style={styles.textDesc}>{place.name}</Text>
        </View>
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
      <Divider style={styles.divider} />
      <Text style={styles.textIndications}>Mi Calificación y comentario:</Text>
      {tieneComent ?
        <View>
          <Calificacion rating={comentUser.rating} disabled={true} size={30} />
          <Text style={styles.myComent}>{comentUser.text}</Text>
        </View>
        :
        <View>
          <Calificacion rating={0} disabled={true} size={30} />
          <Text style={styles.myComent}>Aún no agregas un comentario</Text>
        </View>
      }
      <ModalOpinion
        place_id={place.place_id}
        photo={user.photoURL}
        name={user.displayName}
        oldRating={comentUser.rating}
        oldText={comentUser.text}
        uid={user.uid}
        tiene={tieneComent}
        indice={indice}
      />
      <Divider style={styles.divider} />
      <Text style={styles.textIndications}>Comentarios:</Text>
      <Comentarios reviews={place.reviews} />
    </ScrollView>
  );
};


export default RestaurantDetail;
