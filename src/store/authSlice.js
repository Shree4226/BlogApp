import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            const data = action.payload.userData;
            
           .
            // Let's ensure both exist or map one to the other to prevent UI breaks.
            state.userData = {
                ...data,
                $id: data._id || data.id // Map _id to $id for backward compatibility
            };
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
