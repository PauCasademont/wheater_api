import React, {useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Grid, Button, Box } from "@material-ui/core"
import { LocationOn, MyLocation } from "@material-ui/icons"
import './map.css'

const zoom = 13;
const initialMapConfig = { coord: [30,10], zoom: 2}

function Map({ regionCoord, regionName }) {

    const [map, setMap] = useState(null); 
    const [coord, setCoord] = useState(null);
    const [locationPressed, setLocationPressed] = useState(false);

    function FlyToButton() {
      const onClick = () => {
        if(regionCoord){
          setLocationPressed(true)
          map.flyTo(regionCoord, zoom)
        }
      };

      return ( <Button              
                variant="contained"
                color="primary"
                startIcon={<LocationOn/>}
                className="button"
                onClick={onClick}
                >
                  Go to {regionName}
              </Button>)
    }

    function FindMeButton() {      

      const onClick = () => { 
        map.locate({
          setVeiw: true
        })
        map.on('locationfound', handleOnLocationFound)
      };

      return ( <Button               
                variant="contained"
                color="primary"
                startIcon={<MyLocation/>}
                className="button"
                onClick={onClick}
                >
                  Find Me
              </Button>)
    }

    function handleOnLocationFound(event) {
      setCoord(event.latlng)
      map.flyTo(event.latlng, zoom)      
    }

    return (   
        <>
            <Grid container >
                <Grid item xs={10}>
                    <MapContainer                     
                        center={initialMapConfig.coord} 
                        zoom={initialMapConfig.zoom}
                        whenCreated={setMap}                    
                        >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />       
                        {locationPressed && <Marker position={regionCoord}>
                          <Popup>{regionName}</Popup>
                        </Marker>}
                        {coord && <Marker position={coord}>
                          <Popup>You are here</Popup>
                        </Marker>}                   
                    </MapContainer>                              
                </Grid>
                <Grid item xs={2}>
                  <Box pt={10}>
                    <FlyToButton/>                    
                  </Box>
                  <Box pt={5}>                    
                    <FindMeButton/>
                  </Box>
                </Grid>
            </Grid>
        </>  
    )
    
}

export default Map