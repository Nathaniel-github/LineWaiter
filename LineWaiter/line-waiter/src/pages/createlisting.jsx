import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    time: '',
    duration: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3, backgroundColor: '#f4f4f4', borderRadius: 4 }}>
      <h2>Create a Listing</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title of Listing"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          label="Location of Listing"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={formData.location}
          onChange={handleChange}
        />
        <TextField
          label="Time of Listing"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={formData.time}
          onChange={handleChange}
        />
        <TextField
          label="Duration of Listing"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={formData.duration}
          onChange={handleChange}
        />
        <TextField
          label="Price of Listing"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={formData.price}
          onChange={handleChange}
        />
        <TextField
          label="Description of Listing"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={formData.description}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateListing;