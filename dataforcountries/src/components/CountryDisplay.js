import React, {useState, useEffect} from 'react';
import WeatherService from '../services/weather';

const ShowSuggestionButton = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

const SingleSuggestionDisplay = (props) => {
    const [show, setShow] = useState(false);

    const handleShowSuggestionButton = (event) => {
        setShow(!show);
    }

    if (show) {
        return (
            <div>
                <ShowSuggestionButton onClick={handleShowSuggestionButton} text="hide"/>
                <SingleCountryDisplay country={props.country}/>
            </div>
        )
    } else {
        return (
            <p>
                {props.country.name}
                <ShowSuggestionButton onClick={handleShowSuggestionButton} text="show"/>
            </p>
        )
    }
}

const SuggestionDisplay = (props) => {
    return (
        <div>
            {props.countries.map(country => 
                <div key={country.name}>
                    <SingleSuggestionDisplay country={country}/>
                </div>
            )}
        </div>
    );
}

const WeatherDisplay = (props) => {
    if (Object.entries(props.weather).length !== 0) {
        return (
            <div>
                <h3>Weather in {props.weather.location.name}</h3>
                <p><b>temperature:</b>{props.weather.current.temperature} Celcius</p>
                <img width="100" height="100" src={props.weather.current.weather_icons[0]} alt="404"/>
            </div>
        )
    } else {
        return (
            <div/>
        )
    }
}

const SingleCountryDisplay = (props) => {
    const country = props.country;
    const [weather, setWeather] = useState({});
    
    useEffect(() => {
        WeatherService
            .getWeatherInCountry(country.name.toLowerCase())
            .then(response => {
                setWeather(response);
            });
    }, []);
    
    return (
        <div className="SingleCountryDisplay">
            <h1>{country.name}</h1>
            Capital: {country.capital}
            <br></br>
            Population: {country.population}

            <h3>Languages:</h3>
            {country.languages.map(language => <p key={language.name}>*{language.name}</p>)}

            <img width="300" height="200" src={country.flag} alt="404"/>

            <WeatherDisplay weather={weather}/>
        </div>
    )
}

const CountryDisplay = (props) => {
    const countries = props.countries;

    if (countries) {
        if (countries.length < 10) {
            if (countries.length > 1) {
                return (
                    <SuggestionDisplay countries={countries}/>
                );
            } else {
                if (countries.length === 1) {
                    const country = countries[0];
        
                    return (
                        <SingleCountryDisplay country={country}/>
                    )
                } else {
                    return (
                        <div/>
                    )
                }
            }
        } else {
            return (
                <div>
                    Too many matches, be more specific
                </div>
            )
        }
    } else {
        return (
            <div>
                No matches
            </div>
        )
    }

}

export default CountryDisplay;
