import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const ApiYelp = () => {
  const [businesses, setBusinesses] = useState([]);

  const fetchBusinesses = async () => {
    // const endpoint = "https://api.yelp.com/v3/businesses/search?location=Queretaro, Qro&categories=restaurants&sort_by=best_match&limit=20";
    const endpoint =
      "https://api.yelp.com/v3/businesses/search?latitude=20.630783&longitude=-100.452474&radius=6000&categories=restaurants&sort_by=best_match&limit=25";
    const endpoint_japonesa =
      "https://api.yelp.com/v3/businesses/search?latitude=20.630783&longitude=-100.452474&radius=8000&categories=sushi&categories=japanese&locale=es_MX&sort_by=best_match&limit=20";
    const endpoint_mexicana =
      "https://api.yelp.com/v3/businesses/search?latitude=20.630783&longitude=-100.452474&radius=8000&categories=mexican&locale=es_MX&sort_by=best_match&limit=20";
    const endpoint_italiana =
      "https://api.yelp.com/v3/businesses/search?latitude=20.630783&longitude=-100.452474&radius=8000&categories=italian&locale=es_MX&sort_by=best_match&limit=20";

    const key =
      "";

    const response = await fetch(endpoint_mexicana, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${key}`,
      },
      // params,
    });
    console.log(response);

    if (response.status === 200) {
      const data = await response.json();
      setBusinesses(data.businesses);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Restaurantes en Querétaro</Text>
      <FlatList
        data={businesses}
        keyExtractor={(business) => business.id}
        renderItem={({ item }) => (
          <View style={styles.business}>
            <Text>{item.id}</Text>

            {/* <Image source={{ uri: item.image_url }} style={styles.image} /> */}

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
    flex: 1,
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
