/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Link,
  Grid,
  Typography,
} from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import useStyles from './index.style';
import apis from '../../apis';
import { validateEmail } from '../../utils/string';

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState({
    firstName: '',
    lastName: '',
  });

  const [nameError, setNameError] = useState({
    firstName: '',
    lastName: '',
  });

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [userError, setUserError] = useState({
    email: '',
    password: '',
  });

  const validateRegister = () => {
    let countError = 0;
    if (name.firstName.length === 0) {
      setNameError((prev) => ({
        ...prev,
        firstName: 'First Name is required',
      }));
      countError++;
    }
    if (name.lastName.length === 0) {
      setNameError((prev) => ({ ...prev, lastName: 'Last Name is required' }));
      countError++;
    }

    if (user.email.length === 0) {
      setUserError((prev) => ({ ...prev, email: 'Email is required' }));
      countError++;
    } else if (!validateEmail(user.email)) {
      setUserError((prev) => ({ ...prev, email: 'Email invalid' }));

      countError++;
    }

    if (user.password.length === 0) {
      setUserError((prev) => ({ ...prev, password: 'Password is required' }));
      countError++;
    }
    if (countError > 0) return false;
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;
    const data = await apis.auth.register({
      ...user,
      name: `${name.firstName} ${name.lastName}`,
    });
    if (data && data.status) {
      enqueueSnackbar('Register success', { variant: 'success' });
      history.push('/login');
    } else {
      enqueueSnackbar(data.message || 'Register failed', { variant: 'error' });
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={name.firstName}
                  onChange={(e) => {
                    setNameError({ ...userError, firstName: '' });
                    setName({ ...name, firstName: e.target.value });
                  }}
                  error={nameError.firstName}
                  helperText={nameError.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={name.lastName}
                  onChange={(e) => {
                    setNameError({ ...userError, lastName: '' });
                    setName({ ...name, lastName: e.target.value });
                  }}
                  error={nameError.lastName}
                  helperText={nameError.lastName}
                />
              </Grid>
            </Grid>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={(e) => {
                setUserError({ ...userError, email: '' });
                setUser({ ...user, email: e.target.value });
              }}
              error={userError.email}
              helperText={userError.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={(e) => {
                setUserError({ ...userError, password: '' });
                setUser({ ...user, password: e.target.value });
              }}
              error={userError.password}
              helperText={userError.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
