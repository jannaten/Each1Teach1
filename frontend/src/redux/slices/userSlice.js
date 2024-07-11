import axios from 'axios';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

axios.defaults.url = '/api';

export const login = createAsyncThunk(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${axios.defaults.url}/auth/login`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access-token');
      if (token) {
        const response = await axios.get(`${axios.defaults.url}/auth/user`, {
          headers: { Auth: `Bearer ${token}` }
        });
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadUsers = createAsyncThunk(
  'user/loadUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${axios.defaults.url}/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (
    { data, isManagement, isEdit = true, isRegister = false },
    { rejectWithValue }
  ) => {
    try {
      let response;
      const id = data.get('id');
      if (isEdit) {
        data.delete('id');
        data.append('id', JSON.stringify(undefined));
        response = await axios.patch(`${axios.defaults.url}/users/${id}`, data);
      } else if (isRegister)
        response = await axios.post(
          `${axios.defaults.url}/auth/register`,
          data
        );
      else response = await axios.post(`${axios.defaults.url}/users`, data);
      return { data: response.data, isManagement, isEdit, isRegister };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (data, { rejectWithValue }) => {
    try {
      await axios.post(`${axios.defaults.url}/auth/user/change-password`, data);
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...payload } = data;
      const response = await axios.post(
        `${axios.defaults.url}/auth/reset-password/${token}`,
        payload,
        {
          headers: { Auth: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${axios.defaults.url}/auth/forgot-password`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeUser = createAsyncThunk(
  'user/removeUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${axios.defaults.url}/users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const validateToken = createAsyncThunk(
  'user/validateToken',
  async ({ path, token }) => {
    try {
      await axios.get(`${axios.defaults.url}/auth/${path}/${token}`, {
        headers: { Auth: `Bearer ${token}` }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
);

export const logout = createAction('logout');

const isPendingAction = (action) => {
  return action.type.startsWith('user/') && action.type.endsWith('/pending');
};
const isRejectedAction = (action) => {
  return action.type.startsWith('user/') && action.type.endsWith('/rejected');
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    errors: false,
    data: null,
    users: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.fulfilled, (state, action) => {
        const token = action?.payload?.token;
        window.localStorage.setItem('access-token', token);
        axios.defaults.headers.common['Auth'] = `Bearer ${token}`;
        state.data = action.payload;
        state.loading = false;
      })
      // LOAD USERS
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      // GET USER INFO / RELOGIN
      .addCase(getUserInfo.fulfilled, (state, action) => {
        const token = action?.payload?.token;
        window.localStorage.setItem('access-token', token);
        axios.defaults.headers.common['Auth'] = `Bearer ${token}`;
        state.data = action.payload;
        state.loading = false;
      })
      // CHANGE PASSWORD
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      // LOGOUT
      .addCase(logout, (state) => {
        window.localStorage.removeItem('access-token');
        axios.defaults.headers.common['Auth'] = null;
        state.loading = false;
        state.errors = false;
        state.data = null;
      })
      // UPDATE
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        if (payload.isManagement) {
          state.users = state.users.map((user) =>
            user.id === payload.data.id ? payload.data : user
          );
        } else if (payload.isRegister) {
          const token = payload?.data.token;
          window.localStorage.setItem('access-token', token);
          axios.defaults.headers.common['Auth'] = `Bearer ${token}`;
          state.data = payload.data;
          state.loading = false;
        } else
          state.data = {
            ...payload.data,
            loginName: payload.data.firstName + ' ' + payload.data.lastName
          };

        state.loading = false;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) => {
          if (user.id === action.payload.id)
            user.deletedAt = action.payload.deletedAt;
          return user;
        });
        state.loading = false;
      })
      // LOADING / PENDING
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
        state.errors = false;
      })
      // ERROR /FAILURE / REJECTED
      .addMatcher(isRejectedAction, (state, action) => {
        window.localStorage.removeItem('access-token');
        axios.defaults.headers.common['Auth'] = null;
        state.loading = false;
        state.data = null;
        state.errors = action.payload;
      });
  }
});

export default userSlice.reducer;
