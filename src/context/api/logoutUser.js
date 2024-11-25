import { useCallback, useState } from "react";

const useLogoutUser = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [error, setError] = useState(null);

  const logoutUser = useCallback(async () => {
    setLogoutLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_LOGOUT_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const status = response.status;
      return { status };
    } catch (error) {
      setError(error);
      return { status: 500, data: null };
    } finally {
      setLogoutLoading(false);
    }
  }, []);
  return { logoutLoading, error, logoutUser };
};

export default useLogoutUser;
