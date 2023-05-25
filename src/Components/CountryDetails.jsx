import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const apiURL = "https://ih-countries-api.herokuapp.com/countries";

function CountryDetails() {
  const [fetching, setFetching] = useState(false);
  const [country, setCountry] = useState(null);
  const { alpha3Code } = useParams(); // Access the URL parameter

  useEffect(() => {
    axios.get(`${apiURL}/${alpha3Code}`).then((response) => {
      setCountry(response.data);
      setFetching(true);
    });
  }, [alpha3Code]);

  if (!fetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-7">
      <h1>{country.name.common}</h1>
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: "30%" }}>Capital</td>
            <td>{country.capital}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {country.area} km<sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
                {country.borders.map((border) => (
                  <li key={border}>
                    <Link to={`/${border}`}>{border}</Link>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CountryDetails;
