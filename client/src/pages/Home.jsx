import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-red-500">
          Documentor
        </span>{" "}
        AI powered.
      </h1>
      <div className="grid grid-cols-1 gap-20 mt-5 md:grid-cols-2">
        <div className="flex flex-col">
          <pre className="font-extrabold dark:text-white text-md md:text-2xl">
            powered by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-green-600">
              Open AI GPT-3
            </span>{" "}
          </pre>
          <pre className="mt-10 whitespace-pre-wrap dark:text-white">
            Thanks to powerful Artifitical Intelligence GPT-3, Documentor could
            analyze your requirement intelligently, Provide accurate and useful
            feedback.
          </pre>
        </div>
        <div className="flex flex-col">
          <pre className="font-extrabold dark:text-white text-md md:text-2xl">
            One tool handles{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-lime-600">
              all paper works
            </span>{" "}
          </pre>
          <pre className="mt-10 whitespace-pre-wrap dark:text-white">
            Documentor could correct the grammar of documents, summarize the
            long and hard to understand documents to short and intuitive
            summary, generate essay outline based on specified topic, and
            extract keywords from documents.
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Home;
