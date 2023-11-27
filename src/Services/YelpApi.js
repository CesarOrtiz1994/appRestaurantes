import axios from "axios"
import { ENV } from "../utils/constants";

const getRestaurantsNearYelp = async (lat, lng) => await axios.get("https://api.yelp.com/v3/businesses/search?" +
    "latitude=" + lat +
    "&longitude=" + lng +
    "&radius=" + ENV.RADIUS_SEARCH +
    // "&categories=mexican" +
    "&locale=es_MX&sort_by=best_match"
    , {
        headers: {
          'Authorization': 'Bearer '+ENV.API_YELP.KEY
        }
      });

export default{
    getRestaurantsNearYelp
}