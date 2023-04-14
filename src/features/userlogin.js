import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeUser: null,
    error: null
}

        export const loginSlice = createSlice ({
            name: 'userlogin',
            initialState,
            reducers: {
                loginsuc: (state, action) => {
                    state.activeUser = action.payload;
                    state.error = null;
                },
                loginfail: (state, action) => {
                    state.activeUser = null;
                    state.error = action.payload;

                },
                logout: (state) => {
                    state = initialState 
                }
            }
        })
            export const { loginsuc, loginfail, logout} = loginSlice.actions
            export default loginSlice.reducer