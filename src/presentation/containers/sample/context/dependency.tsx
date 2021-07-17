import React from "react";
import composition from "../../../CompositionRoot";

type Context = {
  GetUserData: typeof composition.GetMessageUseCase;
};
export const contextDependency = React.createContext(
  Object.create(null) as Context
);

export const DependencyProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const value = {
    GetUserData: composition.GetMessageUseCase,
  };
  return (
    <contextDependency.Provider value={value}>
      {children}
    </contextDependency.Provider>
  );
};
