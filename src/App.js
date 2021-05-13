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
  const [otherDay, setOtherDay] = useState(false)
  const urlIcon = 'http://openweathermap.org/img/wn/';



  const search = evt => {
    
    if(evt.key === "Enter") {      
      

      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeathter(result);
        setQuery('');
        
      if(typeof result.main != "undefined"){

        //Defining if it's day or night
        let date = result.sys.sunset
        let sunset = new Date(date * 1000);   
  
                
        let now = new Date();      
  
        let timezoneHours = now.getUTCHours() + (result.timezone/3600);
  
        let x = new Date();
        let localOffSet = x.getTimezoneOffset()
        let diffOffset = (result.timezone/3600) + (localOffSet/60)
  
        let sunsethours = sunset.getHours() + diffOffset
        if(sunsethours < 13){
          sunsethours = 19;
        }        
        
        if(timezoneHours >= 24){
          timezoneHours = timezoneHours- 24
        }  
        if(sunsethours < timezoneHours){          
          setDayorNight('Night');                                    
        } else if((sunsethours === timezoneHours) && (sunset.getMinutes() < now.getUTCMinutes())){
          setDayorNight('Night');                 
         } else {
          setDayorNight('Day');         
        } 

        // Defining if already pass a day from UTC

        let now2 = new Date();   
   

        let timezoneHours2 = now2.getUTCHours() + result.timezone/3600;
      
        
        let minutes2 = `${now2.getUTCMinutes()}`
        
        if(now2.getUTCMinutes() < 10){
          minutes2 = '0' + now2.getUTCMinutes()
        }

        
        
        if(timezoneHours2 >= 24){
          setOtherDay(true);
          timezoneHours = timezoneHours2 - 24         
          if(timezoneHours2 < 10){
            timezoneHours2 = '0' + timezoneHours2;
          } 

          let sunrisehours = result.sys.sunrise
          
          let sunrise = new Date(sunrisehours * 1000)
          
          if( (sunrise.getHours() + diffOffset) - 24 <= timezoneHours){
            if(sunrise.getUTCMinutes() < now2.getUTCMinutes()){
              setDayorNight('Day');
            }
            
          }         
        }
        else {
          setOtherDay(false)
        }
        

               
      } 

     
      });
      dateBuilder(new Date()); 
      nightOrDay();

    }
        
  }

  const nightOrDay = () =>{
    if(typeof weather.main != "undefined") {  
      let date = weather.sys.sunset
      let sunset = new Date(date * 1000);   


     

      

      
      let now = new Date();      

      let timezoneHours = now.getUTCHours() + (weather.timezone/3600);

      let x = new Date();
      let localOffSet = x.getTimezoneOffset()
      let diffOffset = (weather.timezone/3600) + (localOffSet/60)

      let sunsethours = sunset.getHours() + diffOffset
      if(sunsethours < 13){
        sunsethours = 19;
      }
      
      console.log(sunsethours, timezoneHours)
      if(timezoneHours >= 24){
        timezoneHours = timezoneHours- 24
      }     

      if(sunsethours > timezoneHours){
        setDayorNight('Night');
        console.log(sunsethours, timezoneHours)                         
      } else if(sunsethours === timezoneHours && sunset.getMinutes > now.getUTCMinutes())       
       {
          setDayorNight('Night');                 
       } else {
       setDayorNight('Day');   
    
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
    
    if(otherDay){
      day = days[d.getDay() + 1]
      date = date + 1      

      return `${day} ${date} ${month} ${year}`      
    }  else {
      return `${day} ${date} ${month} ${year}`
    }

    

    
  }

  const currentTime = () => {
    //Sunset from current search result    
    
    let now = new Date();   
    
    
    let timezoneHours = now.getUTCHours() + weather.timezone/3600;
   
    
    let minutes = now.getUTCMinutes()    
    

    if(now.getUTCMinutes() < 10){
      minutes = '0' + now.getUTCMinutes()
    }
    
    if(timezoneHours >= 24){     
      timezoneHours = timezoneHours - 24

      if(timezoneHours < 10){
        timezoneHours = '0' + timezoneHours;
      } 
    }
    
    return `${timezoneHours}:${minutes}`
  }

  

  return (
    
    <div className={
      (typeof weather.main != "undefined") ? 
        (weather.main.temp < 15 && dayornight === 'Night') ? 'app coldnight' :     
        (weather.main.temp < 15 && dayornight === 'Day') ? 'app coldday' :
        (weather.main.temp > 15 && dayornight === 'Night') ? 'app warmnight' :
        (weather.main.temp > 15 && dayornight === 'Day') ? 'app warmday' : 'app'
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
              <div className="date">{dateBuilder(new Date(), weather.sys.sunset)} <br /> {dayornight} <br /> Local time: {currentTime()}</div>
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
