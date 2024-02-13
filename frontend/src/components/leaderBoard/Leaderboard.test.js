import React from 'react';
import axios from 'axios';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Leaderboard from './Leaderboard';

jest.mock('axios');

describe('Leaderboard Component', () => {
  const leaderboardMock = [
    { id: 1, name: "Designation 1", total_amount: 1000, donor_count: 10 },
    { id: 2, name: "Designation 2", total_amount: 2000, donor_count: 20 },
    { id: 3, name: "Designation 3", total_amount: 3000, donor_count: 30 }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: leaderboardMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing and displays data', async () => {
    render(<Leaderboard leaderboard={leaderboardMock} loading={false} error={null}  />);
    
    expect(screen.getByText('Designation 1')).toBeInTheDocument();
    expect(screen.getByText('$1000.00')).toBeInTheDocument();
  });

  it('handles change in rows per page', async () => {
    render(<Leaderboard leaderboard={leaderboardMock} loading={false} error={null} />);
    const select = screen.getByLabelText('Rows per page:');
    fireEvent.mouseDown(select.firstChild);
    fireEvent.click(screen.getByText('25'));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("http://127.0.0.1:3000/api/v1/designations/leaderboard?page=1&per_page=25");
    });
  });

  it('displays an error message when data fetch fails', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch data'));
    render(<Leaderboard leaderboard={[]} loading={false} error="Failed to fetch data" />);
    
    await waitFor(() => {
      expect(screen.getByText('Error fetching leaderboard: Failed to fetch data')).toBeInTheDocument();
    });

  });
});
