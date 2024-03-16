import React from 'react';
import './Description.css';
import {
  FaArrowDown,
  FaArrowUp,
  FaWind
} from 'react-icons/fa';
import {
  BiHappy
} from 'react-icons/bi';
import {
  MdCompress,
  MdOutlineWaterDrop
} from 'react-icons/md'

function description(weather, units) {
  //console.log(weather.weather.temp)
  // console.log(weather)
  const tempUnits = weather.units === 'metric' ? 'ºC' : 'ºF';
  // console.log(tempUnits)
  const windUnit = weather.units === 'metric' ? 'm/s' : 'm/h';

  const cards = [
    {
      id: 1,
      icon: <FaArrowDown />,
      title: 'min',
      value: weather.weather.temp_min.toFixed(),
      unit: tempUnits,
    },
    {
      id: 2,
      icon: <FaArrowUp />,
      title: 'max',
      value: weather.weather.temp_max.toFixed(),
      unit: tempUnits,
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: 'feels like',
      value: weather.weather.feels_like.toFixed(),
      unit: tempUnits,
    },
    {
      id: 4,
      icon: <MdCompress />,
      title: 'pressure',
      value: weather.weather.pressure,
      unit: "hPa",
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: 'humidity',
      value: weather.weather.humidity,
      unit: "%",
    },
    {
      id: 6,
      icon: <FaWind />,
      title: 'wind speed',
      value: weather.weather.speed,
      unit: windUnit,
    },
  ]
  return (
    <div className="section section__description">
      {cards.map(({ id, icon, title, value, unit }) => (
        <div key={id} className="card">
            <div className="description__card-icon">
                  {icon}
                  <small>{title}</small>
              </div>
          <h2>{`${value} ${unit}`}</h2>
          </div>
      ))} 
    </div>
  )
}

export default description