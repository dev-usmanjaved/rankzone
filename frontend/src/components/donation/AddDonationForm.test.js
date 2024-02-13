// AddDonationForm.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddDonationForm from './AddDonationForm';
import useFetch from '../../hooks/useFetch';

// Mock the useFetch hook
jest.mock('../../hooks/useFetch');

describe('AddDonationForm', () => {
  const mockHandleSubmitForm = jest.fn();

  beforeEach(() => {
    mockHandleSubmitForm.mockClear();
    useFetch.mockReturnValue({
      data: [
        { id: 1, name: 'Area of Greatest Need' },
        { id: 2, name: 'Student Financial Aid' }
      ],
      loading: false,
      error: null
    });

    render(<AddDonationForm handleSubmitForm={mockHandleSubmitForm} />);
  });

  it('renders the form inputs and initializes them empty', () => {
    expect(screen.getByPlaceholderText('Email')).toHaveValue('');
    expect(screen.getByPlaceholderText('First Name')).toHaveValue('');
    expect(screen.getByPlaceholderText('Last Name')).toHaveValue('');
    expect(screen.getByPlaceholderText('Amount')).toHaveValue(0);
  });

  it('allows entering data into the donation form fields', () => {
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: '100' } });
    
    expect(screen.getByPlaceholderText('Email').value).toBe('test@example.com');
    expect(screen.getByPlaceholderText('First Name').value).toBe('John');
    expect(screen.getByPlaceholderText('Last Name').value).toBe('Doe');
    expect(screen.getByPlaceholderText('Amount').value).toBe('100');
  });

  it('submits the form with all data', () => {
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: '100' } });
    fireEvent.submit(screen.getByText('Submit'));

    expect(mockHandleSubmitForm).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmitForm).toHaveBeenCalledWith(expect.anything(), {
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      amount: '100',
      designation_id: ''
    });
  });

  it('shows loading and error states correctly', () => {
    useFetch.mockReturnValueOnce({ data: null, loading: true, error: null });
    render(<AddDonationForm handleSubmitForm={mockHandleSubmitForm} />);
    expect(screen.getByText('Loading designations...')).toBeInTheDocument();

    useFetch.mockReturnValueOnce({ data: null, loading: false, error: 'Network Error' });
    render(<AddDonationForm handleSubmitForm={mockHandleSubmitForm} />);
    expect(screen.getByText('Error loading designations: Network Error')).toBeInTheDocument();
  });
});
