import { useEffect, useState } from 'react';
import './App.css';
import clouds from './images/Clouds.png';
import rain from './images/Rain.png';
import clear from './images/Clear.png';
import snow from './images/Snow.png';

const url = `https://api.openweathermap.org/data/2.5/forecast?q=`;
const apiKey = `6507ec9c905f52f3550a3737b29ef566`;

function App() {
  // State values
  const [cities, setCities] = useState([]);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch data for all 3 cities
  const fetchData = async () => {
    try {
      // Resolve all promises and store data in array
      const cities = await Promise.all([
        fetch(`${url}ottawa&appid=${apiKey}`).then((res) => res.json()),
        fetch(`${url}moscow&appid=${apiKey}`).then((res) => res.json()),
        fetch(`${url}tokyo&appid=${apiKey}`).then((res) => res.json()),
      ]);
      // set new values of cities array
      setCities(cities);

      setLoading(false);
    } catch (error) {
      console.log(`There has been a error: ${error}`);
    }
  };

  // Weather descriptions
  const currentWeather = cities[value]?.list[0].weather[0]?.main.toLowerCase();

  const dayOneWeather = cities[value]?.list[3].weather[0]?.main.toLowerCase();

  const dayTwoWeather = cities[value]?.list[11].weather[0]?.main.toLowerCase();

  const dayThreeWeather =
    cities[value]?.list[19].weather[0]?.main.toLowerCase();

  const dayFourWeather = cities[value]?.list[27].weather[0]?.main.toLowerCase();

  // Convert Kelvins to Celsius
  const toCelsius = (num) => {
    return Math.floor(num - 273.15);
  };

  // Get dates and format
  const moment = require('moment');
  let dayOneDate = moment().add(1, 'days').format('dddd').slice(0, 3);
  let dayTwoDate = moment().add(2, 'days').format('dddd').slice(0, 3);
  let dayThreeDate = moment().add(3, 'days').format('dddd').slice(0, 3);
  let dayFourDate = moment().add(4, 'days').format('dddd').slice(0, 3);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className='loading'>
        <h1>loading...</h1>
      </section>
    );
  }

  return (
    <>
      <main className='wrapper'>
        <article className='app-container'>
          <nav className='nav'>
            <ul className='cities-list'>
              {cities.map((city, index) => {
                const cityName = city.city.name;
                return (
                  <li className='city' key={index}>
                    <button
                      onClick={() => setValue(index)}
                      className={`city-btn ${index === value && 'active-btn'}`}
                    >
                      {cityName}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          <section className='weather-container'>
            <div className='current-weather-container'>
              <h3 className='today'>today</h3>
              <div className='icon-temp-container'>
                <img
                  className='feature-img'
                  src={
                    currentWeather === 'snow'
                      ? snow
                      : currentWeather === 'clouds'
                      ? clouds
                      : currentWeather === 'rain'
                      ? rain
                      : currentWeather === 'clear'
                      ? clear
                      : clear
                  }
                  alt={currentWeather}
                />

                <div className='temp-container'>
                  <p className='featured-temp'>
                    {`${toCelsius(cities[value]?.list[0].main.temp)}°`}
                  </p>
                  <p className='current-weather'>{currentWeather}</p>
                </div>
              </div>
            </div>
            <div className='weekly-forecast-container'>
              <div className='single-day-forecast-container'>
                <h3 className='title'>{dayOneDate}</h3>
                <img
                  src={
                    dayOneWeather === 'snow'
                      ? snow
                      : dayOneWeather === 'clouds'
                      ? clouds
                      : dayOneWeather === 'rain'
                      ? rain
                      : dayOneWeather === 'clear'
                      ? clear
                      : clear
                  }
                  alt={dayOneWeather}
                />

                <p className='temp'>
                  {`${toCelsius(cities[value]?.list[3].main.temp)}°`}
                </p>
              </div>
              <div className='single-day-forecast-container'>
                <h3 className='title'>{dayTwoDate}</h3>
                <img
                  src={
                    dayTwoWeather === 'snow'
                      ? snow
                      : dayTwoWeather === 'clouds'
                      ? clouds
                      : dayTwoWeather === 'rain'
                      ? rain
                      : dayTwoWeather === 'clear'
                      ? clear
                      : clear
                  }
                  alt={dayTwoWeather}
                />

                <p className='temp'>
                  {`${toCelsius(cities[value]?.list[11].main.temp)}°`}
                </p>
              </div>
              <div className='single-day-forecast-container'>
                <h3 className='title'>{dayThreeDate}</h3>
                <img
                  src={
                    dayThreeWeather === 'snow'
                      ? snow
                      : dayThreeWeather === 'clouds'
                      ? clouds
                      : dayThreeWeather === 'rain'
                      ? rain
                      : dayThreeWeather === 'clear'
                      ? clear
                      : clear
                  }
                  alt={dayThreeWeather}
                />

                <p className='temp'>
                  {`${toCelsius(cities[value]?.list[19].main.temp)}°`}
                </p>
              </div>
              <div className='single-day-forecast-container'>
                <h3 className='title'>{dayFourDate}</h3>
                <img
                  src={
                    dayFourWeather === 'snow'
                      ? snow
                      : dayFourWeather === 'clouds'
                      ? clouds
                      : dayFourWeather === 'rain'
                      ? rain
                      : dayFourWeather === 'clear'
                      ? clear
                      : clear
                  }
                  alt={dayFourWeather}
                />
                <p className='temp'>
                  {`${toCelsius(cities[value]?.list[27].main.temp)}°`}
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

export default App;
