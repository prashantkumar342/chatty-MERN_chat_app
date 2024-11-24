/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import useRegisterUser from './RegisterUser';
import useLoginUser from './LoginUser';
import useAuthenticate from './authenticate';
import useFetchUsers from './fetchUsers';
import useFetchRecipient from './fetchRecipient';
import { useSocket } from '../socket/socket';
import useFetchConversation from './fetchConversation';

export const apiContext = createContext();

export function ApiProvider({ children }) {
  const socket = useSocket();
  const navigate = useNavigate();
  const { registerUser, regLoading } = useRegisterUser();
  const { LoginUser, loginLoading } = useLoginUser();
  const { authenticateUser, authLoading } = useAuthenticate();
  const { users, fetchLoading, fetchUsers } = useFetchUsers();
  const { fetchRecipient } = useFetchRecipient();
  const { fetchConversation } = useFetchConversation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegisterUser = async (username, email, phone, password) => {
    if (username === "" || email === "" || password === "" || phone === "") {
      toast.error("All fields are required");
    } else {
      const status = await registerUser(username, email, phone, password);
      if (status !== 201) {
        toast.dismiss();
        toast.error("Something went wrong");
      } else {
        toast.dismiss();
        toast.success("Registration successful");
      }
    }
  };

  const handleLoginUser = async (username, password) => {
    if (username === "" || password === "") {
      toast.error("All fields are required");
    } else {
      const status = await LoginUser(username, password);
      if (status !== 200) {
        toast.dismiss();
        toast.error("Please check your username and password");
      } else {
        if (socket) {
          socket.connect();
        }
        navigate("/dashboard");
        toast.dismiss();
        toast.success("Login successful");
        setIsLoggedIn(true);
      }
    }
  };

  const handleAuthenticateUser = async () => {
    const { status, data } = await authenticateUser();
    if (status !== 200) {
      setIsLoggedIn(false);
      return { status, data: null };
    } else {
      setIsLoggedIn(true);
      return { status, data };
    }
  };

  const handleFetchUsers = async () => {
    const status = await fetchUsers();
    if (status !== 200) {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  const handleFetchRecipient = async (recipientId) => {
    const { recipient } = await fetchRecipient(recipientId);
    return recipient;
  };

  const handleFetchConversation = async () => {
    const { conversation } = await fetchConversation();
    
    return conversation;
    
  };

  return (
    <apiContext.Provider
      value={{
        regLoading,
        loginLoading,
        handleRegisterUser,
        handleLoginUser,
        isLoggedIn,
        handleAuthenticateUser,
        authLoading,
        users,
        fetchLoading,
        handleFetchUsers,
        handleFetchRecipient,
        handleFetchConversation,
      }}
    >
      {children}
    </apiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
