import React, {useState, useEffect} from 'react';
import WeatherService from '../services/weather';

const WeatherDisplay = (props) => {
    const [weather, setWeather] = useState({});
    
    useEffect(() => {
        WeatherService
            .getWeatherInCountry(props.country.name.toLowerCase())
            .then(response => {
                setWeather(response);
            });
    }, []);

    if (weather == undefined) {
        return <div/>
    }
    if (Object.entries(weather).length !== 0) {
        return (
            <div>
                <h3>Weather in {weather.location.name}</h3>
                <p><b>temperature:</b>{weather.current.temperature} Celcius</p>
                <img width="100" height="100" src={weather.current.weather_icons[0]} alt="404"/>
            </div>
        )
    } else {
        return (
            <div/>
        )
    }
}

export default WeatherDisplay;
