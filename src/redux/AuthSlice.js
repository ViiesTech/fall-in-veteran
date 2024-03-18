import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Toast from 'react-native-toast-message'


const initialState = {
    data: [],
    token: "",
    isLoading: false
}



export const CurrentLogin = createAsyncThunk(
    'user',
    async (config) => {
        return axios(config)
        .then((response)=>{
            
            if(response.data.status == false){

                Toast.show({
                    type: 'error',
                    text1: response.data.message
                })
                return response


                
            }else{
                console.log("Successfully logged in")

                Toast.show({
                    type: 'success',
                    text1: "Successfully logged in"
                })
                return response
                
            }
            return response
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
        setLogout: (state) => {
            state.data = []
            state.token = ""
            state.isLoading = false
        },

    },
    extraReducers:(builder)=>{
        builder.addCase(CurrentLogin.fulfilled,(state, action)=>{


            state.data = action.payload?.data.data,
            state.token = action.payload?.data?.token
            state.isLoading = false
        }).addCase(CurrentLogin.rejected, (state, action) => {
            state.isLoading = false
        })
    }
})

// Action creators are generated for each case reducer function
export const { setLogout, setData, setLoader } = AuthSlice.actions

export default AuthSlice.reducer