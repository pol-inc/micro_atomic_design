import React from "react";
import { ContextType } from "./type";
import composition from "../../../../CompositionRoot";

// context object
export const context = React.createContext(Object.create(null) as ContextType);

// Provider
export const DependencyProvider: React.FC = ({ children }) => {
  const contextValue = createContextValue();
  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

const createContextValue = () => {
  return {
    GetMessage: composition.GetMessageUseCase,
  };
};
