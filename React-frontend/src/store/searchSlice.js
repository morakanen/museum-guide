import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: { results: [], status: 'idle', error: null },
    reducers: {
        setSearchResults: (state, action) => { state.results = action.payload; },
    },
});

export const { setSearchResults } = searchSlice.actions;

export const fetchResults = (query, token) => async (dispatch) => {
    try {
        const response = await fetch(`https://data.fitzmuseum.cam.ac.uk/api/your-collection-endpoint?query=${query}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        dispatch(setSearchResults(data));
    } catch (error) {
        console.error("Error fetching collection data:", error);
    }
};

export default searchSlice.reducer;