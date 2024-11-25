import { useContext } from 'react';
import { Avatar, Button, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { GlobalVar } from "../../context/global/GlobalVariable";
import { Chat, Home, Logout, People, Search, Settings } from "@mui/icons-material";
import { apiContext } from '../../context/api/ApiProvider';

function NavDrawer() {
  const { isDrawer, setIsDrawer, profile, setIsPeoples } = useContext(GlobalVar);
  const { handleLogoutUser } = useContext(apiContext)
  const logout = () => {
    handleLogoutUser();
  }
  return (
    <Drawer
      open={isDrawer}
      onClose={() => setIsDrawer(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: "200px",
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          padding: '10px',
          background: 'transparent',
          backdropFilter: 'blur(5px)'
        },
      }}
    >
      <div className='w-full justify-center flex'>
        <Avatar sx={{ width: "70px", height: "70px" }} src={profile.avatar} />
      </div>
      <Divider />
      <div className='w-full flex justify-center h-full items-center'>
        <List>
          <ListItem button sx={{ cursor: "pointer", color: "white" }}>
            <ListItemIcon sx={{ color: "white" }}><Home /></ListItemIcon>
            <ListItemText primary="Home" sx={{ color: "white" }} />
          </ListItem>
          <Divider sx={{ backgroundColor: "white" }} />
          <ListItem button sx={{ cursor: "pointer", color: "white" }}>
            <ListItemIcon sx={{ color: "white" }}><Chat /></ListItemIcon>
            <ListItemText primary="Chats" sx={{ color: "white" }} />
          </ListItem>
          <Divider sx={{ backgroundColor: "white" }} />
          <ListItem button sx={{ cursor: "pointer", color: "white" }} >
            <ListItemIcon sx={{ color: "white" }} ><People /></ListItemIcon>
            <ListItemText primary="Friends" sx={{ color: "white" }} />
          </ListItem>
          <Divider sx={{ backgroundColor: "white" }} />
          <ListItem button sx={{ cursor: "pointer", color: "white" }}
            onClick={() => { setIsPeoples(true); setIsDrawer(false)}}
          >
            <ListItemIcon sx={{ color: "white" }}><Search /></ListItemIcon>
            <ListItemText primary="Search" sx={{ color: "white" }} />
          </ListItem>
          <Divider sx={{ backgroundColor: "white" }} />
          <ListItem button sx={{ cursor: "pointer", color: "white" }}>
            <ListItemIcon sx={{ color: "white" }}><Settings /></ListItemIcon>
            <ListItemText primary="Settings" sx={{ color: "white" }} />
          </ListItem>
        </List>
      </div>
      <div className='w-full flex justify-center mt-auto'>
        <Button startIcon={<Logout />} sx={{ textTransform: "none", color: "white", fontSize: "15px" }}
          onClick={logout}
        >Logout</Button>
      </div>
    </Drawer>
  );
}

export default NavDrawer;
