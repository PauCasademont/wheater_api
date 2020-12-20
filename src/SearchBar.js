import React from 'react';
import { TextField } from "@material-ui/core";

function  SearchBar({onSubmit}) {

    const onKeyPress = (event) => {
        if (event.key === "Enter") {
          onSubmit(event.target.value);
        }
      }

    return (        
        <TextField 
            id="filled-basic"
            label="Region" 
            variant="filled"             
            onKeyPress={onKeyPress}
        />      
    )
}
export default SearchBar;