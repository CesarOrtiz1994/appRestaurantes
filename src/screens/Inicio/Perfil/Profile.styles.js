import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 30,
    },
    containerUser: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
  image: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  text1: {
    fontSize: 26,
    marginTop: 20
  },
  text2: {
    fontSize: 14,
    marginBottom: 20,
    color: Colors.NREGO_TRANSPARENTE_32,
  },
  btnEditar: {
    marginTop: 20,
    marginBottom: 20
  },
  btnCerrar: {
    marginTop: 50,
    marginBottom: 20
  },
  iconFav: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  }
  });