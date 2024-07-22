import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state , action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {   // chahte too isme bhi 'action' wala parameter le skte the but need hee nhi thi kyoki hame simple logout hee krwana hai kuch show thori krwana hai
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login , logout} = authSlice.actions;  // NOTE : ye reducers ke andar jo properties hoti hai ex : iss case mai 'login' and 'logout' INHE 'Actions' kehte hai

export default authSlice.reducer;