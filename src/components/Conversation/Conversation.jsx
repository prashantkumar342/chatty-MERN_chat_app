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
  const { setIsChatBox, setIsPeoples, setChatBoxData, setMessages, profile, selectedConversationId, setSelectedConversationId } = useContext(GlobalVar);
  const [conversations, setConversations] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const conversationData = await handleFetchConversation();
        if (Array.isArray(conversationData)) {
          // Sort conversations by timestamp (ensure lastMessage and timestamp exist)
          const sortedConversations = conversationData.sort((a, b) => {
            const aTimestamp = a.lastMessage ? new Date(a.lastMessage.timestamp) : 0;
            const bTimestamp = b.lastMessage ? new Date(b.lastMessage.timestamp) : 0;
            return bTimestamp - aTimestamp;
          });
          console.log("Sorted conversations:", sortedConversations);
          setConversations(sortedConversations);
        } else {
          console.error("Fetched data is not an array:", conversationData);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchConversation();

    if (socket) {
      socket.on("conversationUpdate", data => {
        setConversations(prevConversations => {
          const conversationExists = prevConversations.some(convo => convo._id === data._id);

          if (conversationExists) {
            return prevConversations.map(convo => {
              if (convo._id === data._id) {
                console.log(data);
                return { ...convo, ...data };
              }
              return convo;
            }).sort((a, b) => {
              const aTimestamp = a.lastMessage ? new Date(a.lastMessage.timestamp) : 0;
              const bTimestamp = b.lastMessage ? new Date(b.lastMessage.timestamp) : 0;
              return bTimestamp - aTimestamp;
            });
          } else {
            return [...prevConversations, data].sort((a, b) => {
              const aTimestamp = a.lastMessage ? new Date(a.lastMessage.timestamp) : 0;
              const bTimestamp = b.lastMessage ? new Date(b.lastMessage.timestamp) : 0;
              return bTimestamp - aTimestamp;
            });
          }
        });


        if (data._id === selectedConversationId) {
          setMessages(data.messages);
        }
      });
    }

    return () => {
      socket.off("conversationUpdate");
    };
  }, [handleFetchConversation, profile, selectedConversationId, socket]);

  const handleClick = async (convo) => {
    if (!profile || !profile._id) return; // Ensure profile._id exists

    setIsChatBox(true);
    setIsPeoples(false);
    const recipient = await handleFetchRecipient(convo.senderId._id === profile._id ? convo.receiverId._id : convo.senderId._id);
    setMessages(convo.messages);
    setChatBoxData({ username: recipient.username, status: recipient.status, id: recipient._id, avatar: recipient.avatar });
    setSelectedConversationId(convo._id); // Set the selected conversation ID
  };

  return (
    <div className="flex flex-col h-full border border-red max-sm:w-screen overflow-y-auto border-r-2 border-white">
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
                  <Avatar src={convo.senderId._id === profile._id ? convo.receiverId.avatar : convo.senderId.avatar} sx={{ outline: "solid gray" }} />
                </ListItemAvatar>
                <ListItemText
                  primary={convo.senderId._id === profile._id ? convo.receiverId.username : convo.senderId.username}
                  secondary={convo.lastMessage ? convo.lastMessage.content : ''}
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
