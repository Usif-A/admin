'use client'
import React, { createContext, useState } from 'react';

export const Account = createContext();

export const AccContext = ({ children }) => {
  const [value, setValue] = useState({"acc_name":"Change Account"});

  return (
    <Account.Provider value={{ value, setValue }}>
      {children}
    </Account.Provider>
  );
};