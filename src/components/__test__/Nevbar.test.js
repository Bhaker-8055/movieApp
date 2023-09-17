import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Nevbar from '../Nevbar';
import { searchMovies } from '../../redux/features/movieSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

test('calls searchMovies on form submission', () => {
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);

  const { getByText, getByRole } = render(<Nevbar />);
  const input = getByRole('textbox');
  fireEvent.change(input, { target: { value: 'Test Movie' } });
  fireEvent.submit(getByText('Search'));

  expect(dispatch).toHaveBeenCalledWith(searchMovies('Test Movie'));
  expect(input.value).toBe('');
});
