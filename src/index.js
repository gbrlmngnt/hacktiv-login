import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Landing from './pages/Landing';
import { store } from './features/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();