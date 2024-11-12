import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/userstateSlice';
import './Css/Loginpage.css';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../components/LoadingOverlay';
import { useFormik } from 'formik';
import * as Yup from 'yup';



const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false); // State for showing overlay
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Define the validation schema using Yup
    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters'),
        password: Yup.string()
            .required('Password is required')
            .min(3, 'Password must be at least 6 characters'),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values, { setFieldError }) => {
            try {
                const response = await axios.post('http://localhost:5005/api/login', values);
                const token = response.data.token;
                localStorage.setItem('token', token); // Persist the token
                const user = jwtDecode(token); // Decode to get user info
                dispatch(loginSuccess({ token, user })); // Update Redux store with user info

                setIsLoading(true); // Show the overlay

                // Delay for the overlay display before redirecting and refreshing
                setTimeout(() => {
                    setIsLoading(false); // Hide overlay after timeout
                    navigate('/homepage'); // Navigate to homepage
                    window.location.reload(); // Refresh the page
                }, 2000);
            } catch (err) {
                setFieldError('general', 'Invalid username or password');
            }
        },
    });

    return (
        <div className="login-container">
            {isLoading && <LoadingOverlay />} {/* Show overlay if isLoading is true */}

            <form onSubmit={formik.handleSubmit} className="login-form">
                <h2>Login</h2>
                
                {/* Display general error message */}
                {formik.errors.general && <p className="error">{formik.errors.general}</p>}

                {/* Username Field */}
                <input
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Username"
                />
                {formik.touched.username && formik.errors.username ? (
                    <p className="error">{formik.errors.username}</p>
                ) : null}

                {/* Password Field */}
                <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password"
                />
                {formik.touched.password && formik.errors.password ? (
                    <p className="error">{formik.errors.password}</p>
                ) : null}

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;