import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWrapper } from '../helpers';


const initialState = {
  appFunctions: [],
  status: 'idle',
};

export const getAll = createAsyncThunk(
  'appFunctions/all',
  async () => await fetchWrapper.get(`http://localhost/api/functions`)
);

export const createNew = createAsyncThunk(
  'appFunctions/new',
  async (func) => await fetchWrapper.post(`http://localhost/api/functions`, func)
);

export const deleteFunc = createAsyncThunk(
  'appFunctions/delete',
  async (func) => await fetchWrapper.post(`http://localhost/api/functions`, func)
);

export const appFunctionsSlice = createSlice({
  name: 'appFunctions',
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder
      .addCase(getAll.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.status = 'idle';
        state.appFunctions = action.payload;
        console.log('getAll', action.payload);
      });

    builder
      .addCase(createNew.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNew.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('createNew', action.payload);
      });

    builder
      .addCase(deleteFunc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFunc.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('deleteFunc', action.payload);
      });

  },

});

export const appFunctionsActions = {
  getAll,
  createNew,
  deleteFunc,
  appFunctionsSlice
};

export const getFunctions = (state) => state.functions.value;


export default appFunctionsSlice.reducer;
