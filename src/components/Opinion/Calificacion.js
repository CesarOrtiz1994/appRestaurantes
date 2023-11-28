import React, { useState } from 'react'
import { Icon, IconButton } from 'react-native-paper';
import Colors from "../../constants/Colors"
import { View } from 'react-native';
import { styles } from './Calificacion.styles';

export const Calificacion = ({ rating, setRating, disabled, size }) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
        const type = i < rating ? 'star' : 'star-outline';
        stars.push(
            disabled ?
                <Icon
                key={i}
                source={type}
                color={Colors.NARANJA}
                size={size}
                />
            :
                <IconButton
                    key={i}
                    style={styles.iconStar}
                    icon={type}
                    iconColor={Colors.NARANJA}
                    size={30}
                    onPress={() => setRating(i + 1)}
                />
            
        );
    }

    return <View style={styles.container}>{stars}</View>;
}