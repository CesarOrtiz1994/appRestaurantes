import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { fstore } from "../../Firebase/firebaseConfig";

export const getAllComents = async (place_id) => {
    const docRef = doc(fstore, `comentarios/${place_id}`);
    const docCifrada = await getDoc(docRef);
    return docCifrada.data();
}

export const addNewComent = async (place_id, photo, name, rating, text, uid) => {
    console.log(uid)
    const docRef = doc(fstore, `comentarios/${place_id}`);
    await setDoc(docRef, {
        coments: [{
            profile_photo_url: photo,
            author_name: name,
            rating: rating,
            text: text,
            uid: uid
        }]
    });
}

export const updateComent = async (idPlace, index, new_rating, new_text) => {
    const docuRef = doc(fstore, `comentarios/${idPlace}`);
    await updateDoc(docuRef, {
        [`${idPlace}.coments${index}.rating`]: new_rating,
        [`${idPlace}.coments${index}.text`]: new_text,
    });
}

