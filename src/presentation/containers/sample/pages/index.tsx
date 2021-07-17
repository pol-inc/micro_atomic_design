import React from "react";
import { useUserData } from "../hooks/useUserData";

export const IndexPage = () => {
  const { response } = useUserData();
  return <div>this is index page</div>;
};
