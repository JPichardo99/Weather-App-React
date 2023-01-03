import { useEffect, useState } from 'react';
import './App.css';
import Icons from './components/icons';

function App() {
  const [search, setSerch] = useState('new york')
  const [values, setValues] = useState('')
  const [icon, setIcon] = useState('')
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=${process.env.REACT_APP_API_KEY}`

  const getData = async () => {
    await fetch(URL)
      .then(response => { return response.json() })
      .then(data => {
        if (data.cod >= 400) {
          setValues(false)
        } else {
          setIcon(data.weather[0].main)
          setValues(data)
        }
        //console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSerch(e.target.value)
    } else {

    }
  }

  useEffect(() => {
    getData()
  }, [search])
  return (
    <>
      <div className="container">
        <div className='row'>
          <input
            onKeyDown={handleSearch}
            type="text"
            autoFocus
            placeholder='Ingresa el nombre de una ciudad'
          />
        </div>
      </div>
      <div className='card'>
        {(values) ? (
          <div className='card-container'>
            <h1 className='city-name'>{values.name}</h1>
            <p className='temp'>{values.main.temp.toFixed(0)}&deg;</p>
            <img className='icon' src={Icons(icon)} alt='icon-wather' />
            <div className='card-footer'>
              <p className='temp-max-min'>{values.main.temp_min.toFixed(0)}&deg;  | {values.main.temp_max.toFixed(0)}&deg;</p>
            </div>
          </div>
        ) : (
          <h1>{"Ciudad no encontrada"}</h1>
        )}
      </div>
    </>
  );
}

export default App;
