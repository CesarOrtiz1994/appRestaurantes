import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { styles } from './GoogleMapView.styles'
import { UserLocationContext } from '../../Context/UserLocationContext';
import Colors from '../../constants/Colors';

export default function GoogleMapView({placeList}) {

  const [mapRegion, setMapRegion] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext)

  useEffect(() => {
    if (location) {
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
      {location &&
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={mapRegion}
        >
          <Marker title='Yo' coordinate={mapRegion} />
          {placeList.map((item, index)=> index <= 10 && (
            <Marker 
            key={index}
            title={item.name}
            pinColor={Colors.VERDE}
            style={styles.markerRestaurants}
            coordinate={
              {
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0421,
              }
            }
            />
          ))}
        </MapView>
      }
    </View>
  )
}