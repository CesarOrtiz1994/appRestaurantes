import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Modal, Portal, TextInput } from 'react-native-paper';
import { Calificacion } from './Calificacion';
import { forms } from "../../styles/forms"
import { styles } from './ModalOpinion.styles';
import Toast from 'react-native-root-toast';
import { addNewComent, updateComent } from '../../Services/ComentFirestorage';
import { useEffect } from 'react';

export default function ModalOpinion(params) {
    const {place_id, photo, name, oldRating, oldText, uid, tiene, indice } = params;
    const [visible, setVisible] = useState(false);
    const [rating, setRating] = useState(oldRating);
    const [text, setText] = useState(oldText);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(()=>{
        console.log(tiene)
    },[])

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
        const foto = "default";
        if(photo) {
            foto = photo;
        }
        if(!tiene) {
            await addNewComent(place_id, foto, name, rating, text, uid).then(() =>{
                hideModal();
                Toast.show('Calificación y comentario guardados.', {
                    position: Toast.positions.CENTER
                })
            }).catch((e)=>{
                // console.log(e)
                Toast.show('Hubo un error al intentar guardar.', {
                    position: Toast.positions.CENTER
                })
            })
        } else {
            await updateComent(place_id, indice, rating, text).then(() =>{
                hideModal();
                Toast.show('Calificación y comentario guardados.', {
                    position: Toast.positions.CENTER
                })
            }).catch((e)=>{
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
                    <Calificacion rating={rating} setRating={setRating} disabled={false} />
                    <Text>Comentario:</Text>
                    <TextInput
                        placeholder='Comentario...'
                        multiline={true}
                        numberOfLines={4}
                        style={forms.inputArea}
                        maxLength={300}
                        underlineColor="transparent"
                        onChangeText={(value) => setText(value)}
                        value={text}
                    />
                    <View>
                        <Button mode='contained' onPress={onSaveOpinion}>
                            Guardar
                        </Button>
                    </View>
                </Modal>
            </Portal>
            <Button mode='contained' onPress={showModal}>
                Agregar calificación y comentario
            </Button>
        </View>
    );
}