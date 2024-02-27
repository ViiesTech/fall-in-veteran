import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    isLoading: false
}

export const AuthSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setData: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            state.data = action.payload
        },
        Logout: (state) => {
            state.data = []
        },

    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = AuthSlice.actions

export default AuthSlice.reducer