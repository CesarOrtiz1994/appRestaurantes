import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    cardComent: {
        marginTop: 10,
        borderColor: Colors.VERDE,
        borderRadius: 16,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#fff'
    },
    sectionTextReview: {
        flex: 1,
    },
    reviewName: {
        fontSize: 18,
    },
    reviewText: {
        fontSize: 14,
        color: Colors.NREGO_TRANSPARENTE_32,
    },
    reviewAvatar: {
        marginStart: 5,
    },
})