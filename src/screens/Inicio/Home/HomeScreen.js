import React from "react";
import GooglePlacesInput from "../../../components/GooglePlacesInput";

export default function HomeScreen({navigation}) {
  return (
    <>
      <GooglePlacesInput navigation={navigation} />
    </>
  );
}
