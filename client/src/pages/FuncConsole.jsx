import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';
import apiFetch from '../api/apiFetch';
import TextArea from '../components/TextArea';
import {
  EXAMPLES,
  FUNCTIONALITIES,
  URLS,
} from '../constants/functionalities';
import { DocumentContext } from '../contexts/documents.context';

const FuncConsole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateDocuments } = useContext(DocumentContext);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [func, setFunc] = useState({
    id: 0,
    title: '',
    description: '',
  });
  const [example, setExample] = useState({
    input: '',
    output: '',
  });
  const [apiInProgress, setApiInProgress] = useState(false);

  const backToFeatures = () => navigate('/func');

  const onChangeHandler = event => setInput(event.target.value);
  const onSubmitHandler = async () => {
    const route = `func/${URLS[id]}`;
    const apiInput = {
      prompt: input,
    };

    try {
      setApiInProgress(true);
      const response = await apiFetch.post(route, apiInput, {
        headers: {
          Authorization:
            'Bearer ' + localStorage.getItem('access_token'),
        },
      });

      setOutput(response.data.results.trim());
    } catch (error) {
      console.log(error);
      const { message } = error.response.data;
      Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
      });
    } finally {
      setApiInProgress(false);
    }
  };
  const clear = () => {
    setInput('');
    setOutput('');
  };

  const copyOutputToClipboard = () =>
    navigator.clipboard.writeText(output);
  const saveOutputToDocument = async () => {
    const apiInput = {
      title: URLS[id].slice(1) + ' ' + new Date().toLocaleString(),
      content: output,
    };
    try {
      setApiInProgress(true);
      await apiFetch.post('/documents', apiInput, {
        headers: {
          Authorization:
            'Bearer ' + localStorage.getItem('access_token'),
        },
      });

      updateDocuments();
    } catch (error) {
      console.log(error);
      const { message } = error.response.data;
      Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
      });
    } finally {
      setApiInProgress(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
      return;
    }

    setFunc(FUNCTIONALITIES.find(func => func.id === parseInt(id)));
    setExample(EXAMPLES[id]);
  }, []);
  return (
    <div className="flex flex-col gap-4 mx-3 my-5">
      <h1 className="text-3xl font-extrabold dark:text-white">
        {func.title}
      </h1>
      <button
        className="p-2 w-36 text-white bg-sky-500 rounded"
        onClick={backToFeatures}
      >
        Back
      </button>
      <pre className="dark:text-white">{func.description}</pre>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <TextArea
          label="input"
          placeholder={example.input}
          value={input}
          onChange={onChangeHandler}
          disabled={apiInProgress}
        />
        <TextArea
          label="output"
          placeholder={example.output}
          value={output}
          disabled
        />
      </div>
      <div className="flex flex-row gap-4 justify-end">
        <button
          disabled={apiInProgress}
          className="flex justify-center items-center p-2 w-36 text-white bg-sky-500 rounded hover:bg-sky-600"
          onClick={onSubmitHandler}
        >
          {apiInProgress && (
            <FaSpinner className="mr-1 animate-spin" />
          )}
          Submit
        </button>
        <button
          className="p-2 w-36 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={clear}
        >
          Clear
        </button>
        <button
          className="p-2 w-36 text-white bg-gray-500 rounded hover:bg-gray-600"
          onClick={copyOutputToClipboard}
        >
          Copy output
        </button>
        <button
          disabled={apiInProgress}
          className="p-2 w-36 text-white bg-green-500 rounded hover:bg-green-600"
          onClick={saveOutputToDocument}
        >
          {apiInProgress && (
            <FaSpinner className="mr-1 animate-spin" />
          )}
          Save output
        </button>
      </div>
    </div>
  );
};

export default FuncConsole;
