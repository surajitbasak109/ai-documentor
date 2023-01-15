import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiFetch from '../api/apiFetch';
import Input from '../components/Input';
import { UserContext } from '../contexts/user.context';

const defaultFormFields = {
  email: '',
  fullname: '',
  password: '',
};

const Register = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, fullname, password } = formFields;

  const resetFields = () => setFormFields(defaultFormFields);

  const navigate = useNavigate();
  const navigateToLogin = () => navigate('/login');

  const { setAuthenticated } = useContext(UserContext);

  const onChangeHandler = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitHandler = async event => {
    event.preventDefault();
    const apiInput = { ...formFields };
    try {
      const response = await apiFetch.post('/auth/register', apiInput);
      const { access_token: accessToken } = response.data;
      localStorage.setItem('access_token', accessToken);
      sessionStorage.setItem('access_token', accessToken);
      setAuthenticated(true);
      navigate('/');
      resetFields();
    } catch (error) {
      console.log(error);
      const { message } = error.response.data;
      Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
      });
    } finally {
    }
  };

  return (
    <div className="flex overflow-hidden justify-center items-center h-full">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 justify-start p-4 w-5/6 bg-gray-300 rounded-lg md:h-auto md:w-1/4 xl:w-1/8 md:justify-center dark:bg-gray-700"
      >
        <span className="mx-auto text-3xl dark:text-white">
          Register
        </span>
        <Input
          label={'Full name'}
          type="text"
          placeholder="type your full name"
          value={fullname}
          name={'fullname'}
          onChange={onChangeHandler}
          required
        />
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
        <p className='text-xs font-extralight'>Password must be 8 characters long, one uppercase, one lowercase, one digit and one symbol character is required. No spaces are allowed.</p>
        <button className="px-3 py-1 text-gray-100 bg-sky-500 rounded hover:bg-sky-600">
          Submit
        </button>
        <span
          onClick={navigateToLogin}
          className="mx-auto hover:underline dark:text-white"
        >
          Already have an account?
        </span>
      </form>
    </div>
  );
};

export default Register;
