import { TabContext, TabPanel, TabList } from "@mui/lab"
import { Tab, Typography } from "@mui/material"
import { useState, } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"


function Form() {
  const [tabValue, setTabValue] = useState('1')
  const tabChange = (event, newValue) => {
    setTabValue(newValue)
  }
  return (
    <div className="
     h-[100vh] flex justify-center items-center
     ">
      <div className="
       bg-white w-[420px] max-sm:w-[350px] rounded-md p-[10px] shadow-xl outline outline-1
      ">
        <div className="text-center p-[5px] rounded-md" >
          <Typography variant='h5'>
            Chatty Chats
          </Typography>
        </div>
        <TabContext value={tabValue}>
          <TabList onChange={tabChange}>
            <Tab label="Login" value='1' />
            <Tab label="Register" value='2' />
          </TabList>
          <TabPanel value='1'>
            <LoginForm />
          </TabPanel>
          <TabPanel value='2'>
            <RegisterForm />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  )
}

export default Form