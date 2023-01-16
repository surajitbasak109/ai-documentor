import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Document from './Document';
import DocumentEditor from './DocumentEditor';
import DocumentPreview from './DocumentPreview';

const Documents = () => {
  return (
    <Routes>
      <Route index element={<DocumentPreview />} />
      <Route path=":id" element={<Document />} />
      <Route path="edit/:id" element={<DocumentEditor />} />
    </Routes>
  );
};

export default Documents;
