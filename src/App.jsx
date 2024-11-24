import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dasboard";
import Form from "./components/Forms/Form";

import { apiContext } from './context/api/ApiProvider';
import { useContext, useEffect } from "react";
import { useSocket } from "./context/socket/socket";
import { GlobalVar } from "./context/global/GlobalVariable";

function App() {
  const socket = useSocket();
  const { handleAuthenticateUser, isLoggedIn } = useContext(apiContext);
  const { setUserId } = useContext(GlobalVar);

  useEffect(() => {
    const authenticate = async () => {
      const { status, data } = await handleAuthenticateUser();
      if (status === 200 && data) {
        setUserId(data.userID);
      }
    };
    authenticate();

    if (socket) {
      socket.connect();
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to='/dashboard' /> : <Navigate to='/setup' />} />
        <Route path="/setup" element={isLoggedIn ? <Navigate to='/dashboard' /> : <Form />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to='/setup' />} />
      </Routes>
    </div>
  );
}

export default App;
