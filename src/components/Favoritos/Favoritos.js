import React, { useEffect, useState } from 'react'
import { IconButton } from 'react-native-paper';
import Colors from "../../constants/Colors"
import { getAuth } from 'firebase/auth';
import { auth } from "../../../Firebase/firebaseConfig";
import { addFavoritosByUser, isFavoritoByUser, removeFavoritoByUser } from '../../Services/FavoritosFirestorage';



export default function Favoritos({ place }) {
  const authh = getAuth(auth)
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [reloadFavorite, setReloadFavorite] = useState(false);
  const [user, setUser] = useState(authh.currentUser);
  // console.log(place);

  useEffect(() => {
    (
      async () => {
        // console.log(user.uid +" "+id)
        const response = await isFavoritoByUser(user.uid, place.place_id);
        // console.log(response)
        if (response) setIsFavorite(true)
        else setIsFavorite(false)
      }
    )()
  }, [place, reloadFavorite]);

  const onReloadFavorite = () => {
    setReloadFavorite((prev) => !prev)
  }

  const addFavoritos = async () => {
    try {
      await addFavoritosByUser(user.uid, place)
      onReloadFavorite()
    } catch (error) {
      console.log(error);
    }
  }

  const removeFavoritos = async () => {
    try {
      await removeFavoritoByUser(user.uid, place.place_id)
      onReloadFavorite()
    } catch (error) {
      console.log(error);
    }
  }

  const iconType = isFavorite ? "heart" : "heart-outline";
  return (
    <IconButton
      icon={iconType}
      iconColor={Colors.VERDE}
      size={50}
      onPress={isFavorite ? removeFavoritos : addFavoritos}
    />
  )
}