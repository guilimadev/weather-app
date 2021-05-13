import './App.css';
import React, { useState } from 'react';

const api = {
  key: "f47d0c7f86f35258f275abc8fa10f6d5 ",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeathter] = useState({});
  const [dayornight, setDayorNight] = useState('');
  const urlIcon = 'http://openweathermap.org/img/wn/';



  const search = evt => {
    
    if(evt.key === "Enter") {      
      

      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeathter(result);
        setQuery('');
        
      if(typeof result.main != "undefined"){


        let sunset = result.sys.sunset
        let date = new Date(sunset * 1000);      

        
        let now = new Date();      

        let timezoneHours = now.getUTCHours() + result.timezone/3600;

        console.log(date.getHours(), timezoneHours)
        if(date.getHours() > timezoneHours){          
          setDayorNight('Day');
        
          
        } else{
      
          setDayorNight('Night');
      
        }
          console.log(dayornight)
      } 
      });

      nightOrDay();

    }
        
  }

  const nightOrDay = () =>{
    if(typeof weather.main != "undefined") {  
      let sunset = weather.sys.sunset
      let date = new Date(sunset * 1000);      

      
      let now = new Date();      

      let timezoneHours = now.getUTCHours() + weather.timezone/3600;

      
      if(date.getHours() > timezoneHours){          
        setDayorNight('Day');
       
        
      } else{
     
        setDayorNight('Night');
    
      }
    }
  }

  const dateBuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    
    let month = months[d.getMonth()];
    let year = d.getFullYear();
       

    return `${day} ${date} ${month} ${year}`

    
  }

  const currentTime = (t) => {
    //Sunset from current search result  
    

    
    let now = new Date();   
   

    let timezoneHours = now.getUTCHours() + weather.timezone/3600;


    
    
    let minutes = now.getUTCMinutes();
    
    if(now.getUTCMinutes() < 10){
      minutes = `0${now.getUTCMinutes}`
    }

    return `${timezoneHours}:${minutes}`
  }

  

  return (
    
    <div className={
      (typeof weather.main != "undefined") ? 
        (weather.main.temp < 17 && dayornight === 'Night') ? 'app coldnight' :     
        (weather.main.temp < 17 && dayornight === 'Day') ? 'app coldday' :
        (weather.main.temp > 17 && dayornight === 'Night') ? 'app warmnight' :
        (weather.main.temp > 17 && dayornight === 'Day') ? 'app warmday' : 'app'
      : 'app'}>
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
              <div className="date">{dateBuilder(new Date())} <br /> {dayornight} <br /> {currentTime()}</div>
            </div>

            <div className="weather-box">
              <div className="temp"> {Math.round(weather.main.temp)}°c</div> 
              <div className="weather">{weather.weather[0].main}
              <img src={`${urlIcon}${weather.weather[0].icon}@2x.png`} alt="" /></div>
            </div>
          </div>
        ): ('')}
      </main>
    </div>
  );
}

export default App;
