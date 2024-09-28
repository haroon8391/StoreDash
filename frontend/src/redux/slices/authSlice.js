import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isauthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isauthenticated = true;
        },

        logoutSuccess: (state) => {
            state.user = null;
            state.token = null;
            state.isauthenticated = false;
        }
    }
})

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;