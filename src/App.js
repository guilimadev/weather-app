import './App.css';
import React, { useState } from 'react';

const api = {
  key: "f47d0c7f86f35258f275abc8fa10f6d5 ",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeathter] = useState({});

  const search = evt => {
    if(evt.key === "Enter") { 
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeathter(result);
        setQuery('');
      });
    }
  }


  const dateBuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    
    let month = months[d.getMonth()];
    let year = d.getFullYear();

   console.log({weather})

    return `${day} ${date} ${month} ${year}`

    
  }

  return (
    
    <div className={(typeof weather.main != "undefined") 
    ? ((weather.main.temp > 16) 
    ? 'app warm' 
    : 'app'): 'app'}>
      <main>
        <div className="search-box">

          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."

            onChange= {e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />

        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp"> {Math.round(weather.main.temp)}°c</div> 
              <div className="weather">{weather.weather[0].main}
              <img className={(typeof weather.main != "undefined") 
              ?  ((weather.weather[0].description === "scattered clouds") ? 'icon clouds' : (weather.weather[0].description === "clear sky") ? 'icon clear' : 'icon'): 'icon'}
               src="" alt="" /></div>
            </div>
          </div>
        ): ('')}
      </main>
    </div>
  );
}

export default App;
