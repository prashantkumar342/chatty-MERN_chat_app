import {
  TextField,
  IconButton,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useContext, useEffect, useState, useRef } from "react";
import { GlobalVar } from "../../context/global/GlobalVariable";
import { useSocket } from "../../context/socket/socket";

function ChatBox() {
  const socket = useSocket();
  const { chatBoxData, setChatBoxData, messages, userId } = useContext(GlobalVar);
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

  return (
    <div className="flex flex-col h-full">
      {/* Recipient Info */}
      <ListItem className="px-4 border-b border-gray-300 bg-gray-100 h-14">
        <ListItemAvatar>
          <Avatar sx={{ width: 40, height: 40 }} src={chatBoxData.avatar} />
        </ListItemAvatar>
        <ListItemText primary={chatBoxData.username} secondary={chatBoxData.status} />
      </ListItem>
      {/* Messages Container */}
      <div className="flex-grow overflow-auto p-4 space-y-2">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.sender === userId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 rounded-lg max-w-xs ${message.sender === userId
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
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
      <div className="p-3 bg-gray-100 border-t border-gray-300 flex items-center">
        <Avatar sx={{ width: 32, height: 32 }} src="/static/images/avatar/1.jpg" />
        <form className="flex items-center w-full" onSubmit={sendMessage}>
          <TextField
            variant="outlined"
            placeholder="Type a message"
            fullWidth
            onChange={(e) => setTypedMessage(e.target.value)}
            value={typedMessage}
            sx={{ ml: 1 }}
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