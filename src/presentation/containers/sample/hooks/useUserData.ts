import { useEffect, useContext, useState } from "react";
import { contextDependency } from "../context/dependency";

export const useUserData = () => {
  const { GetUserData } = useContext(contextDependency);
  const [response, setResponse] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const result = await GetUserData.handle();
      setResponse(result);
    })();
  }, []);

  return {
    response,
  };
};
