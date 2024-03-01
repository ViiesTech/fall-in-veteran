import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    data: [],
    token: "",
    isLoading: false
}

export const CurrentLogin = createAsyncThunk(
    'user',
    async (config) => {
        return axios(config).then((response)=>{
            console.log("res",response.data)
            if(response.data.success == false){
                console.log("Toast")
            }else{
                console.log("error")
            }
        }).catch(()=>{
            console.log("Error")
        })
    }
)



export const AuthSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setData: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            state.data = action.payload
        },
        setLoader: (state, action) => {
            state.isLoading = action.payload
        },
        Logout: (state) => {
            state.data = []
        },

    },
    extraReducers:(builder)=>{
        builder.addCase(CurrentLogin.fulfilled,(state, action)=>{
            state.data = action.payload.data,
            state.token = action.payload.token
        }).addCase(CurrentLogin.rejected, (state, action) => {

        })
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setLoader } = AuthSlice.actions

export default AuthSlice.reducer