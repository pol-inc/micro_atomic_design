import React from "react";
import { DependencyProvider } from "./context/dependency";
import { IndexPage } from "./pages";

export const Sample: React.FC = () => {
  return (
    <DependencyProvider>
      <IndexPage />
    </DependencyProvider>
  );
};
