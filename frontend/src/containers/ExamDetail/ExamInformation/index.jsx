/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { Paper, Typography, Box, TextField, Button } from '@material-ui/core';
import {
  Description as DescriptionIcon,
  HourglassEmpty as HourglassEmptyIcon,
} from '@material-ui/icons';
import useStyles from './index.style';
import apis from '../../../apis';
import constants from '../../../constants';
import errorCodes from '../../../constants/errorCodes';
import LoadingPage from '../../../components/LoadingPage';

const PrepareExam = ({ examId }) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [contest, setContest] = useState();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleRedirectToExamTest = () => {
    history.push(`/contest/${examId}/exam/test`);
  };

  const handleCheckPassword = async () => {
    try {
      const data = await apis.contest.verifyPassword({ examId, password });
      if (data.status) {
        handleRedirectToExamTest();
      } else {
        enqueueSnackbar(data.message || 'Check password failed', {
          variant: 'error',
        });
      }
    } catch (error) {
      enqueueSnackbar('Check password failed', {
        variant: 'error',
      });
    }
  };

  const fetchContest = async () => {
    try {
      const data = await apis.contest.getContest(examId);
      if (data.status) {
        const { contest: contestData } = data.result;
        setContest(contestData);
        setIsLoading(false);
      } else {
        if (data.code === errorCodes.CONTEST_IS_PRIVATE) {
          history.push('/');
        }
        enqueueSnackbar(data.message || 'Fetch data failed', {
          variant: 'error',
        });
      }
    } catch (error) {
      enqueueSnackbar('Fetch data failed', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchContest();
  }, []);

  const renderUpcomingStatus = () => {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Upcoming:
        </Typography>
      </Box>
    );
  };
  const renderHappeningStatus = () => {
    return (
      <Box>
        <Box>
          {contest.isLock && (
            <TextField
              size="small"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={
              contest.isLock ? handleCheckPassword : handleRedirectToExamTest
            }
          >
            Start
          </Button>
        </Box>
      </Box>
    );
  };
  const renderEndedStatus = () => {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Ended. View Detail
        </Typography>
      </Box>
    );
  };
  const renderByStatus = () => {
    if (contest) {
      if (contest.status === constants.UPCOMING) return renderUpcomingStatus();
      if (contest.status === constants.HAPPENING)
        return renderHappeningStatus();
      if (contest.status === constants.ENDED) return renderEndedStatus();
    }

    return;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          {contest && contest.title}
        </Typography>
        <Box display="flex">
          <DescriptionIcon />
          <Typography variant="h6" gutterBottom>
            Description: {contest && contest.description}
          </Typography>
        </Box>
        <Box display="flex">
          <HourglassEmptyIcon />
          <Typography variant="h6" gutterBottom>
            Duration: {contest && contest.examTime}(m)
          </Typography>
        </Box>

        {renderByStatus()}
      </Paper>
    </>
  );
};

export default PrepareExam;
