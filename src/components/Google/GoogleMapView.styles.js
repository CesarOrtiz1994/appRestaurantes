import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        borderRadius: 20,
        overflow:'hidden',
        borderWidth: 1,
        borderColor: Colors.NARANJA,
        marginBottom: 10,

    },
    map: {
        width: Dimensions.get('screen').width*0.9,
        height: Dimensions.get('screen').height*0.4,
        
    },

})