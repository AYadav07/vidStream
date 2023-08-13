import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currUser: null,
    loading: false,
    error: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) =>{
            state.loading = true
        },
        loginSuccess: (state,action) =>{
            state.loading = false;
            state.currUser = action.payload
        },
        loginFailure: (state) =>{
            state.loading = false;
            state.error = true;
        },

        logout: (state)=>{
            state.currUser = null;
            state.loading = false;
            state.error = false;
        },
        subscription: (state,action)=>{
            if(state.currUser.subscribedChannels.includes(action.payload)){
                state.currUser.subscribedChannels.splice(
                    state.currUser.subscribedChannels.findIndex((id)=>id===action.payload),1
                );
            }
            else{
                state.currUser.subscribedChannels.push(action.payload);
            }
        }

    }
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } = userSlice.actions;

export default userSlice.reducer;