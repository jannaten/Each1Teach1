import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

axios.defaults.url = '/api';

export const loadChats = createAsyncThunk(
  'chat/loadChats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${axios.defaults.url}/matches/chats`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const saveMessage = createAsyncThunk(
  'chat/saveMessage',
  async ({ data, isEdit }, { rejectWithValue }) => {
    try {
      let response;
      if (isEdit)
        response = await axios.patch(
          `${axios.defaults.url}/matches/chats/${data.id}`,
          {
            ...data,
            id: undefined
          }
        );
      else
        response = await axios.post(
          `${axios.defaults.url}/matches/chats`,
          data
        );
      return { data: response.data, isEdit };
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
  name: 'chat',
  initialState: {
    loading: false,
    errors: false,
    data: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOAD
      .addCase(loadChats.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
      })
      // SAVE
      .addCase(saveMessage.fulfilled, (state, { payload }) => {
        try {
          state.loading = false;
          if (payload.isEdit) {
            state.data = [...state.data].map((el) => {
              if (el.id === payload.data.matchId) {
                el.chats = el.chats.map((chat) => {
                  if (chat.id === payload.data.id) return payload.data;
                  return chat;
                });
              }
              return el;
            });
          } else {
            state.data = [...state.data].map((el) => {
              if (el.id === payload.data.matchId) el.chats.push(payload.data);
              return el;
            });
            state.loading = false;
          }
        } catch (error) {
          console.error('error: ', error);
          state.errors = error;
          state.loading = false;
        }
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
