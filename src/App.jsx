import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Documents from './pages/Documents';
import Functionality from './pages/Functionality';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import Register from './pages/Register';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/func/*" element={<Functionality />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/documents/*" element={<Documents />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default App;
