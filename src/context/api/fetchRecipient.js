import { useState, useCallback } from "react";

const useFetchRecipient = () => {
  const [error, setError] = useState(null);

  const fetchRecipient = useCallback(async (recipientId) => {
    try {
      const response = await fetch(import.meta.env.VITE_FETCH_RECIPIENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient: recipientId }),
        credentials: "include",
      });
      const status = response.status;
      const recipient = await response.json();
      return {recipient, status};
    } catch (error) {
      setError(error);
    }
  }, []);

  return { error, fetchRecipient };
};

export default useFetchRecipient;
