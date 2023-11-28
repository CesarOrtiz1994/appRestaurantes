import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom: 10,
    },
    iconFav: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 10,
    },
    lineDesc: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    lineRow: {
        marginTop: 10,
    },
    lineFav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    textCampo: {
        backgroundColor: Colors.VERDE,
        borderRadius: 15,
        color: "#fff",
        textAlign: 'center',
        fontSize: 16,
        marginRight: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    textDesc: {
        fontSize: 16,
        textAlignVertical: 'top',
    },
    ratingStar: {
        color: Colors.NARANJA,
        fontSize: 20,
    },
    sectionButtons: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    divider: {
        marginTop: 10,
    },
    textIndications: {
        marginTop: 10,
        fontSize: 16,
    },
    myComent: {
        fontSize: 16,
        color: Colors.NREGO_TRANSPARENTE_32,
        marginTop: 10,
        marginBottom: 10,
    },
    nameComponent: {
        flex: 1,
    },
});