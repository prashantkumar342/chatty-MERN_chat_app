import { useCallback, useState } from "react";

const useFetchUsers = () => {
  const [fetchLoading, setfetchLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setfetchLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_FETCH_USERS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const status = response.status;
      const users = response.json();
      return {status, users};
    } catch (error) {
      setError(error);
    } finally {
      setfetchLoading(false);
    }
  }, []);
  return { fetchLoading, error, fetchUsers};
};

export default useFetchUsers;
