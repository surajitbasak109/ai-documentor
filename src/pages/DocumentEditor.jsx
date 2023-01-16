import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiFetch from '../api/apiFetch';
import { DocumentContext } from '../contexts/documents.context';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Swal from 'sweetalert2';

const DocumentEditor = () => {
  const { id } = useParams();
  const { documents, isUpdated, updateDocuments } =
    useContext(DocumentContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleChangeHandler = event => setTitle(event.target.value);
  const contentChangeHandler = event =>
    setContent(event.target.value);
  const navigate = useNavigate();

  useEffect(() => {
    const document = documents.find(doc => doc.id === parseInt(id));
    if (document) {
      setTitle(document.title);
      setContent(document.content);
    }
  }, [documents, isUpdated]);

  const backToDocument = () => navigate('/documents');
  const handleEdit = async () => {
    try {
      const route = `/documents/${id}`;
      const apiInput = { title, content };
      const response = await apiFetch.put(route, apiInput, {
        headers: {
          Authorization:
            'Bearer ' + localStorage.getItem('access_token'),
        },
      });

      Swal.fire({
        title: 'Success',
        text: response.data.message,
        timer: 2000,
        icon: 'success',
      });

      updateDocuments();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      <pre className="text-3xl dark:text-white">Edit document</pre>
      <button
        onClick={backToDocument}
        className="p-2 w-36 text-white bg-sky-500 rounded hover:bg-sky-600"
      >
        Back
      </button>
      <Input
        label="Title"
        value={title}
        onChange={titleChangeHandler}
      />
      <TextArea
        value={content}
        label="Description"
        placeholder="Enter description"
        onChange={contentChangeHandler}
      />
      <button
        onClick={handleEdit}
        className="p-2 w-36 text-white bg-sky-500 rounded hover:bg-sky-600"
      >
        Submit
      </button>
    </div>
  );
};

export default DocumentEditor;
