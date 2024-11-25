import {
  TextField,
  IconButton,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import ArrowBackIcon
import { useContext, useEffect, useState, useRef } from "react";
import { GlobalVar } from "../../context/global/GlobalVariable";
import { useSocket } from "../../context/socket/socket";

function ChatBox() {
  const socket = useSocket();
  const { chatBoxData, setChatBoxData, messages, profile, setIsChatBox, setSelectedConversationId } = useContext(GlobalVar);
  const [typedMessage, setTypedMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Automatically scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("onStatus", (data) => {
        if (chatBoxData.username === data.user) {
          setChatBoxData((prevData) => ({
            ...prevData,
            status: data.onlineStatus,
          }));
        }
      });
    }

    return () => {
      socket.off("onStatus");
    };
  }, [socket, chatBoxData.username, setChatBoxData]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && typedMessage.trim()) {
      socket.emit("sendMessage", {
        recipient: chatBoxData.id,
        message: typedMessage.trim(),
      });
      setTypedMessage("");
    }
  };

  const handleBack = () => {
    setSelectedConversationId(null)
    setIsChatBox(false);
  };

  return (
    <div className="flex-grow max-sm:w-screen h-full 
     overflow-y-auto
    flex flex-col max-sm:fixed top-0">
      <ListItem className="px-4 border-b border-gray-300 bg-gray-100 h-14">
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <ListItemAvatar>
          <Avatar sx={{ width: 40, height: 40 }} src={chatBoxData.avatar} />
        </ListItemAvatar>
        <ListItemText primary={chatBoxData.username} secondary={chatBoxData.status} />
      </ListItem>
      <div className="flex-grow overflow-auto p-4 space-y-2  bg-white">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.sender === profile._id ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2  max-w-xs ${message.sender === profile._id
                ? "bg-blue-500 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl text-white"
                : "bg-gray-200 rounded-b-2xl rounded-tr-2xl text-black"
                }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {/* Dummy div to scroll into view */}
        <div ref={messagesEndRef} />
      </div>
      {/* Input Field */}
      <div className="p-3 bg-gray-100 border-t max-sm:border-none border-gray-300 flex items-center">
        <Avatar sx={{ width: 32, height: 32 }} src="/static/images/avatar/1.jpg" />
        <form className="flex items-center w-full" onSubmit={sendMessage}>
          <TextField
            variant="outlined"
            placeholder="Type a message"
            fullWidth
            onChange={(e) => setTypedMessage(e.target.value)}
            value={typedMessage}
            sx={{ ml: 1, flexGrow: 1 }} // Added flexGrow for responsive behavior
            size="small"
          />
          <IconButton color="primary" sx={{ ml: 1 }} type="submit">
            <SendIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
