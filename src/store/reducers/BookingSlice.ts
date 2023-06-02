import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iBooking } from '../../models/iBooking';

interface BookingState {
    bookings: iBooking[];
    isLoading: boolean;
    error: string;
}

const initialState: BookingState = {
    bookings: [],
    error: '',
    isLoading: false,
};

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setIsLoading: (
            state,
            action: PayloadAction<BookingState['isLoading']>
        ) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<BookingState['error']>) => {
            state.error = action.payload;
        },
        setBooks: (state, action: PayloadAction<BookingState['bookings']>) => {
            state.bookings = action.payload;
        },
    },
});

export default bookingSlice.reducer;
