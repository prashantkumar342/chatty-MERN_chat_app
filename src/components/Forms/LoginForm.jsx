import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { apiContext } from '../../context/api/ApiProvider';

const LoginForm = () => {
  const [userCreds, setUserCreds] = useState({ username: "", password: "" })
  const { handleLoginUser } = useContext(apiContext)


  const getFieldValues = (event) => {
    setUserCreds({
      ...userCreds,
      [event.target.name]: event.target.value.trim(),
    });
  }

  const login = (e) => {
    e.preventDefault()
    handleLoginUser(userCreds.username, userCreds.password)
    setUserCreds({ username: "", password: "" });
  }

  return (
    <div className='
     p-[10px]
    '>
      <Typography variant='h5'>
        Welcome Back 🙋🏼‍♂️
      </Typography>
      <Typography variant='body1'>
        Login To Continue ✅
      </Typography>
      <Divider sx={{ border: "solid 1px gray", margin: "10px 0 20px 0" }} />
      <form className='my-[10px]' onSubmit={login}>
        <TextField
          label="Username"
          variant="outlined"
          size="small"
          fullWidth
          onChange={getFieldValues}
          name='username'
          margin="normal"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          type="password"
          name='password'
          onChange={getFieldValues}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disableElevation type='submit'>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
