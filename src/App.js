import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Typography, Paper, Grid} from "@material-ui/core";
import SearchBar from './SearchBar';
import Map from './Map'
import swal from 'sweetalert'
import './app.css'

const url = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = '2b2e74e806c9ffe705e07584971c14f6'

function App() {
    
    const [region, setRegion] = useState(null)
    const [regionCoord, setRegionCord] = useState(null)    
    const [weather, setWeather] = useState({})

    useEffect(() => {
        if(region){
            axios.get(url, {
                params: {
                    q: region,
                    appid: api_key
                }
                
            }).then(res => {
                
                setWeather({
                    regionName: region.charAt(0).toUpperCase() + region.slice(1),
                    description: res.data.weather[0].description,
                    temperature: ((res.data.main.temp - 273.15).toFixed(2)).toString() + ' ºC'
                })   
                setRegionCord({
                    lat: res.data.coord.lat,
                    lon: res.data.coord.lon
                })                      

            }).catch(error => {
                console.log(error)                
                setWeather({})
                swal({
                    title: "Error finding location",
                    text: `Location ${region} does not exist`,
                    icon: "error"
                })
            })
        }
    }, [region])

    return (
        <>
            <Grid 
                container
                spacing={0}
                direction="column"
                alignItems="center"                
                style={{ marginTop: '5vh' }}
            >
                <SearchBar setRegion={setRegion} />
                <Paper elevation={3} style={{ marginTop: '3vh', padding: '15px', backgroundColor: '#A2B6FB' }} >
                    <Typography align="center">{weather.regionName || 'Location'}</Typography>
                    <Typography align="center">{weather.description || 'Weather'}</Typography>
                    <Typography align="center">{weather.temperature || 'Temperature'}</Typography>     
                </Paper>
            </Grid>    
            <Map regionCoord={regionCoord} regionName={weather.regionName}/>   
        </>        
    )
    
}

export default App;