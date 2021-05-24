import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Paper, TextField, Box, Button, Typography } from '@material-ui/core';
import useStyles from './index.style';
import apis from '../../../apis';

const ChangePassword = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };

  const validatePassword = () => {
    if (password.currentPassword.trim().length <= 0) {
      enqueueSnackbar('Current password is empty', { variant: 'error' });
      return false;
    }
    if (password.newPassword.trim().length <= 0) {
      enqueueSnackbar('New password is empty', { variant: 'error' });
      return false;
    }
    if (password.confirmNewPassword.trim().length <= 0) {
      enqueueSnackbar('Confirm new password is empty', { variant: 'error' });
      return false;
    }
    if (password.newPassword.trim() !== password.confirmNewPassword.trim()) {
      enqueueSnackbar('Confirm password  is not match', { variant: 'error' });
      return false;
    }
    return true;
  };
  const handleSave = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return;
    const data = await apis.user.changePassword({ ...password });

    if (data && data.status) {
      enqueueSnackbar('Change password success', { variant: 'success' });
      setPassword({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } else {
      enqueueSnackbar((data && data.message) || 'Change password failed', {
        variant: 'error',
      });
    }
  };

  return (
    <Paper className={classes.paper} variant={3}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" component="h2">
          Update Password
        </Typography>
      </Box>
      <Box textAlign="center" mb={3}>
        <TextField
          required
          type="password"
          name="currentPassword"
          label="Current password"
          variant="outlined"
          fullWidth
          value={password.currentPassword}
          onChange={handleChange}
        />
      </Box>
      <Box textAlign="center" mb={3}>
        <TextField
          required
          type="password"
          name="newPassword"
          label="New password"
          variant="outlined"
          fullWidth
          value={password.newPassword}
          onChange={handleChange}
        />
      </Box>
      <Box textAlign="center" mb={3}>
        <TextField
          required
          type="password"
          name="confirmNewPassword"
          label="Confirm new password"
          variant="outlined"
          fullWidth
          value={password.confirmNewPassword}
          onChange={handleChange}
        />
      </Box>
      <Box textAlign="right">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          onClick={handleSave}
        >
          Change Password
        </Button>
      </Box>
    </Paper>
  );
};

export default ChangePassword;