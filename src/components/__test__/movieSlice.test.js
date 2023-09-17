import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchMovies,
  searchMovies,
  movieSlice,
} from './movieSlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Mock Axios for testing async actions
jest.mock('axios');

describe('movieSlice async actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchMovies action should dispatch pending and fulfilled actions', async () => {
    const store = mockStore({});
    const mockResponseData = {
      data: {
        results: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }],
      },
    };

    axios.get.mockResolvedValue(mockResponseData);

    await store.dispatch(fetchMovies());

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchMovies.pending.type);
    expect(actions[1].type).toEqual(fetchMovies.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponseData);

    // You can also assert other properties of the state if needed
    expect(store.getState().movieSlice.loading).toBe(false);
    expect(store.getState().movieSlice.movies).toEqual(mockResponseData.data.results);
  });

  it('searchMovies action should dispatch pending and fulfilled actions', async () => {
    const store = mockStore({});
    const query = 'Test Movie';
    const mockResponseData = {
      data: {
        results: [{ id: 1, title: 'Test Movie 1' }, { id: 2, title: 'Test Movie 2' }],
      },
    };

    axios.get.mockResolvedValue(mockResponseData);

    await store.dispatch(searchMovies(query));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(searchMovies.pending.type);
    expect(actions[1].type).toEqual(searchMovies.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponseData);

    // You can also assert other properties of the state if needed
    expect(store.getState().movieSlice.loading).toBe(false);
    expect(store.getState().movieSlice.movies).toEqual(mockResponseData.data.results);
  });
});

describe('movieSlice reducer', () => {
  it('should handle fetchMovies.pending', () => {
    const initialState = { movies: [], loading: false, error: false };
    const action = fetchMovies.pending;

    const newState = movieSlice.reducer(initialState, action);

    expect(newState.loading).toBe(true);
  });

  it('should handle fetchMovies.fulfilled', () => {
    const initialState = { movies: [], loading: true, error: false };
    const mockResponseData = {
      data: {
        results: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }],
      },
    };
    const action = fetchMovies.fulfilled(mockResponseData);

    const newState = movieSlice.reducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.movies).toEqual(mockResponseData.data.results);
  });

  it('should handle fetchMovies.rejected', () => {
    const initialState = { movies: [], loading: true, error: false };
    const action = fetchMovies.rejected;

    const newState = movieSlice.reducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(true);
  });

  // Similar tests can be written for searchMovies.pending, searchMovies.fulfilled, and searchMovies.rejected if needed.
});
