import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { DocumentContext } from '../contexts/documents.context';

const DocumentPreview = () => {
  const { documents } = useContext(DocumentContext);
  const navigate = useNavigate();
  const [displayDocuments, setDisplayDocuments] =
    useState(documents);
  const [searchKeyword, setSearchKeyword] = useState('');
  const onChangeHandler = event =>
    setSearchKeyword(event.target.value);
  const onSubmitHandler = event => {
    event.preventDefault();
    const filteredDocuments = documents.filter(
      doc =>
        doc.content
          .toLowerCase()
          .includes(searchKeyword.toLowerCase()) ||
        doc.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setDisplayDocuments(filteredDocuments);
  };
  const clickHandler = id => () => {
    navigate(`/documents/${id}`);
  };

  useEffect(() => {
    setDisplayDocuments(documents);
  }, [documents]);
  return (
    <div className="mt-5 mr-5 ml-5">
      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
        <h1 className="text-3xl font-extrabold dark:text-white">
          Your saved Documents
        </h1>
        <SearchBar
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
          value={searchKeyword}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 lg:grid-cols-4">
        {displayDocuments.map(doc => (
          <Card
            key={doc.id}
            id={doc.id}
            title={doc.title}
            description={
              doc.content.length > 100
                ? doc.content.slice(0, 100) + '...'
                : doc.description
            }
            onClick={clickHandler(doc.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentPreview;
