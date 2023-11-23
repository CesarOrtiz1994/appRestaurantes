import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const RestaurantDetail = (props) => {
  const { navigation, route: { params } } = props;


  return (
    <View style={styles.container}>
      <Text>ID: {params.id}</Text>
      <Text>Name: {params.name}</Text>
      <Text>Address: {params.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RestaurantDetail;
