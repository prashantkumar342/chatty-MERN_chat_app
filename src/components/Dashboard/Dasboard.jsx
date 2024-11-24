import { useMediaQuery, useTheme, AppBar, Toolbar, IconButton, Avatar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NavDrawer from "../Drawer/NavDrawer";
import Sidebar from "../Drawer/Sidebar";
import { GlobalVar } from "../../context/global/GlobalVariable";
import { useContext, useEffect } from "react";
import Conversation from "../Conversation/Conversation";
import ChatBox from "../Chatbox/ChatBox";
import Discover from "../Discover/Discover";
import { apiContext } from "../../context/api/ApiProvider";

function Dasboard() {
  const theme = useTheme();
  const { handleFetchUsers } = useContext(apiContext)
  const { setIsDrawer, isChatBox } = useContext(GlobalVar);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    handleFetchUsers();
  }, [])

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <div className="flex flex-row flex-grow h-full overflow-hidden">
        {isSmallScreen ? <NavDrawer /> : <Sidebar />}
        <div className="flex-grow flex flex-col h-full">
          <AppBar position="static" elevation={0} sx={{ backgroundColor: "#6E00FF", height: "50px", justifyContent: 'center' }}>
            <Toolbar className="flex justify-between">
              {!isSmallScreen ? <Typography variant="h5" sx={{ marginLeft: "10px" }}>Chatty</Typography> : null}
              {isSmallScreen && (
                <div className="flex items-center w-full">
                  <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setIsDrawer(true)}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h5" sx={{ marginLeft: "10px" }}>Chatty</Typography>
                  <Avatar sx={{ marginLeft: "auto" }} src="/static/images/avatar/1.jpg" />
                </div>
              )}
            </Toolbar>
          </AppBar>
          <div className="flex flex-grow overflow-hidden">
            <div className=" h-full overflow-y-auto border-r-2 border-white">
              <Conversation />
            </div>
            <div className="flex-grow h-full overflow-y-auto ">
              {
                isChatBox ? <ChatBox /> :
                  (<><div className="
                    flex h-full w-full items-center justify-center
                    "><Typography variant="body1">There is no chat selected </Typography></div></>)
              }
            </div>
          </div>
        </div>
      </div>
      <Discover />
    </div>
  );
}

export default Dasboard;