import React from 'react';
import '../pages/Css/LoadingOverlay.css';

const LoadingOverlay = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-animation">
                {/* Retro Spinner */}
                <div className="retro-spinner"></div>

                {/* Retro Loading Bar */}
                <div className="loading-bar-container">
                    <div className="loading-bar"></div>
                </div>
                
                {/* Flickering Text */}
                <p className="loading-text">Loading... Please wait</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;