import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import store from './store/store'; // Correct the path to your Redux store

const AUTH0_DOMAIN = "dev-4noq8r1z3d23m7nl.uk.auth0.com";
const AUTH0_CLIENT_ID = "z9ZkAXWkkqzHYckByjmTzFE1M9RMw9Uz";

// Wrapping App component with both Auth0Provider and Redux Provider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
    domain={AUTH0_DOMAIN}
    clientId={AUTH0_CLIENT_ID}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </StrictMode>
);