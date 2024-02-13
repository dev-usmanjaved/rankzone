import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import useWebSocket from '../../hooks/useWebSocket';
import useFetch from '../../hooks/useFetch';

function Leaderboard() {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: initialData, loading, error } = useFetch(`${apiUrl}/api/v1/designations/leaderboard?page=1&per_page=10`);
  const { messages } = useWebSocket(apiUrl);

  const [leaderboard, setLeaderboard] = useState(initialData);

  useEffect(() => {
    if (initialData) {
      setLeaderboard(initialData?.designations);
    }
  }, [initialData]);

  useEffect(() => {
    console.log('INSIDE USE EFFECT', messages);
    if (messages.length > 0) {
      const newMessage = messages[messages.length - 1];
      setLeaderboard((prevLeaderboard) => {
        const updatedLeaderboard = [...prevLeaderboard];
        const index = updatedLeaderboard.findIndex((item) => item.id === newMessage.id);
        if (index !== -1) {
          updatedLeaderboard[index] = newMessage;
        } else {
          updatedLeaderboard.push(newMessage);
        }
        return updatedLeaderboard;
      });
    }
  }, [messages]);

  const handleChangePage = async (event, newPage) => {
    const response = await fetchDataHandler(newPage + 1, rowsPerPage);
    setLeaderboard(response.data.designations);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    const response = await fetchDataHandler(1, event.target.value);
    setLeaderboard(response.data.designations);
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const fetchDataHandler = async (page, rowsPerPage) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/designations/leaderboard`, {
      params: { page, per_page: rowsPerPage }
    });

    return response;
  };

  function addDollarSign(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
  }

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p>Error fetching leaderboard: {error}</p>;

  return (
    <Paper style={{ margin: 'auto', overflow: 'hidden', width: '80%' }}>
      <h2 style={{ textAlign: 'center' }}>Leaderboard</h2>
      {leaderboard && leaderboard.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Designation Name</TableCell>
                <TableCell align="right">Collected Amount</TableCell>
                <TableCell align="right">Total Donors</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.slice(0, rowsPerPage).map((entry, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {entry.name}
                  </TableCell>
                  <TableCell align="right">{addDollarSign(entry.total_amount)}</TableCell>
                  <TableCell align="right">{entry.donor_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10, 25]}
            component="div"
            count={initialData?.total_count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <p>No data available.</p>
      )}
    </Paper>
  );
}

export default Leaderboard;
