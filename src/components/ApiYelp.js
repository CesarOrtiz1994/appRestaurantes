import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState , useContext} from "react";
import YelpApi from "../Services/YelpApi";
import { UserLocationContext } from "../Context/UserLocationContext";

const ApiYelp = () => {
  const [businesses, setBusinesses] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext)

  const fetchBusinesses = async () => {
    // console.log(location.coords)
    await YelpApi.getRestaurantsNearYelp(location.coords.latitude, location.coords.longitude).then((res) => {
      // console.log(res.data.businesses)
      setBusinesses(res.data.businesses)
    })
  };

  useEffect(() => {
    // fetchBusinesses();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Restaurantes en Querétaro</Text>
      <FlatList
        data={businesses}
        keyExtractor={(business) => business.id}
        renderItem={({ item }) => (
          <View style={styles.business}>
            {/* {console.log(item.categories)} */}
            <Text>{item.id}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.rating}>{item.rating} estrellas</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  business: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  name: {
    fontSize: 18,
  },
  rating: {
    fontSize: 16,
  },
});

export default ApiYelp;
