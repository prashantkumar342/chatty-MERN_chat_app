import { useCallback, useState } from "react";

const useAuthenticate = () => {
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  const authenticateUser = useCallback(async () => {
    setAuthLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_AUTHENTICATIE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const status = response.status;
      const data = await response.json();
      return { status, data };
    } catch (error) {
      setError(error);
      return { status: 500, data: null }; // Ensure an object is always returned
    } finally {
      setAuthLoading(false);
    }
  }, []);
  return { authLoading, error, authenticateUser };
};

export default useAuthenticate;
