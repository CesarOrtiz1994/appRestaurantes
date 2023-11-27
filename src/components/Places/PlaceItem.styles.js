import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginTop: 20,
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 15
    },
    ratingStar: {
        color: Colors.NARANJA,
        fontSize: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 5,
    },
    sectionRating: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    desciption: {
        flex: 1,
    },
    textAddress: {
        color: 'rgba(0, 0, 0, 0.32)'
    },
    textName: {
        color: Colors.VERDE
    },
})