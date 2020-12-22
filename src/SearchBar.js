import React from 'react';
import { TextField } from "@material-ui/core";

function  SearchBar({ setRegion }) {

    const onKeyPress = (event) => {
        if (event.key === "Enter") {
          setRegion(event.target.value);
        }
      }

    return (        
        <TextField 
            id="filled-basic"
            label="Location" 
            variant="filled"             
            onKeyPress={onKeyPress}
        />      
    )
}
export default SearchBar;