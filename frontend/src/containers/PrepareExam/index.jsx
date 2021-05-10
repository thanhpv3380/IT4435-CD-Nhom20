import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Paper, Typography, Box, TextField, Button } from '@material-ui/core';
import {
  Description as DescriptionIcon,
  Timer as TimerIcon,
  HourglassEmpty as HourglassEmptyIcon,
} from '@material-ui/icons';
import useStyles from './index.style';

const PrepareExam = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();

  const handleClickStartExam = (e) => {
    e.preventDefault();
    history.push(`/contest/${id}/exam`);
  };
  return (
    <>
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Title
        </Typography>
        <Box display="flex">
          <DescriptionIcon />
          <Typography variant="h6" gutterBottom>
            Description: dsfsd
          </Typography>
        </Box>
        <Box display="flex">
          <HourglassEmptyIcon />
          <Typography variant="h6" gutterBottom>
            Duration: 120(m)
          </Typography>
        </Box>
        <Box display="flex">
          <TimerIcon />
          <Typography variant="h6" gutterBottom>
            Date
          </Typography>
        </Box>
        <Box>
          <TextField
            size="small"
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />
          <Button variant="contained" color="primary" size="large">
            Check
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickStartExam}
          >
            Start Exam
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default PrepareExam;
