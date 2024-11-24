import PropTypes from "prop-types"
import { createContext, useState } from "react";

export const GlobalVar = createContext();

export function GlobalVariableProvider({ children }) {
  const [isDrawer, setIsDrawer] = useState(false);
  const [isPeoples, setIsPeoples] = useState(false);
  const [isChatBox, setIsChatBox] = useState(false);
  const [conversation, setConversation] = useState([])
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatBoxData, setChatBoxData] = useState({ username: "", status: "", avatar: "", id: "" });


  return (
    <GlobalVar.Provider value={{
      isDrawer,
      setIsDrawer,
      isPeoples,
      setIsPeoples,
      isChatBox,
      setIsChatBox,
      chatBoxData,
      setChatBoxData,
      conversation,
      setConversation,
      userId, setUserId,
      messages, setMessages
    }}>
      {children}
    </GlobalVar.Provider>
  )
}

GlobalVariableProvider.propTypes = { children: PropTypes.node.isRequired, }