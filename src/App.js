import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from './Components/Header';
import CountriesList from './Components/CountriesList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryDetails from './Components/CountryDetails';

const apiURL = 'https://ih-countries-api.herokuapp.com/countries';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(apiURL).then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="row">
          <CountriesList countries={countries} />
          <Routes>
            <Route path="/:alpha3Code" element={<CountryDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
