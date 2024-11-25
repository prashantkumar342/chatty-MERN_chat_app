import { Avatar, Divider, IconButton } from "@mui/material";
import { Chat, Home, Logout, People, Search, Settings } from "@mui/icons-material";
import { useContext } from "react";
import { GlobalVar } from "../../context/global/GlobalVariable";
import { apiContext } from "../../context/api/ApiProvider";

function Sidebar() {
  const { setIsPeoples, profile } = useContext(GlobalVar);
  const { handleLogoutUser } = useContext(apiContext)

  const logout = () => {
    handleLogoutUser();
  }

  return (
    <div className="flex flex-col items-center h-full bg-[#6E00FF] border-r-2 p-4 box-border">
      <div className="flex justify-center py-4">
        <Avatar sx={{ width: "50px", height: "50px", outline: "solid black" }} src={profile.avatar} />
      </div>
      <Divider className="bg-white w-full" />
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="flex flex-col gap-6">
          <IconButton sx={{ color: "white", fontSize: '25px' }}>
            <Home fontSize="inherit" />
          </IconButton>
          <IconButton sx={{ color: "white", fontSize: '25px' }}>
            <Chat fontSize="inherit" />
          </IconButton>
          <IconButton sx={{ color: "white", fontSize: '25px' }}>
            <People fontSize="inherit" />
          </IconButton>
          <IconButton sx={{ color: "white", fontSize: '25px' }} onClick={() => setIsPeoples(true)}>
            <Search />
          </IconButton>
          <IconButton sx={{ color: "white", fontSize: '25px' }}>
            <Settings fontSize="inherit" />
          </IconButton>
        </div>
      </div>
      <div className="pb-4">
        <IconButton sx={{ color: "white", fontSize: "30px" }} onClick={logout}>
          <Logout fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}

export default Sidebar;
