import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import {
  Fullscreen as FullscreenIcon,
  Send as SendIcon,
  AccessTime as AccessTimeIcon,
  FullscreenExit as FullscreenExitIcon,
} from '@material-ui/icons';
import useStyles from './index.style';

const PrepareExam = () => {
  const classes = useStyles();
  const [value, setValue] = useState('female');

  const [isFullscreen, setIsFullscreen] = useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleFullscreen = (e) => {
    e.preventDefault();
    setIsFullscreen((prev) => !prev);
  };
  return (
    <div className={isFullscreen && classes.fullscreen}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex">
          <Box mr={1}>
            <AccessTimeIcon />
          </Box>
          <Typography variant="button" display="block" gutterBottom>
            120:00
          </Typography>
        </Box>
        <Box display="flex">
          <Box mr={1}>
            <Button variant="outlined" color="primary" startIcon={<SendIcon />}>
              Finish
            </Button>
          </Box>
          <Box>
            <Button
              variant="outlined"
              color="primary"
              startIcon={
                isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />
              }
              onClick={handleFullscreen}
            >
              {isFullscreen ? 'Exit Full Screen' : 'Full Screen '}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Câu số 1: Số nào là số nguyên tố?
                </Typography>
              </Box>
              <Box>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.questionBox}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, index) => (
                <div className={classes.questionSquare}>{index + 1}</div>
              ))}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, index) => (
                <div className={classes.questionSquare}>{index + 1}</div>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default PrepareExam;
