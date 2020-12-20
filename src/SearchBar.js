import React, {useState} from 'react';
import { TextField } from "@material-ui/core";

function  SearchBar({onSubmit}) {

    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (event) => setSearchTerm(event.target.value);

    const onKeyPress = (event) => {
        if (event.key === "Enter") {
          onSubmit(searchTerm);
        }
      }

    return (        
        <TextField 
            id="filled-basic"
            label="Region" 
            variant="filled" 
            onChange={handleChange}
            onKeyPress={onKeyPress}
        />      
    )
}
export default SearchBar;