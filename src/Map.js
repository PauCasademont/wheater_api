import React, {useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Grid, Button, Box } from "@material-ui/core"

import './map.css'

const zoom = 13;

function Map({ regionCoord, regionName }) {

    const [map, setMap] = useState(null); 
    const [coord, setCoord] = useState(null)   

    function FlyToButton() {
      const onClick = () => {
        map.flyTo(regionCoord, zoom)
      };

      return ( <Button
                pt={20} 
                variant="contained"
                color="primary"
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
                pt={20}
                variant="contained"
                color="primary"
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
                    {regionCoord && <MapContainer                     
                        center={regionCoord} 
                        zoom={zoom}
                        whenCreated={setMap}                    
                        >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />       
                        <Marker position={regionCoord}>
                          <Popup>{regionName}</Popup>
                        </Marker>
                        {coord && <Marker position={coord}>
                          <Popup>You are here or close xD</Popup>
                        </Marker>}                   
                    </MapContainer>}                               
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