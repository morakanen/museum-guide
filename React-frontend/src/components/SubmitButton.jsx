import React from 'react';
import { useNavigation } from 'react-router-dom';

const SubmitButton = ({ text }) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return (
      <button
        className={`btn btn-primary w-full max-w-xs mt-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        form="form"
        disabled={isSubmitting}
      >
        {isSubmitting ?(
            <>
                <span classname="loading loading-spinner"></span>
                submitting ...
            </>
    ):(
            text||"submit"
    )}
      </button>
    );
  };


export default SubmitButton;