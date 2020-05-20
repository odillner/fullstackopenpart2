import axios from 'axios';

const baseUrl = 'http://api.weatherstack.com/';
const key = process.env.REACT_APP_API_KEY;

const getWeatherInCountry = (country) => {
    const requestUrl = baseUrl + "current?access_key=" + key + "&query=" + country;

    const request = axios.get(requestUrl);
    return request.then(response => response.data);
}

export default {getWeatherInCountry};