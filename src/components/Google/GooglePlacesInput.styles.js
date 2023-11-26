import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 0,
        marginHorizontal: 30,
    },
    description: {
        color: Colors.VERDE,
        fontSize: 16,
    },
    predefinedPlacesDescription: {
        // color: '#3caf50',
        color: 'blue',
    },
    textInput: {
        borderColor: Colors.NARANJA,
        borderWidth: 1,
        fontSize: 20,
        color: Colors.VERDE,
        marginTop: 20
    },
    row: {
        borderRadius: 8, 
    }
})