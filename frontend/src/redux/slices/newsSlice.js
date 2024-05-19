import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

axios.defaults.url = '/api';

export const loadNews = createAsyncThunk(
	'news/loadNews',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${axios.defaults.url}/news`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const latestNews = createAsyncThunk(
	"news/getLatestNews",
	async () => {
		try {
			const response = await axios.get(`${axios.defaults.url}/news/latestNews`,
			);
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

export const addNews = createAsyncThunk(
	'elements/addNews',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${axios.defaults.url}/news`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateNews = createAsyncThunk(
	'news/updateNews',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.patch(
				`${axios.defaults.url}/news/${data.id}`,
				data
			);
			return response.data;
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
		data: null,
		latestNews: [],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			//load
			.addCase(loadNews.fulfilled, (state, action) => {
				state.data = action.payload || [];
				state.loading = false;
			})
			.addCase(latestNews.fulfilled, (state, { payload }) => {
				state.latestNews = payload;
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
			// ADD
			.addCase(addNews.fulfilled, (state, action) => {
				try {
					const parsed = {
						...action.payload,
						data: JSON.parse(action.payload.data)
					};
					state.data = [...state.data, parsed];
					state.loading = false;
				} catch (error) {
					console.error('error: ', error);
					state.errors = error;
					state.loading = false;
				}
			})
			// UPDATE
			.addCase(updateNews.fulfilled, (state, action) => {
				try {
					const parsed = {
						...action.payload,
						data: JSON.parse(action.payload.data)
					};
					state.loading = false;
					state.data = state.data.map((i) => (i.id === parsed.id ? parsed : i));
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
