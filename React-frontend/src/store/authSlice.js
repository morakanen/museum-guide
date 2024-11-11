import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setAuthToken: (state, action) => { state.token = action.payload; },
    },
});

export const { setAuthToken } = authSlice.actions;

export const loginUser = () => async () => {
    try {
        const response = await fetch('https://data.fitzmuseum.cam.ac.uk/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({   body: JSON.stringify({ email: '"dinigic847@inikale.com"', password: 'helloworld08' })}),
        });
        const data = await response.json();
        dispatch(setAuthToken(data.token));
    } catch (error) {
        console.error("Login error:", error);
    }
};

export default authSlice.reducer;