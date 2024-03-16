
import './App.css';
import Description from './components/Description.js';
import { useEffect, useState } from 'react';
import getFormattedWeatherData from './weatherService';

function App() {
  const hotBg = 'https://images.pexels.com/photos/72473/pexels-photo-72473.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&dpr=1'
  const coldBg = 'https://images.pexels.com/photos/512229/pexels-photo-512229.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&dpr=1'
  const [bg, setBg] = useState(hotBg)
  const [city, setCity] = useState('Delhi')

  const [weather, setWeather] = useState(null);

  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);
      //console.log(data);

      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg)
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    // console.log(currentUnit);

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? 'ºF' : 'ºC'
    setUnits(isCelsius ? 'metric' : 'imperial');
  }

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      e.currentTarget.blur();
      e.currentTarget.value = '';
    }
  }

  return (
    <div className="App" style={{backgroundImage: `url(${bg})`}}>
      <div className="overlay">
        {
          weather && (
          <div className="container">
          <div className="section section__inputs">
            <input type="text" name='city' placeholder='Enter City...' onKeyDown={enterKeyPressed}/>
            <button onClick={(e) => handleUnitsClick(e)}>ºF</button>
          </div>
          <div className="section section__temperature">
            <div className="icon">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={`${weather.iconURL}`} alt="weather Icon" />
              <h3>{`${weather.description}`}</h3>
            </div>
            <div className="temperature">
              <h1>
                {`${weather.temp.toFixed()}º ${units === 'metric' ? 'C' : 'F'}`}
              </h1>
            </div>
          </div>
          {/* {console.log(units)} */}
          <Description weather={weather} units={units} />
            </div>
          )
        }
        
      </div>
    </div>
  );
}

export default App;
