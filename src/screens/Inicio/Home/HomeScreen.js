import React, { useEffect, useRef } from 'react';
import { View, Text, SafeAreaView } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function HomeScreen() {

  // const ref = useRef();

  // useEffect(() => {
  //   ref.current?.setAddressText('Some Text');
  // }, []);

  return (
    <View >
      <GooglePlacesAutocomplete
        // ref={ref}
        placeholder='Search'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'Api Key ',
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
      />
    </View>
  );
}
