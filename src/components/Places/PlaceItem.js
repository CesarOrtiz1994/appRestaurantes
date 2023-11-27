import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { styles } from './PlaceItem.styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ENV } from '../../utils/constants'

export default function PlaceItem({ place }) {
    // console.log(place.photos)
    const [sourceImg, setSourceImg] = useState(require('../../assets/image-placeholder.png'))

    useEffect(()=>{
        if(place.photos != undefined) {
            setSourceImg({ uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400"+
            "&photo_reference="+ place?.photos[0]?.photo_reference +
            "&key="+ENV.API_GOOGLE_MAPS.KEY});
        }
    },[place])

    return (
        <View style={styles.container}>
            <Image source={ sourceImg } style={styles.image} />
            <View style={styles.desciption}>
                <Text numberOfLines={2} style={[styles.text, styles.textName]}>{place.name}</Text>
                <Text numberOfLines={2} style={[styles.text, styles.textAddress]}>{place.vicinity}</Text>
                <View style={styles.sectionRating}>
                    <AntDesign name="star" style={styles.ratingStar} />
                    <Text>{place.rating}</Text>
                </View>
            </View>
        </View>
    )
}