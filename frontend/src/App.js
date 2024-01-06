import React, { useState } from 'react';
import AddDonationForm from './components/donation/AddDonationForm';
import Leaderboard from './components/leaderBoard/Leaderboard';
import useLeaderboard from './hooks/useLeaderBoard';
import {Toaster} from 'react-hot-toast'
import './App.css';

function App() {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const { loading, error, addDonation } = useLeaderboard(apiUrl);

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    await addDonation(formData);
  };

  return (
    <div className="App">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <AddDonationForm handleSubmitForm={handleSubmit} />
      <Leaderboard loading={loading} error={error}/>
    </div>
  );
}

export default App;
