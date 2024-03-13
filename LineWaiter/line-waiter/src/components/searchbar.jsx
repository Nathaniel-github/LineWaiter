import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
      <Box
        sx={{
          maxWidth: 750,
          minWidth: 300, // Adjusted for responsiveness
          width: '80%', // Makes the search bar responsive
          backgroundColor: '#f4f4f4',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search..."
          onChange={handleInputChange}
          value={query}
          sx={{
            mr: 1,
            width: 'auto', // Adjusted to take necessary space
            flex: 1, // Makes TextField flexibly fill the space
            inputProps: {
              style: { fontSize: 18 }, // Preserves the font size adjustment
            },
          }}
        />
        <IconButton aria-label="search" disabled>
          <SearchIcon />
        </IconButton>
      </Box>
  );
};

export default SearchBar;

