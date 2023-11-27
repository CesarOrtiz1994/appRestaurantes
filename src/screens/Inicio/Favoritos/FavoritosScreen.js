import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getFavoritosByUser } from '../../../Services/FavoritosFirestorage'
import { TouchableOpacity } from 'react-native'
import PlaceItem from '../../../components/Places/PlaceItem'
import { getAuth } from 'firebase/auth'
import { auth } from "../../../../Firebase/firebaseConfig";
import { styles } from './Favoritos.styles'

export default function FavoritosScreen() {

  const authh = getAuth(auth)
  const [user, setUser] = useState(authh.currentUser);
  const [listFavoritos, setListFavoritos] = useState([])
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      (async  () => {
        const favoritos = await getFavoritosByUser(user.uid);
        if(favoritos) {
          setListFavoritos(favoritos.places);
        }
      })()
    }, [])
  )

  const onPlaceClick = (place) => {
    navigation.navigate('Restaurant', { place: place })
  }

  return (
    <View style={styles.container}>
      <Text>Mi lista de restaurantes favoritos</Text>
      <FlatList 
      data={listFavoritos}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPlaceClick(item)}>
          <PlaceItem place={item} />
        </TouchableOpacity>
      )}
      />
    </View>
  )
}