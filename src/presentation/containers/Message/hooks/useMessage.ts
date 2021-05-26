import { useContext, useEffect, useState } from "react";
import { DependecyContext } from "../context";

export const useMessage = () => {
  const { GetMessage } = useContext(DependecyContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await GetMessage.handle();
      result.match({
        Ok: (v) => setMessages(v),
        Err: (e) => console.log("エラー出力"),
      });
    })();
  }, []);

  return {
    messages,
  };
};
