import { useState, useCallback } from "react";

const useFetchConversation = () => {
  const [error, setError] = useState(null);

  const fetchConversation = useCallback(async () => {
    try {
      const response = await fetch(import.meta.env.VITE_FETCH_CONVERSATION, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const status = response.status;
      let conversation = await response.json();

      if (Array.isArray(conversation)) {
        conversation = conversation.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
      } else {
        conversation = [];
      }

      return { conversation, status };
    } catch (error) {
      setError(error);
      return { conversation: [], status: 500 };
    }
  }, []);

  return { error, fetchConversation };
};

export default useFetchConversation;
