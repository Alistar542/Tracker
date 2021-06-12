import React, { createContext, useState } from "react";

export const FetchContext = createContext();

export const FetchProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <FetchContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};
