import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

axios.defaults.url = '/api';

export const loadNews = createAsyncThunk(
  'news/loadNews',
  async ({ limit } = {}, { rejectWithValue }) => {
    try {
      let url = `${axios.defaults.url}/news`;
      if (limit) url += `?limit=${limit}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadNewsById = createAsyncThunk(
  'news/loadNewsById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${axios.defaults.url}/news/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const saveNews = createAsyncThunk(
  'news/saveNews',
  async ({ data, isEdit }, { rejectWithValue }) => {
    try {
      let response;
      if (isEdit)
        response = await axios.patch(`${axios.defaults.url}/news/${data.id}`, {
          ...data,
          id: undefined
        });
      else response = await axios.post(`${axios.defaults.url}/news`, data);
      return { data: response.data, isEdit };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeNews = createAsyncThunk(
  'news/removeNews',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${axios.defaults.url}/news/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const isPendingAction = (action) => {
  return action.type.startsWith('news/') && action.type.endsWith('/pending');
};
const isRejectedAction = (action) => {
  return action.type.startsWith('news/') && action.type.endsWith('/rejected');
};

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    loading: false,
    errors: false,
    data: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //load
      .addCase(loadNews.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.loading = false;
      })
      //load by Id
      .addCase(loadNewsById.fulfilled, (state, action) => {
        try {
          const news = {
            ...action.payload,
            data: JSON.parse(action.payload.data)
          };
          if (state.data.find((e) => e.id === element.id)) {
            state.data = state.data.map((e) =>
              e.id === news.id ? element : e
            );
          } else {
            state.data = state.data.concat(element);
          }
          state.loading = false;
        } catch (error) {
          state.data = [];
          state.errors = error;
          state.loading = false;
        }
      })
      // SAVE
      .addCase(saveNews.fulfilled, (state, { payload }) => {
        try {
          state.loading = false;
          if (payload.isEdit) {
            state.data = state.data.map((el) => {
              if (el.id === payload.data.id) {
                el.title = payload.data.title;
                el.content = payload.data.content;
              }
              return el;
            });
          } else {
            state.data = [payload.data, ...state.data];
            state.loading = false;
          }
        } catch (error) {
          console.error('error: ', error);
          state.errors = error;
          state.loading = false;
        }
      })
      // REMOVE
      .addCase(removeNews.fulfilled, (state, action) => {
        const id = action.payload;
        state.data = state.data.filter((i) => i.id !== id);
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

export default newsSlice.reducer;
