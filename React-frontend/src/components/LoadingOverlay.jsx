import React from 'react';
import '../pages/Css/LoadingOverlay.css';

const LoadingOverlay = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-animation">
                <div className="spinner"></div>
                <p>Redirecting... Please wait while we redirect you to the homepage.</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;