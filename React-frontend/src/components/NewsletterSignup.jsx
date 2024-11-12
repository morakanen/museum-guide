import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsletterSignup = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await axios.post('http://localhost:5005/api/newsletter-signup', values);
                toast.success('Thank you for signing up for our newsletter!');
                resetForm();
            } catch (error) {
                toast.error('Something went wrong. Please try again.');
            }
        },
    });

    return (
        <div className="newsletter-signup">
            <h2>Sign Up for Our Newsletter</h2>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                    <p className="error">{formik.errors.email}</p>
                ) : null}
                <button type="submit">Sign Up</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default NewsletterSignup;
