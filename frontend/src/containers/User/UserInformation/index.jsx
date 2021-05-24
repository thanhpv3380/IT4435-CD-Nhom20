/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  TextField,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
} from '@material-ui/core';
import { PhotoCamera as PhotoCameraIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../../redux/actions';
import useStyles from './index.style';
import apis from '../../../apis';

const User = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [userInfo, setUserInfo] = useState(
    useSelector((state) => state.auth.user),
  );

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const {
      name,
      avatar,
      dob,
      phoneNumber,
      urlFacebook,
      urlYoutube,
      urlWebsite,
    } = userInfo;
    if (name.trim().length <= 0) {
      enqueueSnackbar("Name doesn't empty", { variant: 'error' });
      return;
    }
    const data = await apis.user.updateUser({
      name,
      avatar,
      dob,
      phoneNumber,
      urlFacebook,
      urlYoutube,
      urlWebsite,
    });
    if (data && data.status) {
      dispatch(
        actions.auth.updateUser({
          ...data.result.user,
        }),
      );
      enqueueSnackbar('Update success', { variant: 'success' });
    } else {
      enqueueSnackbar('Update failed', { variant: 'error' });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Box borderRadius="50%" className={classes.avatar}>
            <img
              src={(userInfo && userInfo.avatar) || ''}
              width="100%"
              height="auto"
              alt="avatar"
            />
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label className={classes.btnCamera} htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCameraIcon fontSize="large" />
              </IconButton>
            </label>
          </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper className={classes.paper} variant={3}>
            <Box textAlign="center" mb={3}>
              <Typography variant="h4" component="h2">
                Profile
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={(userInfo && userInfo.name) || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={(userInfo && userInfo.email) || ''}
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={(userInfo && userInfo.dob) || new Date()}
                    onChange={(value) =>
                      setUserInfo({ ...userInfo, dob: value })
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid> */}
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={(userInfo && userInfo.phoneNumber) || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="urlFacebook"
                  label="Link Facebook"
                  variant="outlined"
                  fullWidth
                  value={(userInfo && userInfo.urlFacebook) || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="urlYoutube"
                  label="Link Youtube"
                  variant="outlined"
                  fullWidth
                  value={(userInfo && userInfo.urlYoutube) || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="urlWebsite"
                  label="Link Website"
                  variant="outlined"
                  fullWidth
                  value={(userInfo && userInfo.urlWebsite) || ''}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box textAlign="right">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                size="large"
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default User;