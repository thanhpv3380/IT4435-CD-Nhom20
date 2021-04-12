import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  Grid,
  Typography,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Paper,
  Button,
  IconButton,
} from '@material-ui/core';

import { PhotoCamera as PhotoCameraIcon } from '@material-ui/icons';
import useStyles from './index.style';

const User = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box textAlign="center" mb={2}>
        <Typography variant="h4" component="h2" text>
          User Information
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}>
          <img
            src="https://i.pinimg.com/474x/d4/4d/64/d44d6476e69b74f45b1de228bdd3e754.jpg"
            width="100%"
            height="250px"
          />
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCameraIcon />
            </IconButton>
          </label>
        </Grid>
        <Grid item xs={9} sm={9}>
          <Paper className={classes.paper} fullWidth>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  variant="outlined"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  variant="outlined"
                  fullWidth
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  variant="outlined"
                  fullWidth
                  autoComplete="shipping address-line1"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  variant="outlined"
                  fullWidth
                  autoComplete="shipping address-line2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  variant="outlined"
                  fullWidth
                  autoComplete="shipping address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box textAlign="right">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
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
