import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Modal, Portal, TextInput } from 'react-native-paper';
import { Calificacion } from './Calificacion';
import { forms } from "../../styles/forms"
import { styles } from './ModalOpinion.styles';
import Toast from 'react-native-root-toast';
import { addNewComent, getAllComents, updateComent } from '../../Services/ComentFirestorage';
import { useEffect } from 'react';

export default function ModalOpinion(params) {
    const { place_id, photo, name, oldRating, oldText, uid, tiene, setComentUser, setTieneComent } = params;
    const [visible, setVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(() => {
        (async () => {
            setRating(oldRating)
            setText(oldText)
        })()
        // console.log(rating)
        // console.log(text)
    }, [])

    const actualizaMyComent = async () => {
        const coments = await getAllComents(place_id);
        // console.log(coments)
        if (coments) {
            const comenUs = coments.find(c => c.uid === uid);
            // console.log("comenUs", comenUs)
            if (comenUs) {
                setComentUser(comenUs);
                setTieneComent(true);
            }
        }
    }

    const onSaveOpinion = async () => {
        if (rating == 0) {
            Toast.show('Asigne una calificación.', {
                position: Toast.positions.CENTER
            })
            return;
        } else if (text == "") {
            Toast.show('Agregue un comentario.', {
                position: Toast.positions.CENTER
            })
            return;
        }
        let foto = "default";
        if (photo) {
            foto = photo;
        }
        if (!tiene) {
            await addNewComent(place_id, foto, name, rating, text, uid).then(async () => {
                hideModal();
                Toast.show('Calificación y comentario guardados.', {
                    position: Toast.positions.CENTER
                })
                await actualizaMyComent()
            }).catch((e) => {
                // console.log(e)
                Toast.show('Hubo un error al intentar guardar.', {
                    position: Toast.positions.CENTER
                })
            })
        } else {
            await updateComent(uid, place_id, foto, name, rating, text).then(async () => {
                hideModal();
                Toast.show('Calificación y comentario guardados.', {
                    position: Toast.positions.CENTER
                })
                await actualizaMyComent()
            }).catch((e) => {
                // console.log(e)
                Toast.show('Hubo un error al intentar guardar.', {
                    position: Toast.positions.CENTER
                })
            })
        }
    }

    return (
        <View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerModal}>
                    <Text>Califica el restaurante:</Text>
                    <Calificacion rating={rating == 0 ? oldRating : rating} setRating={setRating} disabled={false} />
                    <Text>Comentario:</Text>
                    <TextInput
                        placeholder='Comentario...'
                        multiline={true}
                        numberOfLines={4}
                        style={forms.inputArea}
                        maxLength={300}
                        underlineColor="transparent"
                        onChangeText={(value) => setText(value)}
                        value={text == "" ? oldText : text}
                    />
                    <View>
                        <Button mode='contained' onPress={onSaveOpinion}>
                            Guardar
                        </Button>
                    </View>
                </Modal>
            </Portal>
            <Button mode='contained' onPress={showModal}>
                {tiene ? "Editar calificación y comentario" : "Agregar calificación y comentario"}
            </Button>
        </View>
    );
}