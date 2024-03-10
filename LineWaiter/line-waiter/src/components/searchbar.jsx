import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const SearchBar = ({ data, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };


  return (
    <Box sx={{ maxWidth: 750, minWidth: 750, marginLeft: 0, padding: 2, backgroundColor: '#f4f4f4', borderRadius: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="Search..."
          onChange={handleInputChange}
          value={query}
          sx={{ mr: 1, width: '100%' }} // Adjust the width here to make the search bar bigger
          inputProps={{ style: { fontSize: 18 } }} // Adjust the font size
        />
        <IconButton aria-label="search" disabled>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBar;

