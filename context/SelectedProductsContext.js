"use client";
import React, { createContext, useContext, useState } from "react";

// Create context
const SelectedProductsContext = createContext();

// Provider component
export const SelectedProductsProvider = ({ children }) => {
  const [selectedBurqas, setSelectedBurqas] = useState([]);

  return (
    <SelectedProductsContext.Provider
      value={{ selectedBurqas, setSelectedBurqas }}
    >
      {children}
    </SelectedProductsContext.Provider>
  );
};

// Custom hook
export const useSelectedBurqas = () => useContext(SelectedProductsContext);
