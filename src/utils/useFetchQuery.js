import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FetchContext } from "./context/fetchContext";

export const usePostQuery = (url, requestBody, { showBackDrop }) => {
  const [response, setResponse] = useState(null);

  const [setLoading, setError] = useContext(FetchContext);

  useEffect(() => {
    axios
      .post(url, requestBody)
      .then((res) => {
        setLoading(false);
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  });

  return { response };
};

export const useGetQuery = (url, otherValues) => {
  const [response, setResponse] = useState(null);
  let showBackDrop = null;
  if (otherValues) {
    showBackDrop = otherValues.showBackDrop;
  }

  const { setLoading, setError } = useContext(FetchContext);
  useEffect(() => {
    if (showBackDrop) {
      setLoading(true);
    }
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { response };
};
