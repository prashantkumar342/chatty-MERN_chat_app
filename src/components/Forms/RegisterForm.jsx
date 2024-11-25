import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Divider, Typography, IconButton } from '@mui/material';
import { useContext, useState } from 'react';
import { apiContext } from '../../context/api/ApiProvider';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const { handleRegisterUser } = useContext(apiContext);
  const [userCreds, setUserCreds] = useState({ username: "", email: "", password: "", phone: "", avatar: null });
  const [error, setError] = useState(null);

  const getFieldValues = (event) => {
    setUserCreds({
      ...userCreds,
      [event.target.name]: event.target.value.trim(),
    });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 500 * 1024) {
      toast.error("Image size should be less than 500KB");
      return;
    }
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    setError(null);
    setUserCreds({
      ...userCreds,
      avatar: file
    });
  };

  const removeImage = () => {
    setUserCreds({ ...userCreds, avatar: null });
  }

  const register = (e) => {
    e.preventDefault();
    handleRegisterUser(userCreds.username, userCreds.email, userCreds.phone, userCreds.password, userCreds.avatar);
    setUserCreds({ username: "", email: "", password: "", phone: "", avatar: null });
  }

  return (
    <div className='p-[10px]'>
      <Typography variant='h5'>
        Welcome 👋🏼
      </Typography>
      <Typography variant='body1'>
        Register To Start 📝
      </Typography>
      <Divider sx={{ border: "solid 1px gray", margin: "10px 0 20px 0" }} />
      <form className='my-[10px]' onSubmit={register}>
        <TextField
          label="Username"
          variant="outlined"
          size="small"
          fullWidth
          value={userCreds.username}
          margin="normal"
          name="username"
          onChange={getFieldValues}
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
          label="Email"
          variant="outlined"
          size="small"
          fullWidth
          value={userCreds.email}
          margin="normal"
          type="email"
          name="email"
          onChange={getFieldValues}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Phone"
          variant="outlined"
          size="small"
          fullWidth
          value={userCreds.phone}
          margin="normal"
          type="tel"
          name="phone"
          onChange={getFieldValues}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
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
          value={userCreds.password}
          margin="normal"
          type="password"
          name="password"
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
        <div className="flex items-center">
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2, backgroundColor: 'blue', flexGrow: 1 }}
          >
            Upload Avatar
            <input
              type="file"
              hidden
              accept="image/*" // Accept only image files
              onChange={handleImageChange}
            />
          </Button>
          {userCreds.avatar && (
            <>
              <CheckCircleIcon color="success" sx={{ ml: 2 }} />
              <IconButton onClick={removeImage}>
                <DeleteIcon color="error" />
              </IconButton>
            </>
          )}
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: 'green' }} disableElevation type='submit'>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
