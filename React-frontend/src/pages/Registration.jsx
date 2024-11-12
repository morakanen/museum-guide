import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/userActions';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


function Registration() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await dispatch(registerUser(formData));
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
      setIsSubmitting(false);
      toast.error('Registration failed. Please try again.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
      <div className="registration-container">
        <form className="registration-form" onSubmit={handleSubmit} disabled={isSubmitting}>
          <h2>Register</h2>
          
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          
          <button type="submit" className="register-btn" disabled={isSubmitting}>
            Register
          </button>
        </form>

        <ToastContainer />
      </div>
  );
}

export default Registration;