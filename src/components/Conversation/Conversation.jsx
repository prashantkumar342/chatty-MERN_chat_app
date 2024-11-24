import { useContext, useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Divider,
  Button
} from "@mui/material";
import { apiContext } from "../../context/api/ApiProvider";
import { useSocket } from "../../context/socket/socket";
import { GlobalVar } from "../../context/global/GlobalVariable";

function ConversationList() {
  const { handleFetchConversation, handleFetchRecipient } = useContext(apiContext);
  const { setIsChatBox, setIsPeoples, setChatBoxData, setMessages, userId } = useContext(GlobalVar);
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null); // Track the selected conversation ID
  const socket = useSocket();

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const conversationData = await handleFetchConversation();
        if (Array.isArray(conversationData)) {
          // Sort conversations by timestamp (assuming each convo has a lastMessage field)
          const sortedConversations = conversationData.sort(
            (a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
          );
          console.log("Sorted conversations:", sortedConversations);
          setConversations(sortedConversations); // No need to spread here
        } else {
          console.error("Fetched data is not an array:", conversationData);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversation();

    // Listen for conversation updates
    socket.on("conversationUpdate", data => {
      console.log(data);
      setConversations(prevConversations => {
        const conversationExists = prevConversations.some(convo => convo._id === data._id);

        if (conversationExists) {
          // Update existing conversation
          return prevConversations.map(convo => {
            if (convo._id === data._id) {
              return { ...convo, ...data };
            }
            return convo;
          }).sort((a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp));
        } else {
          // Add new conversation and sort
          return [...prevConversations, data].sort((a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp));
        }
      });

      // If the updated conversation is the currently selected one, update the messages state
      if (data._id === selectedConversationId) {
        setMessages(data.messages);
      }
    });

    return () => {
      socket.off("conversationUpdate");
    };
  }, [handleFetchConversation, selectedConversationId, socket]);

  const handleClick = async (convo) => {
    setIsChatBox(true);
    setIsPeoples(false);
    const recipient = await handleFetchRecipient(convo.senderId._id === userId ? convo.receiverId._id : convo.senderId._id);
    setMessages(convo.messages);
    setChatBoxData({ username: recipient.username, status: recipient.status, id: recipient._id });
    setSelectedConversationId(convo._id); // Set the selected conversation ID
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 bg-gray-100 h-16">
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          fullWidth
          slotProps={{ style: { borderRadius: "8px" } }}
        />
      </div>
      <Divider />

      <div className="flex-grow overflow-auto">
        <List>
          {conversations.map((convo) => (
            <div key={convo._id}>
              <ListItem
                component={Button}
                sx={{ textTransform: "none", color: "black" }}
                onClick={() => handleClick(convo)}
              >
                <ListItemAvatar>
                  <Avatar src={convo.avatar || "https://via.placeholder.com/150"} />
                </ListItemAvatar>
                <ListItemText
                  primary={convo.senderId._id === userId ? convo.receiverId.username : convo.senderId.username}
                  secondary={convo.lastMessage.content}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}

export default ConversationList;
