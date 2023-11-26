import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useEffect, useRef } from "react";
import { ENV } from "../../utils/constants";
import { styles } from "./GooglePlacesInput.styles";

const GooglePlacesInput = ({ navigation }) => {
  const ref = useRef();

  // useEffect(() => {
    // ref.current?.setAddressText('Tacos');
  // }, []);

  const handleRestaurantDetail = (data, details) => {
    // Redirige a la pantalla de edición de perfil
    navigation.navigate("Restaurant", {
      id: data.reference,
      name: data.structured_formatting.main_text,
      address: data.structured_formatting.secondary_text,
      horarios: details.opening_hours.weekday_text,
      latitud: details.geometry.location.lat,
      longitud: details.geometry.location.lng,
      rating: details.rating,
      reviews: details.reviews
    });
  };

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder="Buscar"
      fetchDetails={true}
      onPress={(data, details = null) => {
        // console.log(details.reviews);
        handleRestaurantDetail(data, details)
      }}
      query={{
        key: ENV.API_GOOGLE_PLACES.CONF_KEY,
        language: ENV.API_GOOGLE_PLACES.CONF_LANGUAGE,
        components: ENV.API_GOOGLE_PLACES.CONF_COMPONENTS,
        types: ENV.API_GOOGLE_PLACES.CONF_TYPES,
      }}
      // textInputProps={{
      //   autoFocus: true,
      // }}
      styles={styles}
      enablePoweredByContainer={false}
      // currentLocation={true}
      // currentLocationLabel="Ubicación actual"
    />
  );
};

export default GooglePlacesInput;

