import React, { useState, useEffect } from 'react';
import { Modal, TextField, Box, Typography, Button } from '@material-ui/core';
import useStyles from './index.style';

const GroupQuestionModal = ({ handleCloseModal, open, item, handleSave }) => {
  const classes = useStyles();
  const [state, setState] = useState(0);
  const [groupQuestion, setGroupQuestion] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (item) {
      setGroupQuestion({ ...item });
      setState(1);
    } else {
      setGroupQuestion({
        title: '',
        description: '',
      });
      setState(0);
    }
  }, [open]);

  const handleChange = (e) => {
    setGroupQuestion({
      ...groupQuestion,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            {state ? 'Edit Group Question ' : 'Add Group Question'}
          </Typography>
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            size="large"
            placeholder="Enter title"
            name="title"
            value={(groupQuestion && groupQuestion.title) || ''}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            size="large"
            placeholder="Enter description"
            name="description"
            value={(groupQuestion && groupQuestion.description) || ''}
            onChange={handleChange}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Box mr={1}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSave(groupQuestion)}
            >
              Save
            </Button>
          </Box>
          <Box>
            <Button variant="contained" size="large" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
};

export default GroupQuestionModal;
