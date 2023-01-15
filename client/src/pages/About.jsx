import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const About = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-extrabold dark:text-white">
        About Me
      </h1>
      <div className="mt-10 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex flex-row p-5">
          <h1 className="text-2xl font-bold dark:text-white">
            Surajit Basak
          </h1>
          <a
            href="https://github.com/surajitbasak109"
            className="ml-3"
          >
            <FaGithub className="w-10 h-10" />
          </a>
          <a
            href="https://linkedin.com/in/surajitbasak109"
            className="ml-3"
          >
            <FaLinkedin className="w-10 h-10" />
          </a>
        </div>
        <pre className="p-5 whitespace-pre-wrap dark:text-white">
          Email: surajitbasak109@gmail.com
        </pre>
      </div>
    </div>
  );
};

export default About;
