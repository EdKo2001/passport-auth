import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: "",
    isAuth: false,
    userData: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, { payload }) => {
            state.isAuth = payload;
        },
        setUserData: (state, { payload }) => {
            state.userData = payload;
        },
        setToken: (state, { payload }) => {
            state.token = payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAuth, setUserData, setToken } = authSlice.actions

export default authSlice.reducer