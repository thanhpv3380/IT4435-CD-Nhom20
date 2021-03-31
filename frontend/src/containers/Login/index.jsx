import React from 'react';
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
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import useStyles from './index.style';
import apis from '../../apis';

const Login = () => {
  const classes = useStyles();

  const handleLoginSuccessGoogle = async (res) => {
    const data = await apis.auth.loginByGoogle(res.tokenId);
    console.log(data);
  };

  const handleLoginFailureGoogle = (res) => {
    console.log(res);
  };

  const handleLoginFacebook = async (res) => {
    const { accessToken, userID } = res;
    const data = await apis.auth.loginByFacebook({ accessToken, userID });
    console.log(data);
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <GoogleLogin
              clientId="802105279409-3f4hr8psra01jd28d9rhuupgp64658k4.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={handleLoginSuccessGoogle}
              onFailure={handleLoginFailureGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
              appId="136872808369148"
              autoLoad={true}
              callback={handleLoginFacebook}
            />
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
