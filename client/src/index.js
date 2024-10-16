import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider } from 'react-redux'
import store from './redux/store.js';

import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <Provider store={store}>
    <Auth0Provider
     domain="dev-x6xjza4nff0jd65a.us.auth0.com"
    clientId="p6Vbd39K5AhEXZ27GufIM523I7fPJGrz"
   
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
  </Provider>

);

