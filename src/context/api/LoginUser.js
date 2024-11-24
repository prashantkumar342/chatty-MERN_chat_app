import { useCallback, useState } from "react";

const useLoginUser = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState(null);

  const LoginUser = useCallback(async (username, password) => {
    setLoginLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_LOGIN_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const status = response.status;
      return status;
    } catch (error) {
      setError(error);
    } finally {
      setLoginLoading(false);
    }
  }, []);
  return { loginLoading, error, LoginUser };
};

export default useLoginUser;
