import React from "react";
import { FlatList, Image } from "react-native";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";

const RestaurantDetail = (props) => {
  const { navigation, route: { params } } = props;

  return (
    <View style={styles.container}>
      <Text>ID: {params.id}</Text>
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
      <Text>Comentarios: ...</Text> 
      {/* params.reviews */}
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
