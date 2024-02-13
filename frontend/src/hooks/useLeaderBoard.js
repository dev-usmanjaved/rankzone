
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'
import axios from 'axios';

const useLeaderboard = (apiUrl) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addDonation = async (formData) => {
    try {
      await axios.post(`${apiUrl}/api/v1/donations`, { donation: formData });
      return toast.success('Donation added successfully!')
    } catch (error) {
      return toast.success(`Error adding donation:${error}`)
    }
  };

  return { loading, error, addDonation };
};

export default useLeaderboard;

