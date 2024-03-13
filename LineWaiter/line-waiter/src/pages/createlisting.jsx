import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {Link, useNavigate} from "react-router-dom";
import styles from "./login.module.css";
import './createlisting.css'

const CreateListing = () => {
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
     useEffect(() => {
         const loggedInUser = localStorage.getItem("user");
         if (loggedInUser !== "none") {
            console.log("logged in");
         } else {
           navigate('/');
         }
    }, []);

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
    username: localStorage.getItem("user"),
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
        setSuccessMessage('Listing created successfully! View under "My Listings"');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.log('Failed to create listing.');
      }
    })


    .catch((error) => {
      console.error('Error:', error);
      // Handle errors, show an error message, etc.
    });
  };

  return (
  <div className="create-body">
  <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3, backgroundColor: '#f4f4f4', borderRadius: 4 }}>
      <h2>Create a Listing</h2>
            {successMessage && <p className={styles['sign-up-success-message']}>{successMessage}</p>}

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
          label="Time of Listing (in 24h HH:MM)"
          variant="outlined"
          fullWidth
          margin="normal"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <TextField
          label="Duration of Listing (in minutes)"
          variant="outlined"
          fullWidth
          margin="normal"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
        <TextField
          label="Price of Listing (in USD)"
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

        <Button variant="contained" style={{ backgroundColor: '#3A5661' }}type="submit">
          Submit
        </Button>
      </form>

    </Box>
    </div>
  );
};

export default CreateListing;