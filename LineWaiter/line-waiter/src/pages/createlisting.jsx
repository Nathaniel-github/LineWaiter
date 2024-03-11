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
    description: '',
    // username: ''
  });

  const handleChange = (e) => {
    const { name:field, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert duration and price to numbers
  let data = {
    name: formData.title,
    location: formData.location,
    time: formData.time,
    duration: formData.duration,
    price: formData.price,
    description: formData.description,
    // username: formData.username
  };
    // Handle form submission logic here
    console.log("formData", data);

  fetch('/createAListing/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'success') {
        console.log('Listing created successfully!');
        // Optionally, you can redirect the user or perform other actions upon successful listing creation.
      } else {
        console.log('Failed to create listing.');
        // Handle failure, show an error message, etc.
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors, show an error message, etc.
    });
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
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <TextField
          label="Time of Listing"
          variant="outlined"
          fullWidth
          margin="normal"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <TextField
          label="Duration of Listing"
          variant="outlined"
          fullWidth
          margin="normal"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
        <TextField
          label="Price of Listing"
          variant="outlined"
          fullWidth
          margin="normal"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <TextField
          label="Description of Listing"
          variant="outlined"
          fullWidth
          margin="normal"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {/* <TextField*/}
        {/*  label="Username"*/}
        {/*  variant="outlined"*/}
        {/*  fullWidth*/}
        {/*  margin="normal"*/}
        {/*  name="username"*/}
        {/*  value={formData.username}*/}
        {/*  onChange={handleChange}*/}
        {/*/>*/}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateListing;