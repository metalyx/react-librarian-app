import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iUser } from '../../models/iUser';

interface UserState {
    user: iUser | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false,
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
        logIn: (state) => {
            state.isLoggedIn = true;
        },
    },
});

export default userSlice.reducer;
