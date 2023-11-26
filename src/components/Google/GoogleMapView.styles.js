import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        borderRadius: 20,
        overflow:'hidden',
        borderWidth: 1,
        borderColor: "#FF5C00"
    },
    map: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height*0.4,
        
    },

})