import { useContext, useState, useEffect } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, TextField, Divider, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import { apiContext } from "../../context/api/ApiProvider";
import { GlobalVar } from '../../context/global/GlobalVariable';
import { useSocket } from '../../context/socket/socket';

function Peoples() {
  const socket = useSocket();
  const { handleFetchRecipient } = useContext(apiContext);
  const { setIsChatBox, setIsPeoples, setChatBoxData, chatBoxData, users } = useContext(GlobalVar);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const result = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(result);
    } else {
      setFilteredUsers([]);
    }
  }, [searchQuery, users]);

  const handleClick = async (username, status, id) => {
    setIsChatBox(true);
    setIsPeoples(false);
    const recipient = await handleFetchRecipient(id);
    setChatBoxData({ username: recipient.username, status: recipient.status, id: recipient._id });
  };

  useEffect(() => {
    if (socket) {
      socket.on("onStatus", data => {
        if (chatBoxData.username === data.user) {
          setChatBoxData({ username: data.user, status: data.onlineStatus });
        }
      });
    }
    return () => {
      socket.off("onStatus");
    };
  }, [socket, setChatBoxData, chatBoxData.username]);

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredUsers([]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-2 bg-gray-100 flex items-center">
        <TextField
          variant="outlined"
          placeholder="Search people..."
          size="small"
          fullWidth
          slotProps={{ style: { borderRadius: '8px' } }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton button onClick={clearSearch} sx={{ ml: 1.5, backgroundColor: "white" }}
          onClickCapture={() => setIsPeoples(false)}
        >
          <CloseIcon sx={{ color: '#6E00FF', fontWeight: 500 }} />
        </IconButton>
      </div>
      <Divider />
      {filteredUsers.length > 0 && (
        <div className="flex-grow overflow-auto">
          <List>
            {filteredUsers.map((user, index) => (
              < div key={user._id} >
                {console.log(user)}
                <ListItem
                  component={Button}
                  sx={{ textTransform: "none", color: 'black' }}
                  onClick={() => handleClick(user.username, user.status, user._id)}
                >
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.username}
                    secondary={user.email}
                  />
                </ListItem>
                {index < filteredUsers.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </div >
      )
      }
    </div >
  );
}

export default Peoples;
