import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';

import { UserContext } from '../contexts/user.context';
import apiFetch from '../api/apiFetch';
import Input from '../components/Input';

const defaultFormFields = {
  email: '',
  password: '',
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [apiInProgress, setApiInProgress] = useState(false);
  const { email, password } = formFields;
  const navigate = useNavigate();
  const navigateToRegister = () => navigate('/register');
  const { authenticated, setAuthenticated } =
    useContext(UserContext);

  const resetFields = () => setFormFields(defaultFormFields);

  const onChangeHandler = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmit = async event => {
    event.preventDefault();

    const apiInput = { ...formFields };
    try {
      setApiInProgress(true);
      const response = await apiFetch.post('/auth/login', apiInput);
      const { access_token: accessToken } = response.data;
      localStorage.setItem('access_token', accessToken);
      sessionStorage.setItem('access_token', accessToken);
      setAuthenticated(true);
      resetFields();
      navigate('/');
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

  return (
    <div className="flex overflow-hidden justify-center items-center h-full">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 justify-start p-4 w-5/6 bg-gray-300 rounded-lg md:h-auto md:w-1/4 xl:w-1/8 md:justify-center dark:bg-gray-700"
      >
        <span className="mx-auto text-3xl dark:text-white">
          Login
        </span>
        <Input
          label={'Email'}
          type="email"
          placeholder="example@email.com"
          value={email}
          name={'email'}
          onChange={onChangeHandler}
          required
        />
        <Input
          label={'Password'}
          placeholder="type your password"
          type="password"
          value={password}
          name={'password'}
          onChange={onChangeHandler}
          required
        />
        <button
          disabled={apiInProgress}
          className="flex justify-center items-center px-3 py-1 text-gray-100 bg-sky-500 rounded hover:bg-sky-600"
        >
          {apiInProgress && (
            <FaSpinner className="mr-1 animate-spin" />
          )}
          Submit
        </button>
        <span
          onClick={navigateToRegister}
          className="mx-auto hover:underline dark:text-white"
        >
          Doesn't have an account?
        </span>
      </form>
    </div>
  );
};

export default Login;
