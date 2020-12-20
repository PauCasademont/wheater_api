import React, {useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import './map.css'
const position = [42,2]

function Map() {

    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, 16)
          },
        })
      
        return position === null ? null : (
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )
    }    

    
    return (      
        <MapContainer center={position} zoom={12}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />             
            <LocationMarker />
        </MapContainer>
    )
    
}

export default Map