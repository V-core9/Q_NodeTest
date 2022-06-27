import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '../helpers';

// create slice

const name = 'myBooks';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const myBooksActions = { ...slice.actions, ...extraActions };
export const myBooksReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        myBooks: []
    }
}

function createExtraActions() {

    return {
        getMyBooks: getMyBooks()
    };

    function getMyBooks() {
        return createAsyncThunk(
            `${name}/getMyBooks`,
            async () => await fetchWrapper.get(`http://localhost/api/books/me`)
        );
    }
}

function createExtraReducers() {
    return {
        ...getMyBooks()
    };

    function getMyBooks() {
        var { pending, fulfilled, rejected } = extraActions.getMyBooks;
        return {
            [pending]: (state) => {
                state.myBooks = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.myBooks = action.payload;
            },
            [rejected]: (state, action) => {
                state.myBooks = { error: action.error };
            }
        };
    }
}

export default slice.reducer;
