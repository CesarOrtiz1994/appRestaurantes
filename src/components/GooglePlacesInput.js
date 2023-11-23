import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useEffect, useRef } from "react";

const GooglePlacesInput = ({navigation}) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText('Queretaro');
  }, []);

  const handleRestaurantDetail = (data) => {
    // Redirige a la pantalla de edición de perfil
    navigation.navigate("Restaurant", {
      id: data.reference,
      name: data.structured_formatting.main_text,
      address: data.structured_formatting.secondary_text,
    });
  };
  
  return (
    <GooglePlacesAutocomplete
    ref={ref}
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(data);
        handleRestaurantDetail(data)
      }}
      query={{
        key: "AIzaSyA1z4pNGYp7vCyEdzQ_y7tpI4zAapVrH_U",
        language: "es",
        components: 'country:MX',
        types: 'restaurant',
      }}
    />
  );
};

export default GooglePlacesInput;

{
  /* <GooglePlacesAutocomplete
// ref={ref}
placeholder='Search'
onPress={(data, details = null) => {
  // 'details' is provided when fetchDetails = true
  console.log(data, details);
}}
query={{
  key: 'AIzaSyATVMIpf6-uBA6bfIPaPExOAWQD2SC8TUg',
  language: 'en',
}}
fetchDetails={true}
onFail={error => console.log(error)}//mostar errores
onNotFound={() => console.log('no results')}
// listEmptyComponent={() => (
//   <View style={{flex: 1}}>
//     <Text>No results were found</Text>
//   </View>
// )}
// predefinedPlaces={[
//   {
//     type: 'favorite',
//     description: 'Dominos Pizza',
//     geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
//   },
//   {
//     type: 'favorite',
//     description: 'Chicken Republic',
//     geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
//   },
// ]}
/> */
}
