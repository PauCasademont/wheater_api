import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Typography, Paper, Grid} from "@material-ui/core";
import SearchBar from './SearchBar';
import Map from './Map'

const url = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = '2b2e74e806c9ffe705e07584971c14f6'

function App() {
    
    const [region, setRegion] = useState('girona')
    const [regionCoord, setRegionCord] = useState(null)    
    const [weather, setWeather] = useState({})

    useEffect(() => {

        axios.get(url, {
            params: {
                q: region,
                appid: api_key
            }
             
        }).then(res => {
            
            setWeather({
                description: res.data.weather[0].description,
                temperature: (res.data.main.temp - 273.15).toFixed(2)
            })   
            setRegionCord({
                lat: res.data.coord.lat,
                lon: res.data.coord.lon
            })                      

        }).catch(error => {
            console.log(error)
        })
    }, [region])

    return (
        <React.Fragment>
            <Grid 
                container
                spacing={0}
                direction="column"
                alignItems="center"                
                style={{ marginTop: '5vh' }}
            >
                <SearchBar setRegion={setRegion} />
                <Paper elevation={3} style={{ marginTop: '3vh', padding: '15px' }} >
                    <Typography align="center">{region}</Typography>
                    <Typography align="center">{weather.description}</Typography>
                    <Typography align="center">{weather.temperature} ºC</Typography>     
                </Paper>
            </Grid>    
            <Map regionCoord={regionCoord} regionName={region}/>   
        </React.Fragment>        
    )
    
}

export default App;