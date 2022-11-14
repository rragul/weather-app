import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('London');
  const url = " http://api.weatherapi.com/v1";
  const key = "baa954a94d8a450784d82305221411";

   useEffect(() =>  {
     axios
      .get(`${url}/forecast.json?key=${key}&q=${location}&days=3`)
      .then((res) => setData(res.data));
  }, [location]);


  const searchLocation = async (e)=>{
    if(e.key === "Enter"){
     await axios
      .get(`${url}/forecast.json?key=${key}&q=${location}&days=2`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    } else{
      axios
      .get(`${url}/forecast.json?key=${key}&q=${location}&days=2`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  return (
    <div>
      <div className="container">
        <div className="input">
          <input
            type="text"
            placeholder="Enter Location"
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={searchLocation}
            autoFocus
          />
        </div>
        <div className="top">
          <div className="left-side">
            <div className="location">
              <div className="city">{data.location && data.location.name}</div>
              <div className="country">{data.location && data.location.country}</div>
            </div>
            <div className="tem">
              {Math.floor(data.current && data.current.temp_c)}°C
            </div>
          </div>
          <div className="description">
            <img
              src={data.current && data.current.condition.icon}
              alt="icon"
              className="icon"
            />
            <p>{data.current && data.current.condition.text}</p>
          </div>
        </div>

        <div className="middle">
          <div className="sun bold"><img src="https://cdn-icons-png.flaticon.com/128/8098/8098355.png" alt="img" />{data.forecast && data.forecast.forecastday[0].astro.sunrise}</div>
          <div className="sun bold"><img src="https://cdn-icons-png.flaticon.com/128/8098/8098358.png" alt="img" />{data.forecast && data.forecast.forecastday[0].astro.sunset}</div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">{Math.floor(data.current && data.current.feelslike_c)}°C</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">{data.current && data.current.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">{Math.floor(data.current && data.current.wind_kph)}Kph</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
