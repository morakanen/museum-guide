
import axios from 'axios';

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5005/api/users/register', userData, {
      headers: {
        'Content-Type': 'application/json' // Make sure Content-Type is set to JSON
      }
    });

    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'USER_REGISTER_FAIL', payload: error.response?.data || error.message });
  }
};