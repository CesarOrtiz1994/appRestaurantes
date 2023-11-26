import axios from "axios"
import { ENV } from "../utils/constants";

const BASE_URL="https://maps.googleapis.com/maps/api/place"

const nearByPlace = (lat, lng) => axios.get(BASE_URL+
    "/nearbysearch/json?"+
    "&location="+ lat + "," + lng +
    "&radius=1500"+
    "&type=restaurant"+
    "&key="+ENV.API_GOOGLE_MAPS.KEY);

export default{
    nearByPlace
}
