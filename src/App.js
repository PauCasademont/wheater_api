import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const url = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = '2b2e74e806c9ffe705e07584971c14f6'

function App() {
    
    const [region, setRegion] = useState('girona')
    const [weather, setWeather] = useState('')
    const [temperature, setTemperature] = useState('')

    useEffect(() => {

        axios.get(url, {
            params: {
                q: region,
                appid: api_key
            } 
        }).then(res => {

            setWeather(res.data.weather[0].description)
            setTemperature( (res.data.main.temp - 273.15).toFixed(2) )

        }).catch(error => {
            console.log(error)
        })
    }, [region])
    return (
        <React.Fragment>
            <SearchBar onSubmit={setRegion} />
            <div>{weather}</div>
            <div>{temperature}ºC</div>
        </React.Fragment>        
    )
    
}

export default App;