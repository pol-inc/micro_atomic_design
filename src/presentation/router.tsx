import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import * as C from "./containers";

const Wrapper = () => {
  const location = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
};

const Router: React.FC = () => {
  return (
    <>
      <Wrapper />
      <Routes>
        <Route path="/" element={<C.Sample />} />
      </Routes>
    </>
  );
};

export { Router };
