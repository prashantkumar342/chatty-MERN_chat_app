import { useCallback, useState } from "react"

const useRegisterUser = () => {
  const [regLoading, setRegLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = useCallback(async (username, email, phone, password) => {
    setRegLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_REG_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, phone, password }),
        credentials: "include",
      });
      const registerationStatus = response.status
      return registerationStatus
    } catch (error) {
      setError(error);
    } finally {
      setRegLoading(false);
    }
  }, [])
  return {  regLoading, error, registerUser };
}

export default useRegisterUser;