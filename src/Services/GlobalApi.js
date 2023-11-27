import axios from "axios"
import { ENV } from "../utils/constants";

const BASE_URL="https://maps.googleapis.com/maps/api/place"

const nearByPlace = (lat, lng, type) => axios.get(BASE_URL+
    "/nearbysearch/json?"+
    "&location="+ lat + "," + lng +
    "&radius=" + ENV.RADIUS_SEARCH +
    "&type=" + type +
    "&key="+ENV.API_GOOGLE_MAPS.KEY);

const searchPlaceById = async (place_id) => axios.get(BASE_URL+
    "/details/json?" +
    "&place_id="+ place_id +
    "&language=es" +
    "&key="+ENV.API_GOOGLE_MAPS.KEY);

export default{
    nearByPlace,
    searchPlaceById
}
