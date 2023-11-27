import _ from "lodash";
import { fstore } from "../../Firebase/firebaseConfig";
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


// función para traer favoritos por usuario
export const getFavoritosByUser = async (uid) => {
    const docRef = doc(fstore, `favoritos/${uid}`);
    const docCifrada = await getDoc(docRef);
    // console.log(docCifrada.data())
    return docCifrada.data();
}

// función para añadir a favoritos un restaurante por usuario
export const addFavoritosByUser = async (uid, place) => {
    const docRef = doc(fstore, `favoritos/${uid}`);
    // await updateDoc(docRef, { places: arrayUnion({ place_id: id }) });
    // Verificar si el documento existe
    const documentSnapshot = await getDoc(docRef);
    if (documentSnapshot.exists()) {
        // El documento existe, agregar un objeto al arreglo
        await updateDoc(docRef, {
            places: arrayUnion({ place_id: place.place_id, name: place.name, rating: place.rating, vicinity: place.vicinity , photos: place.photos })
        });
    } else {
        // El documento no existe, crearlo con el objeto
        await setDoc(docRef, { places: [{ place_id: place.place_id, name: place.name, rating: place.rating, vicinity: place.vicinity , photos: place.photos }] });
    }
}

// función para validar si un restaurante esta en favoritos o no
export const isFavoritoByUser = async (uid, id) => {
    try {
        const favorites = await getFavoritosByUser(uid);
        // console.log(favorites.places)
        return _.some(favorites.places, { place_id: id });
    } catch (error) {
        console.log(error);
        return false;
    }
}

// función que elimina un restaurante de favoritos
export const removeFavoritoByUser = async (uid, id) => {
    const docRef = doc(fstore, `favoritos/${uid}`);
    const favorites = await getFavoritosByUser(uid);
    await updateDoc(docRef, { places: arrayRemove(favorites.places.find(place => place.place_id === id)) });
}
