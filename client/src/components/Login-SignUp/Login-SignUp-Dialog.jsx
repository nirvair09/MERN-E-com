import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/authActions';

const LoginSignUpDialog = ({ open, onClose }) => {
  // Redux setup
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  // State for login and signup forms
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
        credentials: 'include', // Send cookies with the request
      });

      if (response.ok) {
        const { token, user } = await response.json();
        window.localStorage.setItem('token', token);
        dispatch(loginUser(user));
        // console.log('Login successful', user);
        onClose();
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };
  // Signup handler
  const handleSignup = async () => {
    try {
      const { username, email, password } = signupData;
      const response = await fetch('http://localhost:8000/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        // console.log('Successfully registered');
        setIsLogin(!isLogin);
      } else {
        console.log('Error while registering:', response.status);
        // Handle different HTTP statuses here
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      // Handle other types of errors (e.g., network issues)
    }
  };



  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {

        const userToken = window.localStorage.getItem('token');
        // console.log('User Token:', userToken);

        if (!userToken) {
          return false;
        }

        const response = await fetch('http://localhost:8000/fetch-user-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          credentials: 'include',  // Ensure credentials are included
        });

        if (response.ok) {
          const userData = await response.json();
          dispatch(loginUser(userData));
          // console.log('User data fetched:', userData);
          return true;
        } else {
          console.log('User details fetch failed:', response.status);
          return false;
        }
      } catch (error) {
        console.error('Error during user details fetching:', error.message);
        return false;
      }
    };

    const checkAndCloseDialog = async () => {
      const isAuthenticated = await checkAuthenticated();

      if (isAuthenticated) {
        onClose();
      }
    };

    checkAndCloseDialog();
  }, [dispatch, onClose]);



  return (
    <Dialog open={open} onClose={onClose}>

      <DialogTitle>
        {isLogin ? 'Login' : 'Sign Up'}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Form header with image and welcome message */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <img
            src="login-signup.png"
            alt="Login"
            style={{ width: '150px', height: '150px', objectFit: 'contain' }}
          />
          {isLogin ? (
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              Welcome back! Please login to your account...
            </Typography>
          ) : (
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              New here? Sign up and explore exciting offers!
            </Typography>
          )}
        </Box>
        {/* Conditional rendering of login or signup form */}
        {isLogin ? (
          <>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </>
        ) : (
          <>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={signupData.username}
              onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />
          </>
        )}
      </DialogContent>
      {/* Form actions with toggle and submit buttons */}
      <DialogActions>
        <Button onClick={handleToggle}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </Button>
        <Button variant="contained" color="primary" onClick={isLogin ? handleLogin : handleSignup}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginSignUpDialog;
