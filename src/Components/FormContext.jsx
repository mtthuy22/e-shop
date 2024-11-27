import React from "react";
import { createContext, useState, useEffect } from "react";

export const FormContext = createContext();

const FormContextProvider = ({ children }) => {
  //states to be shared in other page components
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    checkoutEmail: "",
    address1: "",
    address2: "",
    city: "",
    zipCode: "",
  });
  const FormContextValue = {
    formData,
    setFormData,
  };

  return (
    <FormContext.Provider value={FormContextValue}>
      {children}
    </FormContext.Provider>
  );
};
export default FormContextProvider;
