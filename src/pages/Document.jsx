import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillEdit, AiOutlineArrowLeft } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import apiFetch from '../api/apiFetch';
import { DocumentContext } from '../contexts/documents.context';

const Document = () => {
  const { id } = useParams();
  const { documents, isUpdated, updateDocuments } =
    useContext(DocumentContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const document = documents.find(doc => doc.id === parseInt(id));
    if (document) {
      setTitle(document.title);
      setContent(document.content);
    }
  }, [documents, isUpdated]);

  const deleteDocument = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await apiFetch.delete(`/documents/${id}`, {
            headers: {
              Authorization:
                'Bearer ' + localStorage.getItem('access_token'),
            },
          });
          Swal.fire(
            'Deleted!',
            'Document has been deleted.',
            'success'
          );
          updateDocuments();
          backToDocuments();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const backToDocuments = () => navigate('/documents');
  const editDocument = () => navigate(`/documents/edit/${id}`);
  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <h1 className="text-3xl font-extrabold whitespace-pre-wrap dark:text-white">
        {title}
      </h1>
      <div className="flex gap-4">
        <button
          onClick={backToDocuments}
          className="flex justify-center items-center p-2 w-36 text-white bg-sky-500 rounded hover:bg-sky-600"
        >
          <AiOutlineArrowLeft className="mr-1" />
          Back
        </button>
        <button
          onClick={editDocument}
          className="flex justify-center items-center p-2 w-36 text-white bg-purple-500 rounded hover:bg-purple-600"
        >
          <AiFillEdit className="mr-1" />
          Edit
        </button>
        <button
          onClick={deleteDocument}
          className="flex justify-center items-center p-2 w-36 text-white bg-red-500 rounded hover:bg-red-600"
        >
          <FaTrash className="mr-1" />
          Delete
        </button>
      </div>
      <div className="w-full bg-gray-300 rounded dark:bg-gray-600">
        <pre className="p-2 whitespace-pre-wrap dark:text-white">
          {content}
        </pre>
      </div>
    </div>
  );
};

export default Document;
