import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/userActions';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import "./Css/registration.css";

function Registration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setIsSubmitting(true);
      try {
        await dispatch(registerUser(values));
        toast.success(
          ({ closeToast }) => (
            <div>
              <p>Registration successful!</p>
              <button
                onClick={() => {
                  closeToast();
                  navigate('/login');
                }}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                }}
              >
                Go to Login
              </button>
            </div>
          ),
          {
            position: 'top-center',
            autoClose: false,
            closeOnClick: false,
            draggable: false,
          }
        );
      } catch (err) {
        setSubmitting(false);
        toast.error('Registration failed. Please try again.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="registration-container">
      <form
        className="registration-form"
        onSubmit={formik.handleSubmit}
        disabled={isSubmitting}
      >
        <h2>Register</h2>

        {/* Username Field */}
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isSubmitting}
        />
        {formik.touched.username && formik.errors.username ? (
          <p className="error">{formik.errors.username}</p>
        ) : null}

        {/* Email Field */}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isSubmitting}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="error">{formik.errors.email}</p>
        ) : null}

        {/* Password Field */}
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isSubmitting}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="error">{formik.errors.password}</p>
        ) : null}

        {/* Submit Button */}
        <button type="submit" className="register-btn" disabled={isSubmitting || formik.isSubmitting}>
          Register
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Registration;