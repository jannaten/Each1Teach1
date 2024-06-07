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

export const sendInvitation = createAsyncThunk(
  'match/sendInvitation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${axios.defaults.url}/matches`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelInvitation = createAsyncThunk(
  'match/cancelInvitation',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${axios.defaults.url}/matches/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptInvitation = createAsyncThunk(
  'match/acceptInvitation',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${axios.defaults.url}/matches/${id}`, {
        status: ['approved']
      });
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
      .addCase(sendInvitation.fulfilled, (state, { payload }) => {
        state.data = [...state.data]?.map((match) => {
          if (match.id === payload.recipientUser)
            match.invited = {
              matchId: payload.id,
              requestUser: payload.requestUser,
              recipientUser: payload.recipientUser,
              status: payload.status
            };
          return match;
        });
      })
      .addCase(cancelInvitation.fulfilled, (state, { payload }) => {
        state.data = [...state.data]?.map((match) => {
          if (match.invited?.matchId === payload.id) match.invited = {};
          return match;
        });
      })
      .addCase(acceptInvitation.fulfilled, (state, { payload }) => {
        state.data = [...state.data]?.map((match) => {
          if (match.invited?.matchId === payload.id) match.invited = {};
          return match;
        });
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
