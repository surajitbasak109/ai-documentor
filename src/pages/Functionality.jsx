import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FuncConsole from './FuncConsole';
import FuncPreview from './FuncPreview';

const Functionality = () => {
  return (
    <Routes>
      <Route index element={<FuncPreview />} />
      <Route path=":id" element={<FuncConsole />} />
    </Routes>
  );
};

export default Functionality;
