import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iBook } from '../../models/iBook';

interface BookState {
    books: iBook[];
    isLoading: boolean;
    error: string;
}

const initialState: BookState = {
    books: [],
    error: '',
    isLoading: false,
};

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setIsLoading: (
            state,
            action: PayloadAction<BookState['isLoading']>
        ) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<BookState['error']>) => {
            state.error = action.payload;
        },
        setBooks: (state, action: PayloadAction<BookState['books']>) => {
            state.books = action.payload;
        },
    },
});

export default bookSlice.reducer;
