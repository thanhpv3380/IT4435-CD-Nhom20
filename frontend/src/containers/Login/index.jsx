/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-plusplus */
/* eslint-disable no-useless-return */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Divider,
  Box,
} from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import actions from '../../redux/actions';
import useStyles from './index.style';
import loginType from '../../constants/loginType';
import { validateEmail } from '../../utils/string';

const Login = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const { isLoggingIn, message } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLoggingIn) return;
    if (message) {
      enqueueSnackbar(message, { variant: 'error' });
    }
  }, [isLoggingIn]);

  const handleLoginFailureGoogle = (res) => {
    enqueueSnackbar(res, { variant: 'error' });
  };

  const handleLoginSuccessGoogle = async (res) => {
    const { tokenId } = res;
    dispatch(actions.auth.login(loginType.LOGIN_GOOGLE, { tokenId }));
  };

  const handleLoginFacebook = async (res) => {
    const { accessToken, userID } = res;
    dispatch(
      actions.auth.login(loginType.LOGIN_FACEBOOK, { accessToken, userID }),
    );
  };

  const validateLogin = () => {
    let countError = 0;
    if (email.length === 0) {
      setEmailError('Email is required');
      countError++;
    } else if (!validateEmail(email)) {
      setEmailError('Email invalid');
      countError++;
    }
    if (password.length === 0) {
      setPasswordError('Password is required');
      countError++;
    }
    if (countError > 0) return false;
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    dispatch(actions.auth.login(loginType.LOGIN, { email, password }));
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
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
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
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
              onKeyPress={onKeyPress}
              value={email}
              onChange={(e) => {
                setEmailError('');
                setEmail(e.target.value);
              }}
              error={emailError}
              helperText={emailError}
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
              onKeyPress={onKeyPress}
              value={password}
              onChange={(e) => {
                setPasswordError('');
                setPassword(e.target.value);
              }}
              error={passwordError}
              helperText={passwordError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Create account
                </Link>
              </Grid>
            </Grid>
            <Box display="flex" mt={1} alignItems="center">
              <div className={classes.divider} />
              <Typography gutterBottom align="center" variant="subtitle1">
                Or login with
              </Typography>
              <div className={classes.divider} />
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <GoogleLogin
                  clientId="802105279409-3f4hr8psra01jd28d9rhuupgp64658k4.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      className={classes.submit}
                      startIcon={
                        <Avatar
                          sizes="height: 20px"
                          variant="square"
                          src="https://www.flaticon.com/svg/vstatic/svg/281/281764.svg?token=exp=1617453904~hmac=aa464508b624fc30774281f816a61a99"
                        />
                      }
                      onClick={renderProps.onClick}
                    >
                      Login By Google
                    </Button>
                  )}
                  buttonText="Login"
                  onSuccess={handleLoginSuccessGoogle}
                  onFailure={handleLoginFailureGoogle}
                  cookiePolicy="single_host_origin"
                />
              </Grid>
              <Grid item xs={6}>
                <FacebookLogin
                  appId="136872808369148"
                  // eslint-disable-next-line react/jsx-boolean-value
                  autoLoad={false}
                  callback={handleLoginFacebook}
                  render={(renderProps) => (
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      className={classes.submit}
                      startIcon={
                        <Avatar
                          variant="square"
                          src="https://www.flaticon.com/svg/vstatic/svg/1384/1384053.svg?token=exp=1617453959~hmac=2da46b5dbf3d480fc8b4628952a711b5"
                        />
                      }
                      onClick={renderProps.onClick}
                    >
                      Facebook
                    </Button>
                  )}
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
