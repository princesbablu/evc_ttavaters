import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Web3OnboardProvider } from './config/context';
import "./i18n"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Web3OnboardProvider>
  <BrowserRouter>
        <App  />
  </BrowserRouter>
  </Web3OnboardProvider>
);
