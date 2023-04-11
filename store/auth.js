import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState: {
        isLoggedIn: false,
        token:null,
        tokenExpireDate:null
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn=true;
            state.token=action.payload.token;
            state.tokenExpireDate=action.payload.tokenExpireDate

            AsyncStorage.setItem('token', action.payload.token)
            AsyncStorage.setItem('tokenExpireDate', action.payload.tokenExpireDate)
        },
        logout: (state, action) => {
            state.isLoggedIn=false;
            state.token=null;
            state.tokenExpireDate=null

            AsyncStorage.removeItem('token')
            AsyncStorage.removeItem('tokenExpireDate')
        }
    }
});

export const login = authSlice.actions.login;
export const logout = authSlice.actions.logout;

export default authSlice.reducer;