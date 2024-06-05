import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

axios.defaults.url = '/api';

export const loadMatches = createAsyncThunk(
  'match/loadMatches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${axios.defaults.url}/matches`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const isPendingAction = (action) => {
  return action.type.startsWith('config/') && action.type.endsWith('/pending');
};
const isRejectedAction = (action) => {
  return action.type.startsWith('config/') && action.type.endsWith('/rejected');
};

const matchSlice = createSlice({
  name: 'match',
  initialState: {
    loading: false,
    errors: false,
    data: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOAD
      .addCase(loadMatches.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
      })
      // LOADING / PENDING
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
        state.errors = false;
      })
      // ERROR /FAILURE / REJECTED
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  }
});

export default matchSlice.reducer;
