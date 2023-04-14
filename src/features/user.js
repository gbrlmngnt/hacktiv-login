import { createSlice } from "@reduxjs/toolkit";

const initialState  = {}

        export const userSlice = createSlice ({
                name: 'user',
                initialState,
                reducers: {
                    reguser: (state, action) => {
                        state = {...state, ...action.payload}
                    },
                }
        })

export const {reguser} = userSlice.actions;
export default userSlice.reducer;


