import React, { useContext, useEffect, useState } from "react";
import GoogleMapView from "../../../components/Google/GoogleMapView";
import GooglePlacesInput from "../../../components/Google/GooglePlacesInput";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./Home.styles";
import GlobalApi from "../../../Services/GlobalApi";
import { UserLocationContext } from "../../../Context/UserLocationContext";
import PlaceItem from "../../../components/Places/PlaceItem";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import Categorias from "../../../components/Categorias/Categorias";

export default function HomeScreen() {

  const [placeList, setPlaceList] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext);
  const navigation = useNavigation();

  useEffect(() => {
    GetPlaces('restaurant');
  }, []);

  const GetPlaces = async (type) => {
    // console.log(location.coords)
    if (location) {
      // console.log(type)
      await GlobalApi.nearByPlace(
        location.coords.latitude, 
        location.coords.longitude,
        type
        ).then((res) => {
        // console.log(res.data.results.length)
        setPlaceList(res.data.results)
      })
    }
  }

  const onPlaceClick = (place) => {
    navigation.navigate('Restaurant', { place: place })
  }

  return (
    <View style={styles.container}>
      {placeList &&
        <FlatList
          data={placeList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            location &&
              <View>
                <GoogleMapView placeList={placeList} />
                <Divider />
                {/* <Text style={styles.textEncontrados}>Se encontraron {placeList.length} restaurantes:</Text> */}
                <Categorias setSelectedCategory={(value)=> GetPlaces(value)} />
              </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPlaceClick(item)}>
              <PlaceItem place={item} />
            </TouchableOpacity>
          )}
        />
        }
    </View>
  );
}
