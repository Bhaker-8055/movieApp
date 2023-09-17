import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import MovieCard from '../MovieCard';

test('renders MovieCard with movie data', () => {
  const movie = {
    id: 1,
    title: 'Test Movie',
    release_date: '2023-09-17',
    vote_average: 7.5,
    overview: 'This is a test movie.',
    poster_path: '/test.jpg',
  };

  const { getByText, getByAltText } = render(<MovieCard movie={movie} />);

  expect(getByText('Test Movie')).toBeInTheDocument();
  expect(getByText('Release Date: 2023-09-17')).toBeInTheDocument();
  expect(getByText('Rating: 7.5')).toBeInTheDocument();
  expect(getByText('This is a test movie.')).toBeInTheDocument();
  
  // Use getByAltText to check for the existence of the image
  const image = getByAltText('Test Movie');
  expect(image).toBeInTheDocument();

  // Check the full src attribute value
  expect(image).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/test.jpg');
});

test('renders MovieCard with no poster path', () => {
  const movie = {
    id: 1,
    title: 'Test Movie',
    release_date: '2023-09-17',
    vote_average: 7.5,
    overview: 'This is a test movie.',
    poster_path: null,
  };

  const { getByText } = render(<MovieCard movie={movie} />);

  expect(getByText('Image Not Found')).toBeInTheDocument();
});
