import React, { useEffect, useState } from 'react'
import { Country, State, City } from "country-state-city";
const StateCityCountry = () => {
    const [countries, setCountries] = useState<any>([]);
    const [states, setStates] = useState<any>([]);
    const [cities, setCities] = useState<any>([]);
  
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
  
    useEffect(() => {
      setCountries(Country.getAllCountries());
    }, []);
  
    useEffect(() => {
      if (selectedCountry) {
        setStates(State.getStatesOfCountry(selectedCountry));
      } else {
        setStates([]);
      }
      setSelectedState("");
      setSelectedCity("");
    }, [selectedCountry]);
  
    useEffect(() => {
      if (selectedState) {
        setCities(City.getCitiesOfState(selectedCountry, selectedState));
      } else {
        setCities([]);
      }
      setSelectedCity("");
    }, [selectedState, selectedCountry]);
  return ( 
  <form>
    <div>
      <label htmlFor="country">Country:</label>
      <select
        id="country"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">Select Country</option>
        {countries.map((country:any) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label htmlFor="state">State:</label>
      <select
        id="state"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">Select State</option>
        {states.map((state:any) => (
          <option key={state.isoCode} value={state.isoCode}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label htmlFor="city">City:</label>
      <select
        id="city"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">Select City</option>
        {cities.map((city:any) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  </form>
);
};

export default StateCityCountry