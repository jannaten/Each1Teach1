import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { language_level, languages, study_credits } from '../../data';

axios.defaults.url = '/api';

export const loadConfig = createAsyncThunk(
  'config/loadConfig',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${axios.defaults.url}/config`);
      return response.data[0];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadLocalizations = createAsyncThunk(
  'config/loadLocalizations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${axios.defaults.url}/config/getLocalization`
      );
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

const configSlice = createSlice({
  name: 'config',
  initialState: {
    loading: false,
    errors: false,
    data: {
      languages,
      language_level,
      study_credits,
      localizations: []
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOAD
      .addCase(loadConfig.fulfilled, (state, { payload }) => {
        state.data = {
          languages: payload.languages[0],
          language_level: payload.language_level[0],
          study_credits: payload.study_credits[0]
        };
        state.loading = false;
      })
      .addCase(loadLocalizations.fulfilled, (state, { payload }) => {
        state.data = {
          ...state.data,
          localizations: payload
        };
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

export default configSlice.reducer;
