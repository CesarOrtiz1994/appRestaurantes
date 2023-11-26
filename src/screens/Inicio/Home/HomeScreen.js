import React, { useContext, useEffect, useState } from "react";
import GoogleMapView from "../../../components/Google/GoogleMapView";
import GooglePlacesInput from "../../../components/Google/GooglePlacesInput";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./Home.styles";
import GlobalApi from "../../../Services/GlobalApi";
import { UserLocationContext } from "../../../Context/UserLocationContext";
import PlaceItem from "../../../components/Places/PlaceItem";
import { FlatList } from "react-native";

export default function HomeScreen({ navigation }) {

  const [placeList, setPlaceList] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext)

  useEffect(() => {
    GetPlaces();
  }, []);

  const GetPlaces = async () => {
    // console.log("lat",location.coords.latitude, "lng", location.coords.longitude)
    await GlobalApi.nearByPlace(location.coords.latitude, location.coords.longitude).then((res) => {
      // console.log(res.data.results.length)
      setPlaceList(res.data.results)
    })
  }

  return (
    <View style={styles.container}>
      <View>
        {/* <GooglePlacesInput navigation={navigation} /> */}
      </View>
      {placeList ?
        <FlatList
        data={placeList}
        renderItem={({ item }) => (
          <PlaceItem place={item} />
          )}
          ListHeaderComponent={
            <View>
              <GoogleMapView />
              <Text>Se encontraron {placeList.length} restaurantes</Text>
            </View>
          }
        />
        : null}
    </View>
  );
}
