import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iUser } from '../../models/iUser';

interface UserState {
    user: iUser | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false,
    error: '',
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<iUser>) => {
            state.user = action.payload;
        },
        logOut: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        logIn: (state) => {
            state.isLoggedIn = true;
        },
    },
});

export default userSlice.reducer;
