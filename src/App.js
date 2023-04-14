import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Home from './pages/home';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer theme="colored"/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Landing" element={<Landing />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;