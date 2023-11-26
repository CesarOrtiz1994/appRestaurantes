import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import { styles } from './GoogleMapView.styles'
import { UserLocationContext } from '../../Context/UserLocationContext';

export default function GoogleMapView() {

  const [mapRegion, setMapRegion] = useState([]);

  const {location, setLocation} = useContext(UserLocationContext)
  useEffect(()=>{
    if(location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
      })
    }
  },[location])

  return (
    <View style={styles.container}>
      <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      region={mapRegion}
      >
        <Marker title='Yo' coordinate={mapRegion} />
      </MapView>
    </View>
  )
}