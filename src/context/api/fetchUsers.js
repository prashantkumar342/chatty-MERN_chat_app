import { useCallback, useState } from "react";

const useFetchUsers = () => {
  const [fetchLoading, setfetchLoading] = useState(false);
  const [users, setUsers] = useState([]);
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
      setUsers(await response.json());
      return status;
    } catch (error) {
      setError(error);
    } finally {
      setfetchLoading(false);
    }
  }, []);
  return { fetchLoading, error, fetchUsers, users };
};

export default useFetchUsers;
