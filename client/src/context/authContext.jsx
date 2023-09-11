/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

function Context({ children }) {
  const [user, setUser] = useState(false); // Initialize user state here
  const [admin, setAdmin] = useState(false); // Provide a default value if needed
  const [doctor, setDoctor] = useState(false); // Provide a default value if needed
  const [isLoading, setIsLoading] = useState(true); // Provide a default value if needed

  return (
    <AuthContext.Provider
      value={{ user, setUser, admin, setAdmin, doctor, setDoctor, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default Context;
