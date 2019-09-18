import { GOOGLE_API_KEY } from './constants'
import axios from 'axios'

const GOOGLE_MAP_API= 'https://maps.googleapis.com/maps/api'

export class GoogleMapsUtils {

    getNearbyPlaces = async (params) => {
        let { latitude, longitude } = params
        return await axios.get(`${GOOGLE_MAP_API}/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&key=${GOOGLE_API_KEY}`)
    }

    getPlacesBySearch = async (params) => {
        // https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=YOUR_API_KEY&input=pizza+near%20par
        return await axios.get(`${GOOGLE_MAP_API}/place/autocomplete/json?input=${params}&key=${GOOGLE_API_KEY}&region=br`)
    }

    getLatLngByAddress = async (params) => {
        return await axios.get(`${GOOGLE_MAP_API}/geocode/json?address=${params}&key=${GOOGLE_API_KEY}`)
    }

}