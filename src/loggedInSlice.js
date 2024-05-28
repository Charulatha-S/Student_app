import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    value: false
}

const loggedInSlice = createSlice({
    name: "loggedIn",
    initialState,
    reducers: {
        setTrue: (state) =>{
            state.value = true;
        },
        setFalse: (state) =>{
            state.value = false;
        }
    }
})

export const { setTrue, setFalse} = loggedInSlice.actions
export default loggedInSlice.reducer