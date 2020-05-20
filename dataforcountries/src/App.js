import React, { useState, useEffect } from 'react';
import CountryService from './services/countries';

import SearchForm from './components/SearchForm';
import CountryDisplay from './components/CountryDisplay';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    CountryService
      .getAll()
      .then(response => {
        setCountries(response);
    });
  }, []);

  const handleSearchForm = (event) => {
    setSearchInput(event.target.value);
  }

  const getFilteredCountries = () => {
    if (searchInput !== "") {
      return countries.filter(country => 
        country.name.toLowerCase()
        .includes(searchInput.toLowerCase()));
    } else {
      return;
    }
  }

  return (
    <div className="App">
      <SearchForm value={searchInput} onChange={handleSearchForm}/>
      <CountryDisplay countries={getFilteredCountries()}></CountryDisplay>
    </div>
  );
}

export default App;
