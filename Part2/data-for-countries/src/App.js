import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Countries from './components/Countries';

//Api to use https://restcountries.eu/rest/v2/all
//PROVIDED WEATHER API IS NOT WORKING! NO CONNECTION WITH THE SERVER!

  //Api key access
  const api_key = process.env.REACT_APP_API_KEY;

  console.log(api_key)
const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');
  const [weather, setWeather] = useState([]);
  const [capital, setCapital] = useState('Tbilisi');


  //fetch data from the server
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
         .then(res => {
           setCountries(res.data)
         })
  }, []);

  //fetch weather data
  useEffect(() => {
    const getWeather = async (capital) => {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      );
      console.log(response);
      return response;
    }
    getWeather()
  }, [capital])



  //handling the app changes
  const handleFilterUpdate = event => {
    event.preventDefault();
    setNewFilter(event.target.value);
  }

  return (
    <>
      <h1>Search for your desired Country</h1>
      <input type='text' value={newFilter} onChange={handleFilterUpdate} />
      <Countries countries={countries} filter={newFilter} handleFilterUpdate={handleFilterUpdate} />
    </>
  )
}
export default App;