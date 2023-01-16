import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { FUNCTIONALITIES } from '../constants/functionalities';

const FuncPreview = () => {
  const navigate = useNavigate();
  const clickHandler = id => () => {
    navigate(`/func/${id}`);
  };
  return (
    <div className="mt-5 mr-5 ml-5">
      <h1 className="text-3xl font-extrabold dark:text-white">
        Features
      </h1>
      <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 lg:grid-cols-4">
        {FUNCTIONALITIES.map(func => (
          <Card
            key={func.id}
            id={func.id}
            title={func.title}
            description={func.description}
            onClick={clickHandler(func.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FuncPreview;
