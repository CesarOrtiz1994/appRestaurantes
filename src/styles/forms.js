import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export const forms = StyleSheet.create({
    input: {
        marginBottom: 20,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderColor: "#747474",
        borderWidth: 1
    },
    buttonSubmit: {
        padding: 5,
        // color: "#000"
    },
    buttonText: {
        marginTop: 10,
    },
    buttonTextSecundary: {
        marginTop: 10,
        backgroundColor: Colors.NARANJA
    },
});