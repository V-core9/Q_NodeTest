import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '../helpers';

// create slice

const name = 'myBooks';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    reducers: {
        toggleNewModal: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.newModalShow = !state.newModalShow;
        },
    },
    extraReducers
});

// exports

export const myBooksActions = { ...slice.actions, ...extraActions };
export const myBooksReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        myBooks: [],
        newModalShow: false,
    }
}

function createExtraActions() {

    return {
        getMyBooks: getMyBooks(),
        newBook: newBook(),
        deleteBook: deleteBook(),
    };

    function getMyBooks() {
        return createAsyncThunk(
            `${name}/getMyBooks`,
            async () => await fetchWrapper.get(`http://localhost/api/books/me`)
        );
    }

    function newBook() {
        return createAsyncThunk(
            `${name}/newBook`,
            async ({ title, description, content }) => await fetchWrapper.post(`http://localhost/api/books/`, { title, description, content })
        );
    }

    function deleteBook() {
        return createAsyncThunk(
            `${name}/deleteBook`,
            async ({ id }) => await fetchWrapper.delete(`http://localhost/api/books/`, { id })
        );
    }
}


function createExtraReducers() {
    return {
        ...getMyBooks(),
        ...newBook(),
        ...deleteBook(),
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

    function newBook() {
        var { pending, fulfilled, rejected } = extraActions.newBook;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                state.myBooks.push(action.payload);
                console.log('newBookAction Done: ', state);
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }

    function deleteBook() {
        var { pending, fulfilled, rejected } = extraActions.deleteBook;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                //state.myBooks.push(action.payload);
                const newState = [];
                state.myBooks.map((value) => (value.id !== action.payload.id) ? newState.push(value) : null);
                state.myBooks = newState;
                console.log('deleteBook Done: ', state);
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }
}

export default slice.reducer;
