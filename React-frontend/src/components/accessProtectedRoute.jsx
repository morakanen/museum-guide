import axios from 'axios';
import { useSelector } from 'react-redux';

const accessProtectedRoute = async () => {
  const token = useSelector((state) => state.auth.token);
  if (!token) {
    console.error('No token found');
    return;
  }

  try {
    const response = await axios.get('http://localhost:5005/api/protected', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error accessing protected route:', error);
  }
};