import React, { useState, useEffect } from 'react';

const useFetch = (initialUrl, initialOptions = {}) => {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(url);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, options]);

  return { data, error, isLoading };
};

export default useFetch;
