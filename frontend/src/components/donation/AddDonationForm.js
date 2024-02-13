import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

function AddDonationForm({ handleSubmitForm }) {
  const apiUrl = process.env.REACT_APP_BASE_URL
  const initialState = {
    email: '',
    first_name: '',
    last_name: '',
    amount: 0,
    designation_id: '',

  };

const [formData, setFormData] = useState(initialState);
  const { data: designations , loading, error } = useFetch(`${apiUrl}/api/v1/designations`);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSubmitForm(e,formData)
    setFormData(initialState);
  };

  if (loading) return <p>Loading designations...</p>;
  if (error) return <p>Error loading designations: {error}</p>;

  return (
    <form onSubmit={handleSubmit} style={{padding:"0 30%"}}>
      <h2>Add a Donation</h2>
      <TextField
        name="email"
        type="email"
        label="Email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="first_name"
        label="First Name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="last_name"
        label="Last Name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="amount"
        type="number"
        label="Amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        variant="outlined"
      />

      <Autocomplete
        disablePortal
        options={designations}
        getOptionLabel={(option) => option.name}
        sx={{ width: "100%",marginTop:"8px" }}
        value={designations.find(designation => designation.id === formData.designation_id) || null}
        onChange={(event, newValue) => {
            setFormData({ ...formData, designation_id: newValue.id });
        
        }}
        renderInput={(params) => <TextField {...params} label="Designation" />}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ my: 2 }}>
        Submit
      </Button>
    </form>
  );
}

export default AddDonationForm;
