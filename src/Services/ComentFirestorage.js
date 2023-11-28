import { addDoc, collection, doc, getDoc, getDocs, limit, query, setDoc, updateDoc, where } from "firebase/firestore";
import { fstore } from "../../Firebase/firebaseConfig";

export const getAllComents = async (place_id) => {
    const collectionRef = collection(fstore, 'comentarios');
    const q = await query(collectionRef, where("place_id", "==", place_id), limit(5));
    const querySnapshot = await getDocs(q);
    return await querySnapshot.docs.map(doc => ({ ...doc.data() }));
}

export const addNewComent = async (place_id, photo, name, rating, text, uid) => {
    await addDoc(collection(fstore, "comentarios"), {
        place_id: place_id,
        uid: uid,
        profile_photo_url: photo,
        author_name: name,
        rating: rating,
        text: text,
    });
}

export const updateComent = async (uid, place_id, photo, name, rating, text) => {
    const collectionRef = collection(fstore, 'comentarios');
    const q = query(collectionRef, where("place_id", "==", place_id), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty) {
        await updateDoc(querySnapshot.docs[0].ref, {
            profile_photo_url: photo,
            author_name: name,
            rating: rating,
            text: text,
        });
    }
}

