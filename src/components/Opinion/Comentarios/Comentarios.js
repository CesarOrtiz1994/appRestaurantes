import { View, Text } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper';
import { Calificacion } from '../Calificacion';
import { styles } from './Comentarios.styles';

export default function Comentarios(params) {
  const { reviews } = params;

  return (
    <View>
      {reviews &&
        reviews.map((coment, index) => (
          <View key={index} style={styles.cardComent}>
            <Avatar.Image size={60} source={{ uri: coment.profile_photo_url }} style={styles.reviewAvatar} />
            <View style={styles.sectionTextReview}>
              <Text style={styles.reviewName}>{coment.author_name}</Text>
              <Calificacion rating={coment.rating} disabled={true} size={20} />
              <Text style={styles.reviewText}>{coment.text}</Text>
            </View>
          </View>
        ))
      }
    </View>
  )
}