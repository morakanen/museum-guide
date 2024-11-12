
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Auth0Provider } from '@auth0/auth0-react';




function App() {
  return (
    <Auth0Provider
    domain="dev-4noq8r1z3d23m7nl.uk.auth0.com"
    clientid="z9ZkAXWkkqzHYckByjmTzFE1M9RMw9Uz"
    redirectUri={window.location.origin}
    >
    <RouterProvider router={router}/>
    </Auth0Provider>
  );
}

export default App;