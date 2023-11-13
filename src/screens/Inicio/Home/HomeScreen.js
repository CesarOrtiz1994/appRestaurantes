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
          key: 'AIzaSyCHgz2fULS4SvHYncjOksNfidTQ8E20Ckc',
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
      />
    </View>
  );
}
