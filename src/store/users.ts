import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {}
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setLoggedUser: (state, action) => {
            state.user = action.payload;
        },
        logOutUser: (state, action) => {
            state.user = {};
        }
    },
})

export const { setLoggedUser, logOutUser } = usersSlice.actions;

export default usersSlice.reducer;